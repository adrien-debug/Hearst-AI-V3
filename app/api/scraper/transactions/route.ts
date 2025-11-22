import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletId = searchParams.get('walletId')
    const classification = searchParams.get('classification')
    const direction = searchParams.get('direction')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const minAmount = searchParams.get('minAmount')
    const maxAmount = searchParams.get('maxAmount')
    
    // TODO: Récupérer depuis la base de données avec les filtres
    // Pour l'instant, on retourne des données mockées
    
    const mockTransactions = []
    
    // Générer quelques transactions de démo
    for (let i = 0; i < 20; i++) {
      const date = new Date()
      date.setDate(date.getDate() - Math.floor(Math.random() * 30))
      
      const directionValue = Math.random() > 0.5 ? 'in' : 'out'
      const amount = Math.random() * 2 + 0.1
      
      mockTransactions.push({
        id: `stx-${String(i + 1).padStart(3, '0')}`,
        txHash: `mock${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
        walletId: walletId || `sw-${Math.floor(Math.random() * 4) + 1}`,
        walletName: `Wallet ${Math.floor(Math.random() * 4) + 1}`,
        walletAddress: `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa`,
        network: 'Bitcoin Mainnet',
        date: date.toISOString(),
        direction: directionValue,
        amount: parseFloat(amount.toFixed(8)),
        amountUSD: parseFloat((amount * 85000).toFixed(2)),
        fee: parseFloat((Math.random() * 0.0001).toFixed(8)),
        confirmations: Math.floor(Math.random() * 5000) + 100,
        blockHeight: Math.floor(Math.random() * 100000) + 800000,
        fromAddress: directionValue === 'in' ? `from${Math.random().toString(36).substring(2, 15)}` : undefined,
        toAddress: directionValue === 'out' ? `to${Math.random().toString(36).substring(2, 15)}` : undefined,
        classification: 'cat-005', // Unclassified par défaut
        tags: [],
        notes: '',
        status: 'confirmed'
      })
    }
    
    // Appliquer les filtres
    let filtered = mockTransactions
    
    if (walletId) {
      filtered = filtered.filter(tx => tx.walletId === walletId)
    }
    
    if (classification) {
      filtered = filtered.filter(tx => tx.classification === classification)
    }
    
    if (direction) {
      filtered = filtered.filter(tx => tx.direction === direction)
    }
    
    if (startDate) {
      filtered = filtered.filter(tx => new Date(tx.date) >= new Date(startDate))
    }
    
    if (endDate) {
      filtered = filtered.filter(tx => new Date(tx.date) <= new Date(endDate))
    }
    
    if (minAmount) {
      filtered = filtered.filter(tx => tx.amount >= parseFloat(minAmount))
    }
    
    if (maxAmount) {
      filtered = filtered.filter(tx => tx.amount <= parseFloat(maxAmount))
    }
    
    return NextResponse.json({
      success: true,
      transactions: filtered,
      count: filtered.length,
      filters: {
        walletId,
        classification,
        direction,
        startDate,
        endDate,
        minAmount,
        maxAmount
      }
    })
  } catch (error) {
    console.error('Error in scraper/transactions:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch transactions',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}


