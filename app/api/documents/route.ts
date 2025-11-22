import { NextRequest, NextResponse } from 'next/server'

// Mock documents data
const mockDocuments = [
  {
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
    notes: 'Annual contract with auto-renewal option.',
    signed: true,
    signedBy: ['john.smith@datacenterusa.com', 'admin@hearstai.com'],
    signedDate: '2024-01-15T14:00:00Z',
    fileUrl: '/uploads/documents/doc-001.pdf',
    thumbnailUrl: null // Thumbnail will be generated on upload
  },
  {
    id: 'doc-002',
    filename: 'Invoice_Electricity_November_2024.pdf',
    originalName: 'Invoice_Electricity_November_2024.pdf',
    type: 'application/pdf',
    size: 876544,
    category: 'invoices',
    uploadDate: '2024-11-05T09:15:00Z',
    modifiedDate: '2024-11-05T09:15:00Z',
    uploadedBy: 'admin@hearstai.com',
    tags: ['electricity', 'november', '2024', 'datacenter'],
    description: 'Monthly electricity invoice for November 2024',
    relatedHoster: 'hoster-001',
    notes: '',
    signed: false,
    fileUrl: '/uploads/documents/doc-002.pdf'
  },
  {
    id: 'doc-003',
    filename: 'Purchase_Order_Antminer_S19_Pro_Batch02.pdf',
    originalName: 'PO-2024-001-Antminer-S19-Pro.pdf',
    type: 'application/pdf',
    size: 1228800,
    category: 'purchase-orders',
    uploadDate: '2023-12-20T14:00:00Z',
    modifiedDate: '2023-12-20T14:00:00Z',
    uploadedBy: 'admin@hearstai.com',
    tags: ['antminer', 's19-pro', 'batch-02', 'capital-expense'],
    description: 'Purchase order for 10x Antminer S19 Pro units',
    relatedBatches: ['batch-002'],
    notes: 'Paid via wire transfer.',
    signed: false,
    fileUrl: '/uploads/documents/doc-003.pdf'
  },
  {
    id: 'doc-004',
    filename: 'Insurance_General_Liability_Policy.pdf',
    originalName: 'Insurance_General_Liability_Policy_2024.pdf',
    type: 'application/pdf',
    size: 3252224,
    category: 'insurance',
    uploadDate: '2024-03-10T11:00:00Z',
    modifiedDate: '2024-03-10T11:00:00Z',
    uploadedBy: 'admin@hearstai.com',
    expirationDate: '2024-11-28',
    daysUntilExpiration: 5,
    tags: ['insurance', 'liability', 'critical'],
    description: 'General liability insurance policy',
    notes: 'CRITICAL: Expires in 5 days!',
    signed: false,
    fileUrl: '/uploads/documents/doc-004.pdf'
  },
  {
    id: 'doc-005',
    filename: 'Warranty_Antminer_S19_XP_Batch01.pdf',
    originalName: 'Warranty-Antminer-S19-XP-Serial-AS19P-001-005.pdf',
    type: 'application/pdf',
    size: 1843200,
    category: 'warranties',
    uploadDate: '2024-01-20T16:30:00Z',
    modifiedDate: '2024-01-20T16:30:00Z',
    uploadedBy: 'admin@hearstai.com',
    expirationDate: '2025-01-20',
    daysUntilExpiration: 59,
    tags: ['warranty', 'antminer', 's19-xp', 'batch-01'],
    description: 'Manufacturer warranty for Batch #01',
    relatedBatches: ['batch-001'],
    notes: '',
    signed: false,
    fileUrl: '/uploads/documents/doc-005.pdf'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const tags = searchParams.get('tags')
    const search = searchParams.get('search')
    const expiringOnly = searchParams.get('expiringOnly')

    let filtered = [...mockDocuments]

    if (category && category !== 'all') {
      filtered = filtered.filter(d => d.category === category)
    }

    if (tags) {
      const tagArray = JSON.parse(tags)
      filtered = filtered.filter(d => tagArray.some((tag: string) => d.tags.includes(tag)))
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(d =>
        d.filename.toLowerCase().includes(searchLower) ||
        d.description.toLowerCase().includes(searchLower) ||
        d.notes.toLowerCase().includes(searchLower)
      )
    }

    if (expiringOnly === 'true') {
      const today = new Date()
      const in30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
      filtered = filtered.filter(d => {
        if (!d.expirationDate) return false
        const expDate = new Date(d.expirationDate)
        return expDate <= in30Days && expDate >= today
      })
    }

    return NextResponse.json({
      success: true,
      documents: filtered
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch documents'
      },
      { status: 500 }
    )
  }
}

