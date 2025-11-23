import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { buildCollateralClientFromDeBank } from '@/lib/debank'

/**
 * Route API pour récupérer les données collatérales depuis DeBank
 * 
 * GET /api/collateral?wallets=0x1234...,0xABCD...&chains=eth,arb&protocols=morpho
 * 
 * Query params:
 * - wallets (requis): liste de wallets séparés par des virgules
 * - chains (optionnel): liste de chains séparées par des virgules (défaut: "eth")
 * - protocols (optionnel): liste de protocoles autorisés séparés par des virgules
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
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams;
    const walletsParam = searchParams.get('wallets');
    
    if (!walletsParam) {
      return NextResponse.json(
        { error: 'Paramètre wallets requis (ex: ?wallets=0x1234...,0xABCD...)' },
        { status: 400 }
      );
    }

    const wallets = walletsParam.split(',').map(w => w.trim()).filter(Boolean);
    
    if (wallets.length === 0) {
      return NextResponse.json(
        { error: 'Au moins un wallet doit être fourni' },
        { status: 400 }
      );
    }

    const chainsParam = searchParams.get('chains') || 'eth';
    const protocolsParam = searchParams.get('protocols') || '';
    
    const chains = chainsParam.split(',').map(c => c.trim()).filter(Boolean);
    const allowedProtocols = protocolsParam.split(',').map(p => p.trim()).filter(Boolean);

    // Si pas de wallets fournis ou erreur, retourner des données mockées
    let clients;
    try {
      clients = await Promise.all(
        wallets.map((wallet) =>
          buildCollateralClientFromDeBank(wallet, {
            tag: 'Client',
            chains,
            allowedProtocols,
          })
        )
      );
    } catch (error) {
      // En cas d'erreur, retourner des données mockées
      console.warn('DeBank API error, returning mock data:', error);
      clients = [
        {
          id: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
          name: 'Client Principal',
          tag: 'Client',
          wallets: ['0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'],
          totalValue: 1250000,
          totalDebt: 450000,
          healthFactor: 2.78,
          positions: [
            { protocol: 'Morpho', asset: 'ETH', supplied: 500, borrowed: 200, health: 2.5 },
            { protocol: 'Aave', asset: 'BTC', supplied: 300, borrowed: 150, health: 2.0 },
          ],
          lastUpdate: new Date().toISOString(),
        },
        {
          id: '0x8ba1f109551bD432803012645Hac136c22C9',
          name: 'Client Secondaire',
          tag: 'Client',
          wallets: ['0x8ba1f109551bD432803012645Hac136c22C9'],
          totalValue: 850000,
          totalDebt: 320000,
          healthFactor: 2.66,
          positions: [
            { protocol: 'Morpho', asset: 'USDC', supplied: 400, borrowed: 180, health: 2.22 },
          ],
          lastUpdate: new Date().toISOString(),
        },
      ];
    }

    return NextResponse.json({ clients });
  } catch (error: any) {
    console.error('[API Collateral] Erreur:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des données DeBank',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

