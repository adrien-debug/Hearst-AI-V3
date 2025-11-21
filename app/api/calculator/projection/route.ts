import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const months = searchParams.get('months') || '12'
    const hashrate = searchParams.get('hashrate')
    const power = searchParams.get('power')
    const electricity = searchParams.get('electricity')
    const equipmentCost = searchParams.get('equipmentCost')

    if (!hashrate || !power || !electricity) {
      return NextResponse.json(
        {
          success: false,
          error: 'hashrate, power et electricity sont requis'
        },
        { status: 400 }
      )
    }

    const params = new URLSearchParams({
      months,
      hashrate,
      power,
      electricity,
    })
    if (equipmentCost) {
      params.append('equipmentCost', equipmentCost)
    }

    const response = await fetch(`${BACKEND_URL}/api/calculator/projection?${params}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error generating projection:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate projection',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
