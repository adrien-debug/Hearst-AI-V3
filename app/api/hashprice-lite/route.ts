import { NextResponse } from 'next/server'

/**
 * Calcule le hashprice Bitcoin en $/TH/jour
 */
function calculateHashprice(btcPrice: number, networkHashrate: number, blockReward: number = 3.125, blockTime: number = 600): number {
  if (!btcPrice || !networkHashrate || networkHashrate === 0) {
    return 0
  }
  
  const blocksPerDay = (24 * 60 * 60) / blockTime // 144 blocs/jour pour Bitcoin
  const dailyNetworkBTC = blocksPerDay * blockReward
  const dailyNetworkRevenue = dailyNetworkBTC * btcPrice
  const hashprice = dailyNetworkRevenue / networkHashrate
  
  return hashprice
}

export async function GET() {
  try {
    // Récupérer le prix BTC depuis CoinGecko
    const priceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      },
      next: { revalidate: 60 } // Cache pendant 60 secondes
    })
    
    if (!priceResponse.ok) {
      throw new Error(`CoinGecko API responded with status ${priceResponse.status}`)
    }
    
    const priceData = await priceResponse.json()
    const btcPrice = priceData.bitcoin?.usd || 65000
    
    // Récupérer le hashrate depuis blockchain.info
    let networkHashrate = 600000000 // Valeur par défaut (600 EH/s = 600,000,000 TH/s)
    
    try {
      const hashrateResponse = await fetch('https://blockchain.info/q/hashrate', {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        next: { revalidate: 300 } // Cache pendant 5 minutes
      })
      
      if (hashrateResponse.ok) {
        const hashrateText = await hashrateResponse.text()
        const hashrateEH = parseFloat(hashrateText)
        if (!isNaN(hashrateEH) && hashrateEH > 0) {
          networkHashrate = hashrateEH * 1000000 // Convertir de EH/s en TH/s
        }
      }
    } catch (error) {
      console.warn('Error fetching hashrate, using default value:', error)
    }
    
    // Calculer le hashprice
    const hashpriceTH = calculateHashprice(btcPrice, networkHashrate)
    const hashpricePH = hashpriceTH * 1000 // $/PH/jour (1 PH = 1000 TH)
    
    return NextResponse.json({
      btcPrice,
      networkHashrate,
      hashpriceTH,
      hashpricePH,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching hashprice:', error)
    
    // Retourner des valeurs par défaut en cas d'erreur
    return NextResponse.json({
      btcPrice: 65000,
      networkHashrate: 600000000,
      hashpriceTH: 0.0634,
      hashpricePH: 63.4,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
