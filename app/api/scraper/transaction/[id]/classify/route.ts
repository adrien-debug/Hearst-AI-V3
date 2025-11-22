import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { classification, tags, notes } = body
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Transaction ID is required' },
        { status: 400 }
      )
    }
    
    // TODO: Mettre à jour dans la base de données
    // Pour l'instant, on retourne juste une confirmation
    
    const updatedTransaction = {
      id,
      classification: classification || 'cat-005',
      tags: tags || [],
      notes: notes || '',
      updatedAt: new Date().toISOString()
    }
    
    return NextResponse.json({
      success: true,
      transaction: updatedTransaction
    })
  } catch (error) {
    console.error('Error in scraper/transaction/[id]/classify:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to classify transaction',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

