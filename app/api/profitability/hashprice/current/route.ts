import { NextRequest, NextResponse } from 'next/server'

// Cache pour hashprice
let hashpriceCache: any = null
let hashpriceCacheTime = 0
const CACHE_DURATION = 900000 // 15 minutes

async function fetchCurrentHashprice() {
  // Vérifier le cache
  if (hashpriceCache && (Date.now() - hashpriceCacheTime) < CACHE_DURATION) {
    return hashpriceCache
  }

  try {
    // TODO: Intégrer API Luxor Hashprice Index
    // const response = await fetch('https://api.luxor.tech/mining/hashprice/latest')
    // const data = await response.json()
    // return data.data.USD // $/PH/Day
    
    // MOCK DATA pour démo
    const hashprice = {
      current: 52.34 + (Math.random() - 0.5) * 2,
      avg7d: 51.52,
      avg30d: 50.89,
      change24h: 2.5,
      timestamp: new Date().toISOString(),
      source: 'Mock API'
    }
    
    hashpriceCache = hashprice
    hashpriceCacheTime = Date.now()
    
    return hashprice
  } catch (error) {
    console.error('Failed to fetch hashprice:', error)
    return hashpriceCache || {
      current: 52.34,
      avg7d: 51.52,
      avg30d: 50.89,
      change24h: 0,
      timestamp: new Date().toISOString(),
      source: 'Fallback'
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const hashprice = await fetchCurrentHashprice()
    return NextResponse.json({
      success: true,
      hashprice: hashprice.current,
      avg7d: hashprice.avg7d,
      avg30d: hashprice.avg30d,
      change24h: hashprice.change24h,
      timestamp: hashprice.timestamp,
      source: hashprice.source
    })
  } catch (error) {
    console.error('Error in profitability/hashprice/current:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch hashprice',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}


