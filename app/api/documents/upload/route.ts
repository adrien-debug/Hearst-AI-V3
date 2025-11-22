import { NextRequest, NextResponse } from 'next/server'

// Mock implementation - In production, use multer or similar for file uploads
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const category = formData.get('category') as string
    const tags = JSON.parse(formData.get('tags') as string || '[]')
    const expirationDate = formData.get('expirationDate') as string || null
    const notes = formData.get('notes') as string || ''
    const relatedHoster = formData.get('relatedHoster') as string || ''
    const relatedBatches = JSON.parse(formData.get('relatedBatches') as string || '[]')
    const extractOCR = formData.get('extractOCR') === 'true'

    // Mock document creation
    const uploadedDocs = files.map((file, index) => {
      const docId = `doc-${Date.now()}-${index}`
      const expiration = expirationDate ? new Date(expirationDate) : undefined
      const daysUntilExpiration = expiration
        ? Math.ceil((expiration.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : undefined

      return {
        id: docId,
        filename: file.name,
        originalName: file.name,
        type: file.type,
        size: file.size,
        category: category || 'other',
        uploadDate: new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
        uploadedBy: 'admin@hearstai.com',
        expirationDate: expirationDate || undefined,
        daysUntilExpiration,
        tags,
        description: notes || '',
        relatedHoster: relatedHoster || undefined,
        relatedBatches: relatedBatches.length > 0 ? relatedBatches : undefined,
        notes,
        signed: false,
        fileUrl: `/uploads/documents/${docId}.pdf`,
        thumbnailUrl: `/uploads/thumbnails/${docId}-thumb.jpg`
      }
    })

    // In production: Save files to storage (S3, local, etc.)
    // In production: Generate thumbnails for PDFs/images
    // In production: Extract OCR if requested

    return NextResponse.json({
      success: true,
      documents: uploadedDocs
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      },
      { status: 500 }
    )
  }
}

