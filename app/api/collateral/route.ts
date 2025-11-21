import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { buildCollateralClientFromDeBank, fetchUserComplexProtocols } from '@/lib/debank'
import { prisma } from '@/lib/db'

/**
 * Route API pour récupérer les données collatérales depuis DeBank
 * 
 * GET /api/collateral
 * - Utilise les customers stockés en base de données
 * - Appelle DeBank API pour chaque customer
 * 
 * Retourne:
 * {
 *   clients: [
 *     {
 *       id: "0x...",
 *       name: "...",
 *       tag: "...",
 *       wallets: ["0x..."],
 *       positions: [...],
 *       lastUpdate: "2025-01-20T10:00:00Z"
 *     }
 *   ]
 * }
 */
export async function GET(request: NextRequest) {
  try {
    // En développement, permettre l'accès sans authentification
    const isDevelopment = process.env.NODE_ENV === 'development'
    if (!isDevelopment) {
      const session = await getServerSession(authOptions)
      if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    // Récupérer tous les customers depuis la base de données
    const customers = await (prisma as any).customer.findMany({
      orderBy: { createdAt: 'desc' }
    })

    if (customers.length === 0) {
      return NextResponse.json({ 
        clients: [],
        message: 'Aucun customer enregistré. Ajoutez des customers pour voir leurs positions collatérales.'
      })
    }

    // Construire les clients avec les vraies données DeBank EN PARALLÈLE
    // ✅ OPTIMISATION : Utiliser Promise.all() pour charger tous les clients en parallèle
    const clientPromises = customers.map(async (customer: any) => {
      try {
        const chains = JSON.parse(customer.chains || '["eth"]')
        const protocols = JSON.parse(customer.protocols || '[]')
        
        console.log(`[API Collateral] Traitement de ${customer.name} (${customer.erc20Address})`)
        console.log(`[API Collateral] Chains: ${chains.join(', ')}, Protocols: ${protocols.join(', ') || 'tous'}`)
        
        // Récupérer les données brutes DeBank une seule fois
        const protoList = await fetchUserComplexProtocols(customer.erc20Address, chains)
        console.log(`[API Collateral] ${protoList.length} protocole(s) trouvé(s) pour ${customer.name}`)
        
        // Calculer les totaux depuis les stats USD de DeBank
        let totalValue = 0
        let totalDebt = 0
        
        for (const protocol of protoList || []) {
          const protocolId = protocol.id || ""
          const protocolName = protocol.name || protocolId
          
          console.log(`[API Collateral] Protocole: ${protocolName} (ID: ${protocolId})`)
          
          // Filtrer par protocoles autorisés si spécifiés
          if (Array.isArray(protocols) && protocols.length > 0) {
            // Normaliser les noms de protocoles pour la correspondance
            const normalizeProtocol = (p: string) => p.toLowerCase().replace(/[_-]/g, '').trim()
            
            // Vérifier si le protocole correspond (par ID ou nom, avec variantes)
            const protocolMatches = protocols.some(p => {
              const normalizedP = normalizeProtocol(p)
              const normalizedId = normalizeProtocol(protocolId)
              const normalizedName = normalizeProtocol(protocolName)
              
              // Correspondance exacte
              if (normalizedP === normalizedId || normalizedP === normalizedName) {
                return true
              }
              
              // Correspondance partielle (ex: "compound" correspond à "compound_v3", "compound_v2", etc.)
              if (normalizedId.includes(normalizedP) || normalizedName.includes(normalizedP) ||
                  normalizedP.includes(normalizedId) || normalizedP.includes(normalizedName)) {
                return true
              }
              
              return false
            })
            
            if (!protocolMatches) {
              console.log(`[API Collateral] Protocole ${protocolName} (ID: ${protocolId}) ignoré (non dans la liste autorisée: ${protocols.join(', ')})`)
              continue
            }
          }
          
          const itemList = protocol.portfolio_item_list || []
          console.log(`[API Collateral] ${itemList.length} position(s) dans ${protocolName}`)
          
          for (const item of itemList) {
            const stats = item.stats || {}
            const assetValue = stats.asset_usd_value || 0
            const debtValue = stats.debt_usd_value || 0
            
            if (assetValue > 0 || debtValue > 0) {
              console.log(`[API Collateral] Position trouvée: asset=${assetValue}, debt=${debtValue}`)
            }
            
            totalValue += assetValue
            totalDebt += debtValue
          }
        }
        
        console.log(`[API Collateral] Totaux pour ${customer.name}: totalValue=${totalValue}, totalDebt=${totalDebt}`)
        
        // Construire le client avec les positions (pour compatibilité)
        const client = await buildCollateralClientFromDeBank(customer.erc20Address, {
          tag: customer.tag,
          chains,
          allowedProtocols: protocols,
        })
        
        // Ajouter les informations du customer avec les totaux calculés
        const clientData: any = {
          ...client,
          id: customer.id,
          name: customer.name,
          tag: customer.tag,
          chains,
          protocols: protocols.length > 0 ? protocols : undefined,
          totalValue,
          totalDebt,
          healthFactor: totalDebt > 0 ? totalValue / totalDebt : 0,
          availableCredit: Math.max(0, totalValue - totalDebt),
        }
        
        console.log(`[API Collateral] Client final pour ${customer.name}:`, {
          totalValue: clientData.totalValue,
          totalDebt: clientData.totalDebt,
          healthFactor: clientData.healthFactor,
          positionsCount: clientData.positions?.length || 0
        })
        
        return clientData
      } catch (error: any) {
        console.warn(`[API Collateral] Erreur pour customer ${customer.name} (${customer.erc20Address}):`, error.message)
        // En cas d'erreur pour un customer, retourner le customer avec des données vides
        const chains = JSON.parse(customer.chains || '["eth"]')
        const protocols = JSON.parse(customer.protocols || '[]')
        
        return {
          id: customer.id,
          name: customer.name,
          tag: customer.tag,
          wallets: [customer.erc20Address],
          positions: [],
          lastUpdate: new Date().toISOString(),
          chains,
          protocols: protocols.length > 0 ? protocols : undefined,
          totalValue: 0,
          totalDebt: 0,
          healthFactor: 0,
          availableCredit: 0,
          error: error.message,
        }
      }
    })
    
    // ✅ Charger tous les clients EN PARALLÈLE au lieu de séquentiellement
    const clients = await Promise.all(clientPromises)

    return NextResponse.json({ clients })
  } catch (error: any) {
    console.error('[API Collateral] Erreur:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des données DeBank',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

