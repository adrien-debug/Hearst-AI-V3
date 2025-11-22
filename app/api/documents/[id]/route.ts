import { NextRequest, NextResponse } from 'next/server'

// Mock document data
const mockDocuments: Record<string, any> = {
  'doc-001': {
    id: 'doc-001',
    filename: 'Contract_DataCenter_USA_2024.pdf',
    originalName: 'Contract_DataCenter_USA_2024.pdf',
    type: 'application/pdf',
    size: 2457600,
    category: 'contracts',
    uploadDate: '2024-01-15T10:30:00Z',
    modifiedDate: '2024-11-20T15:45:00Z',
    uploadedBy: 'admin@hearstai.com',
    contractStart: '2024-01-01',
    contractEnd: '2025-01-01',
    expirationDate: '2025-01-01',
    daysUntilExpiration: 52,
    tags: ['datacenter', 'annual', 'usa', 'auto-renew'],
    description: 'Annual hosting contract with DataCenter USA',
    relatedHoster: 'hoster-001',
    relatedBatches: ['batch-001', 'batch-002', 'batch-004', 'batch-008'],
    ocrExtracted: {
      contractValue: 62400,
      currency: 'USD',
      period: 'year',
      electricityRate: 0.072,
      hostingFee: 25,
      parties: ['HearstAI Mining LLC', 'DataCenter USA Inc.']
    },
    notes: 'Annual contract with auto-renewal option.',
    signed: true,
    signedBy: ['john.smith@datacenterusa.com', 'admin@hearstai.com'],
    signedDate: '2024-01-15T14:00:00Z',
    versions: [
      {
        version: '3.0',
        date: '2024-11-20T15:45:00Z',
        uploadedBy: 'admin@hearstai.com',
        size: 2621440,
        changes: 'Updated pricing section, added appendix B'
      },
      {
        version: '2.1',
        date: '2024-06-15T10:20:00Z',
        uploadedBy: 'admin@hearstai.com',
        size: 2523136,
        changes: 'Minor amendments to payment terms'
      },
      {
        version: '1.0',
        date: '2024-01-15T10:30:00Z',
        uploadedBy: 'admin@hearstai.com',
        size: 2457600,
        changes: 'Original contract upload'
      }
    ],
    fileUrl: '/uploads/documents/doc-001.pdf',
    thumbnailUrl: '/uploads/thumbnails/doc-001-thumb.jpg'
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const document = mockDocuments[params.id]

    if (!document) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      document
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch document'
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const document = mockDocuments[params.id]

    if (!document) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      )
    }

    // Update document
    const updated = {
      ...document,
      ...body,
      modifiedDate: new Date().toISOString()
    }

    mockDocuments[params.id] = updated

    return NextResponse.json({
      success: true,
      document: updated
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update document'
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const document = mockDocuments[params.id]

    if (!document) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      )
    }

    delete mockDocuments[params.id]

    return NextResponse.json({
      success: true,
      message: 'Document deleted'
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete document'
      },
      { status: 500 }
    )
  }
}

