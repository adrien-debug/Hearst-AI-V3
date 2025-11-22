import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30d'
    
    // Déterminer le nombre de jours selon la période
    let days = 30
    if (period === '7d') {
      days = 7
    } else if (period === '14d') {
      days = 14
    } else if (period === '30d') {
      days = 30
    } else if (period === '90d') {
      days = 90
    } else if (period === '365d' || period === '1y') {
      days = 365
    }
    
    // TODO: Récupérer historical data depuis DB
    // MOCK DATA pour démo
    const data = []
    
    for (let i = days; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      // Générer des données réalistes avec variation
      const hashprice = 45 + Math.sin(i / 5) * 3 + (Math.random() - 0.5)
      const totalProfit = (hashprice * 18.4) - 2800 + (Math.random() - 0.5) * 200
      
      data.push({
        date: date.toISOString().split('T')[0],
        hashprice: parseFloat(hashprice.toFixed(2)),
        totalProfit: parseFloat(totalProfit.toFixed(2)),
        totalRevenue: parseFloat((hashprice * 18.4).toFixed(2)),
        totalCost: parseFloat((2800 + (Math.random() - 0.5) * 200).toFixed(2))
      })
    }
    
    // Calculer les statistiques
    const hashprices = data.map(d => d.hashprice)
    const profits = data.map(d => d.totalProfit)
    
    const avgHashprice = hashprices.reduce((sum, h) => sum + h, 0) / hashprices.length
    const avgProfit = profits.reduce((sum, p) => sum + p, 0) / profits.length
    const minProfit = Math.min(...profits)
    const maxProfit = Math.max(...profits)
    const totalProfit = profits.reduce((sum, p) => sum + p, 0)
    
    return NextResponse.json({
      period,
      data,
      statistics: {
        avgHashprice: parseFloat(avgHashprice.toFixed(2)),
        avgProfit: parseFloat(avgProfit.toFixed(2)),
        minProfit: parseFloat(minProfit.toFixed(2)),
        maxProfit: parseFloat(maxProfit.toFixed(2)),
        totalProfit: parseFloat(totalProfit.toFixed(2)),
        totalDays: days + 1
      }
    })
  } catch (error) {
    console.error('Error in profitability/history:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch profitability history',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}


