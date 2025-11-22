import { NextRequest, NextResponse } from 'next/server'

// Mock data - À remplacer par une vraie base de données
let transactions = [
  {
    id: 'TX-2024-001',
    date: '2024-11-22T14:30:00Z',
    timestamp: 1732282200000,
    from: {
      walletId: 'wallet-001',
      name: 'Main Mining Wallet',
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
    },
    to: {
      walletId: 'wallet-101',
      name: 'Cold Storage Vault',
      address: '3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy'
    },
    amount: 0.5000,
    currency: 'BTC',
    amountUSD: 42500.00,
    fee: 0.0001,
    total: 0.5001,
    status: 'pending',
    notes: 'Weekly automatic transfer to cold storage',
    period: 'weekly',
    validated: false,
    validatedAt: null,
    txHash: null
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const period = searchParams.get('period')
    
    let filtered = [...transactions]
    
    if (status && status !== 'all') {
      filtered = filtered.filter(tx => tx.status === status)
    }
    
    if (period && period !== 'all') {
      const now = new Date()
      filtered = filtered.filter(tx => {
        const txDate = new Date(tx.date)
        switch (period) {
          case 'daily':
            return txDate.toDateString() === now.toDateString()
          case 'weekly':
            const weekAgo = new Date(now)
            weekAgo.setDate(now.getDate() - 7)
            return txDate >= weekAgo && txDate <= now
          case 'monthly':
            return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear()
          default:
            return true
        }
      })
    }
    
    return NextResponse.json({ success: true, data: filtered })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newTx = {
      id: `TX-2024-${String(transactions.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString(),
      timestamp: Date.now(),
      ...body,
      createdAt: new Date().toISOString()
    }
    
    transactions.push(newTx)
    
    return NextResponse.json({ success: true, data: newTx }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create transaction' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    
    const index = transactions.findIndex(tx => tx.id === id)
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Transaction not found' },
        { status: 404 }
      )
    }
    
    transactions[index] = {
      ...transactions[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    return NextResponse.json({ success: true, data: transactions[index] })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update transaction' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Transaction ID required' },
        { status: 400 }
      )
    }
    
    const index = transactions.findIndex(tx => tx.id === id)
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Transaction not found' },
        { status: 404 }
      )
    }
    
    transactions.splice(index, 1)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete transaction' },
      { status: 500 }
    )
  }
}

