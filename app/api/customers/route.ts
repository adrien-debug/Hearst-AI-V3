import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

/**
 * API Route pour gérer les customers (clients avec adresses ERC20)
 * 
 * GET /api/customers - Liste tous les customers
 * POST /api/customers - Crée un nouveau customer
 * PUT /api/customers/:id - Met à jour un customer
 * DELETE /api/customers/:id - Supprime un customer
 */

// GET - Liste tous les customers
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

    // Vérifier que Prisma et le modèle Customer sont disponibles
    if (!prisma) {
      console.error('[API Customers] Prisma client est undefined')
      return NextResponse.json(
        { error: 'Erreur de configuration serveur', details: 'Prisma client non disponible' },
        { status: 500 }
      )
    }

    const prismaAny = prisma as any
    if (!prismaAny.customer) {
      console.error('[API Customers] Prisma.customer est undefined')
      console.error('[API Customers] Modèles disponibles:', Object.keys(prisma).filter(key => !key.startsWith('_') && !key.startsWith('$')))
      return NextResponse.json(
        { error: 'Erreur de configuration serveur', details: 'Le modèle Customer n\'est pas disponible. Veuillez redémarrer le serveur.' },
        { status: 500 }
      )
    }

    const customers = await prismaAny.customer.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ customers })
  } catch (error: any) {
    console.error('[API Customers] Erreur GET:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des customers', details: error.message },
      { status: 500 }
    )
  }
}

// POST - Crée un nouveau customer
export async function POST(request: NextRequest) {
  try {
    // En développement, permettre l'accès sans authentification
    const isDevelopment = process.env.NODE_ENV === 'development'
    if (!isDevelopment) {
      const session = await getServerSession(authOptions)
      if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    // Vérifier que Prisma est disponible
    if (!prisma) {
      console.error('[API Customers] Prisma client est undefined')
      return NextResponse.json(
        { error: 'Erreur de configuration serveur', details: 'Prisma client non disponible' },
        { status: 500 }
      )
    }

    // Vérifier que le modèle Customer existe (vérification dynamique pour éviter les erreurs TypeScript)
    const prismaAny = prisma as any
    if (!prismaAny.customer) {
      console.error('[API Customers] Prisma.customer est undefined - le modèle Customer n\'existe pas dans le client généré')
      console.error('[API Customers] Modèles disponibles:', Object.keys(prisma).filter(key => !key.startsWith('_') && !key.startsWith('$')))
      console.error('[API Customers] Type de prisma:', typeof prisma)
      return NextResponse.json(
        { error: 'Erreur de configuration serveur', details: 'Le modèle Customer n\'est pas disponible. Veuillez redémarrer le serveur après avoir exécuté: npx prisma generate' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, erc20Address, tag, chains, protocols } = body

    // Validation
    if (!name || !erc20Address) {
      return NextResponse.json(
        { error: 'Le nom et l\'adresse ERC20 sont requis' },
        { status: 400 }
      )
    }

    // Validation format adresse ERC20 (0x suivi de 40 caractères hexadécimaux)
    const erc20Regex = /^0x[a-fA-F0-9]{40}$/
    if (!erc20Regex.test(erc20Address)) {
      return NextResponse.json(
        { error: 'Format d\'adresse ERC20 invalide (doit commencer par 0x et contenir 40 caractères hexadécimaux)' },
        { status: 400 }
      )
    }

    // Vérifier si l'adresse existe déjà
    const existing = await (prisma as any).customer.findFirst({
      where: { erc20Address: erc20Address.toLowerCase() }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Cette adresse ERC20 est déjà enregistrée' },
        { status: 409 }
      )
    }

    // Créer le customer
    const customer = await (prisma as any).customer.create({
      data: {
        name,
        erc20Address: erc20Address.toLowerCase(),
        tag: tag || 'Client',
        chains: JSON.stringify(chains || ['eth']),
        protocols: JSON.stringify(protocols || []),
      }
    })

    return NextResponse.json({ customer }, { status: 201 })
  } catch (error: any) {
    console.error('[API Customers] Erreur POST:', error)
    console.error('[API Customers] Stack:', error.stack)
    console.error('[API Customers] Prisma disponible:', !!prisma)
    console.error('[API Customers] Prisma.customer disponible:', !!(prisma && 'customer' in prisma))
    
    // Messages d'erreur plus détaillés selon le type d'erreur
    let errorMessage = 'Erreur lors de la création du customer'
    let errorDetails = error.message
    
    if (error.message?.includes('Cannot read properties of undefined') || error.message?.includes('findFirst')) {
      errorMessage = 'Erreur de configuration serveur'
      errorDetails = 'Le client Prisma n\'est pas correctement initialisé. Veuillez redémarrer le serveur.'
    } else if (error.code === 'P2002') {
      errorMessage = 'Cette adresse ERC20 est déjà enregistrée'
      errorDetails = 'Un customer avec cette adresse existe déjà'
    } else if (error.code === 'P2003') {
      errorMessage = 'Erreur de référence'
      errorDetails = error.message
    } else if (error.message?.includes('Unique constraint')) {
      errorMessage = 'Cette adresse ERC20 est déjà enregistrée'
      errorDetails = error.message
    }
    
    return NextResponse.json(
      { 
        error: errorMessage, 
        details: errorDetails,
        code: error.code || 'UNKNOWN_ERROR'
      },
      { status: error.code === 'P2002' ? 409 : 500 }
    )
  }
}

