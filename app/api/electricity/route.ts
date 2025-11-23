import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Données mockées réalistes pour l'électricité
    const currentPower = 1250.5 // kW
    const dailyConsumption = currentPower * 24 // kWh
    const monthlyConsumption = dailyConsumption * 30 // kWh
    const costPerKwh = 0.08 // USD
    const dailyCost = dailyConsumption * costPerKwh
    const monthlyCost = monthlyConsumption * costPerKwh

    return NextResponse.json({
      data: {
        current_power: currentPower,
        daily_consumption: Math.round(dailyConsumption * 100) / 100,
        monthly_consumption: Math.round(monthlyConsumption * 100) / 100,
        daily_cost: Math.round(dailyCost * 100) / 100,
        monthly_cost: Math.round(monthlyCost * 100) / 100,
        cost_per_kwh: costPerKwh,
        miners: [
          { id: '1', name: 'Farm A', power: 450.2, consumption: 10804.8, cost: 864.38, status: 'active' },
          { id: '2', name: 'Farm B', power: 380.5, consumption: 9132.0, cost: 730.56, status: 'active' },
          { id: '3', name: 'Farm C', power: 419.8, consumption: 10075.2, cost: 806.02, status: 'active' },
        ],
        timestamp: new Date().toISOString(),
      },
      message: 'Electricity data retrieved successfully',
    })
  } catch (error) {
    console.error('Error getting electricity data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

