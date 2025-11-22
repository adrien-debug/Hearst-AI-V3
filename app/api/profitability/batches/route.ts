import { NextRequest, NextResponse } from 'next/server'

// Fonction pour calculer la rentabilité d'un batch
function calculateBatchProfitability(batch: any, hashprice: number) {
  const totalHashrate = (batch.unitHashrate * batch.quantity) / 1000 // PH/s
  const totalPower = (batch.unitPower * batch.quantity) / 1000 // kW
  
  // Daily Revenue = Hashprice ($/PH/Day) × Total Hashrate (PH)
  const dailyRevenue = hashprice * totalHashrate
  
  // Daily Electricity Cost = Total Power (kW) × 24h × Rate ($/kWh)
  const dailyElecCost = totalPower * 24 * batch.elecRate
  
  // Daily Hosting Cost = Hosting Fee × Quantity
  const dailyHostingCost = batch.hostingFee * batch.quantity
  
  // Total Daily Cost
  const totalDailyCost = dailyElecCost + dailyHostingCost
  
  // Daily Profit = Revenue - Total Cost
  const dailyProfit = dailyRevenue - totalDailyCost
  
  // Daily Profitability % = (Profit / Cost) × 100
  const profitabilityPercent = totalDailyCost > 0 ? (dailyProfit / totalDailyCost) * 100 : 0
  
  // Daily Profitability (ROI) = Profit / Hardware Investment
  const dailyROI = batch.hardwareInvestment > 0 ? (dailyProfit / batch.hardwareInvestment) * 100 : 0
  
  // ROI Period (days) = Hardware Investment / Daily Profit
  const roiDays = dailyProfit > 0 ? batch.hardwareInvestment / dailyProfit : -1
  
  // Break-even Hashprice = Total Daily Cost / Total Hashrate
  const breakEvenHashprice = totalHashrate > 0 ? totalDailyCost / totalHashrate : 0
  
  // Safety Margin = ((Current - BreakEven) / BreakEven) × 100
  const safetyMargin = breakEvenHashprice > 0 ? ((hashprice - breakEvenHashprice) / breakEvenHashprice) * 100 : 0
  
  // Status determination
  let status = 'unprofitable'
  if (dailyProfit < 0) {
    status = 'unprofitable'
  } else if (profitabilityPercent > 150 || roiDays < 150) {
    status = 'excellent'
  } else if (profitabilityPercent > 80 || roiDays < 250) {
    status = 'good'
  } else if (profitabilityPercent > 20 || roiDays < 400) {
    status = 'marginal'
  } else {
    status = 'breakeven'
  }
  
  return {
    ...batch,
    totalHashrate,
    totalPower,
    dailyRevenue,
    dailyElecCost,
    dailyHostingCost,
    totalDailyCost,
    dailyProfit,
    profitabilityPercent,
    dailyROI,
    roiDays,
    breakEvenHashprice,
    safetyMargin,
    status
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const hashpriceParam = searchParams.get('hashprice')
    
    // Récupérer hashprice (depuis param ou API)
    let hashprice = hashpriceParam ? parseFloat(hashpriceParam) : 52.34
    
    if (!hashpriceParam) {
      try {
        const hashpriceResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/profitability/hashprice/current`)
        if (hashpriceResponse.ok) {
          const hashpriceData = await hashpriceResponse.json()
          hashprice = hashpriceData.hashprice || 52.34
        }
      } catch (error) {
        console.error('Failed to fetch hashprice:', error)
      }
    }
    
    // TODO: Récupérer batches depuis DB
    // Pour l'instant, données mockées
    const demoBatches = [
      {
        id: 'batch-001',
        batchNumber: '01',
        model: 'Antminer S19 XP',
        quantity: 5,
        unitHashrate: 140,
        unitPower: 3010,
        efficiency: 21.5,
        hoster: 'DataCenter USA',
        hosterId: 'hoster-001',
        elecRate: 0.072,
        hostingFee: 25,
        hardwareInvestment: 34000,
        unitPrice: 6800,
        location: 'Austin, Texas'
      },
      {
        id: 'batch-002',
        batchNumber: '02',
        model: 'Antminer S19 Pro',
        quantity: 10,
        unitHashrate: 110,
        unitPower: 3250,
        efficiency: 29.5,
        hoster: 'DataCenter USA',
        hosterId: 'hoster-001',
        elecRate: 0.072,
        hostingFee: 25,
        hardwareInvestment: 45000,
        unitPrice: 4500,
        location: 'Austin, Texas'
      },
      {
        id: 'batch-003',
        batchNumber: '03',
        model: 'Whatsminer M50S',
        quantity: 8,
        unitHashrate: 126,
        unitPower: 3306,
        efficiency: 26.2,
        hoster: 'Mining Farm EU',
        hosterId: 'hoster-002',
        elecRate: 0.095,
        hostingFee: 30,
        hardwareInvestment: 41600,
        unitPrice: 5200,
        location: 'Frankfurt, Germany'
      },
      {
        id: 'batch-004',
        batchNumber: '04',
        model: 'Antminer S19j Pro',
        quantity: 12,
        unitHashrate: 104,
        unitPower: 3068,
        efficiency: 29.5,
        hoster: 'DataCenter USA',
        hosterId: 'hoster-001',
        elecRate: 0.072,
        hostingFee: 25,
        hardwareInvestment: 50400,
        unitPrice: 4200,
        location: 'Austin, Texas'
      },
      {
        id: 'batch-005',
        batchNumber: '05',
        model: 'Antminer S17+',
        quantity: 15,
        unitHashrate: 73,
        unitPower: 2920,
        efficiency: 40.0,
        hoster: 'Cloud Mining Asia',
        hosterId: 'hoster-003',
        elecRate: 0.088,
        hostingFee: 28,
        hardwareInvestment: 37500,
        unitPrice: 2500,
        location: 'Singapore'
      },
      {
        id: 'batch-006',
        batchNumber: '06',
        model: 'Antminer S9',
        quantity: 20,
        unitHashrate: 13,
        unitPower: 1320,
        efficiency: 101.5,
        hoster: 'Mining Farm EU',
        hosterId: 'hoster-002',
        elecRate: 0.095,
        hostingFee: 30,
        hardwareInvestment: 20000,
        unitPrice: 1000,
        location: 'Frankfurt, Germany'
      },
      {
        id: 'batch-007',
        batchNumber: '07',
        model: 'Antminer S9i',
        quantity: 25,
        unitHashrate: 13,
        unitPower: 1320,
        efficiency: 101.5,
        hoster: 'Mining Farm EU',
        hosterId: 'hoster-002',
        elecRate: 0.095,
        hostingFee: 30,
        hardwareInvestment: 18750,
        unitPrice: 750,
        location: 'Frankfurt, Germany'
      },
      {
        id: 'batch-008',
        batchNumber: '08',
        model: 'Whatsminer M20S',
        quantity: 18,
        unitHashrate: 68,
        unitPower: 3360,
        efficiency: 49.4,
        hoster: 'DataCenter USA',
        hosterId: 'hoster-001',
        elecRate: 0.072,
        hostingFee: 25,
        hardwareInvestment: 32400,
        unitPrice: 1800,
        location: 'Austin, Texas'
      },
      {
        id: 'batch-009',
        batchNumber: '09',
        model: 'Antminer S15',
        quantity: 22,
        unitHashrate: 28,
        unitPower: 1596,
        efficiency: 57.0,
        hoster: 'Cloud Mining Asia',
        hosterId: 'hoster-003',
        elecRate: 0.088,
        hostingFee: 28,
        hardwareInvestment: 26400,
        unitPrice: 1200,
        location: 'Singapore'
      },
      {
        id: 'batch-010',
        batchNumber: '10',
        model: 'Antminer S7',
        quantity: 30,
        unitHashrate: 4.5,
        unitPower: 1293,
        efficiency: 287.3,
        hoster: 'Mining Farm EU',
        hosterId: 'hoster-002',
        elecRate: 0.095,
        hostingFee: 30,
        hardwareInvestment: 9000,
        unitPrice: 300,
        location: 'Frankfurt, Germany'
      }
    ]
    
    const batchesWithMetrics = demoBatches.map(batch => calculateBatchProfitability(batch, hashprice))
    
    // Calculer les métriques globales
    const totalHashrate = batchesWithMetrics.reduce((sum, b) => sum + b.totalHashrate, 0)
    const totalRevenue = batchesWithMetrics.reduce((sum, b) => sum + b.dailyRevenue, 0)
    const totalCost = batchesWithMetrics.reduce((sum, b) => sum + b.totalDailyCost, 0)
    const totalProfit = batchesWithMetrics.reduce((sum, b) => sum + b.dailyProfit, 0)
    const profitableBatches = batchesWithMetrics.filter(b => b.dailyProfit > 0).length
    const breakEvenBatches = batchesWithMetrics.filter(b => b.dailyProfit === 0).length
    const unprofitableBatches = batchesWithMetrics.filter(b => b.dailyProfit < 0).length
    
    return NextResponse.json({
      success: true,
      batches: batchesWithMetrics,
      hashprice,
      summary: {
        totalHashrate,
        totalRevenue,
        totalCost,
        totalProfit,
        profitableBatches,
        breakEvenBatches,
        unprofitableBatches,
        totalBatches: batchesWithMetrics.length
      }
    })
  } catch (error) {
    console.error('Error in profitability/batches:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to calculate batch profitability',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}


