import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      color,
      icon,
      description,
      taxCategory,
      autoRule
    } = body
    
    if (!name || !color || !icon) {
      return NextResponse.json(
        { success: false, error: 'Name, color, and icon are required' },
        { status: 400 }
      )
    }
    
    // TODO: Sauvegarder dans la base de données
    // Pour l'instant, on retourne juste une confirmation
    
    const category = {
      id: `cat-${Date.now()}`,
      name,
      color,
      icon,
      description: description || '',
      taxCategory: taxCategory || 'unknown',
      autoRule: autoRule || null,
      txCount: 0,
      volume: 0,
      createdAt: new Date().toISOString()
    }
    
    return NextResponse.json({
      success: true,
      category
    })
  } catch (error) {
    console.error('Error in scraper/classification/create:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create classification',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}


