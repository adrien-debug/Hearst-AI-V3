'use client'

import { useState, useEffect, useRef } from 'react'
import {
  UploadIcon,
  FolderIcon,
  SearchIcon,
  SettingsIcon,
  DownloadIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  XIcon,
  CheckIcon,
  WarningIcon,
  StatusErrorIcon,
  StatusWarningIcon,
  StatusGoodIcon,
  StatusExcellentIcon,
  SignatureIcon,
  ClockIcon,
  ArchiveIcon,
  RefreshIcon,
  FileIcon,
  TagIcon
} from '@/components/icons/PremiumIcons'

// Types
interface Document {
  id: string
  filename: string
  originalName: string
  type: string
  size: number
  category: string
  uploadDate: string
  modifiedDate: string
  uploadedBy: string
  contractStart?: string
  contractEnd?: string
  expirationDate?: string
  daysUntilExpiration?: number
  tags: string[]
  description: string
  relatedHoster?: string
  relatedBatches?: string[]
  ocrExtracted?: any
  notes: string
  signed: boolean
  signedBy?: string[]
  signedDate?: string
  versions?: DocumentVersion[]
  thumbnailUrl?: string
  fileUrl: string
  selected?: boolean
}

interface DocumentVersion {
  version: string
  date: string
  uploadedBy: string
  size: number
  changes: string
}

interface DocumentCategory {
  id: string
  name: string
  icon: string
  count: number
  color: string
}

interface DocumentTag {
  id: string
  name: string
  count: number
  color: string
}

// Demo Data
const demoDocuments: Document[] = [
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
    ocrExtracted: {
      contractValue: 62400,
      currency: 'USD',
      period: 'year',
      electricityRate: 0.072,
      hostingFee: 25,
      parties: ['HearstAI Mining LLC', 'DataCenter USA Inc.']
    },
    notes: 'Annual contract with auto-renewal option. 30 days notice required for cancellation. Contact: john.smith@datacenterusa.com',
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
    thumbnailUrl: '/uploads/thumbnails/doc-001-thumb.jpg',
    fileUrl: '/uploads/documents/doc-001.pdf'
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
    ocrExtracted: {
      invoiceNumber: 'INV-2024-11-001',
      amount: 5250.0,
      currency: 'USD',
      dueDate: '2024-12-05',
      consumption: '72,917 kWh',
      rate: 0.072
    },
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
    description: 'Purchase order for 10x Antminer S19 Pro units - Batch #02',
    relatedBatches: ['batch-002'],
    ocrExtracted: {
      poNumber: 'PO-2024-001',
      supplier: 'Bitmain Technologies',
      quantity: 10,
      unitPrice: 4500,
      totalAmount: 45000,
      currency: 'USD',
      deliveryDate: '2024-01-10'
    },
    notes: 'Paid via wire transfer. Delivery confirmed on schedule.',
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
    ocrExtracted: {
      policyNumber: 'GL-2024-8765',
      insurer: 'Crypto Insurance Corp',
      coverage: 2000000,
      currency: 'USD',
      premium: 15000
    },
    notes: 'CRITICAL: Expires in 5 days! Contact broker to renew.',
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
    description: 'Manufacturer warranty for Batch #01 Antminer S19 XP units',
    relatedBatches: ['batch-001'],
    ocrExtracted: {
      warrantyPeriod: '12 months',
      serialNumbers: ['AS19P-001-2024', 'AS19P-002-2024', 'AS19P-003-2024', 'AS19P-004-2024', 'AS19P-005-2024'],
      manufacturer: 'Bitmain Technologies'
    },
    notes: '',
    signed: false,
    fileUrl: '/uploads/documents/doc-005.pdf'
  }
]

const documentCategories: DocumentCategory[] = [
  { id: 'contracts', name: 'Contracts', icon: 'contract', count: 45, color: '#2196F3' },
  { id: 'invoices', name: 'Invoices', icon: 'invoice', count: 89, color: '#FFC107' },
  { id: 'purchase-orders', name: 'Purchase Orders', icon: 'purchase', count: 34, color: '#9C27B0' },
  { id: 'insurance', name: 'Insurance Policies', icon: 'insurance', count: 12, color: '#4CAF50' },
  { id: 'warranties', name: 'Warranties', icon: 'warranty', count: 28, color: '#FF9800' },
  { id: 'other', name: 'Other Documents', icon: 'other', count: 39, color: '#607D8B' }
]

const documentTags: DocumentTag[] = [
  { id: 'urgent', name: 'urgent', count: 5, color: '#F44336' },
  { id: 'archived', name: 'archived', count: 45, color: '#9E9E9E' },
  { id: 'pending', name: 'pending', count: 8, color: '#FFC107' },
  { id: 'datacenter', name: 'datacenter', count: 23, color: '#2196F3' },
  { id: 'annual', name: 'annual', count: 15, color: '#4CAF50' },
  { id: 'mining-farm', name: 'mining-farm', count: 18, color: '#FF9800' }
]

// Helper Functions
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const truncateFilename = (filename: string, maxLength: number = 30): string => {
  if (filename.length <= maxLength) return filename
  return filename.substring(0, maxLength - 3) + '...'
}

const getExpirationClass = (days?: number): string => {
  if (!days) return 'badge-active'
  if (days < 0) return 'badge-expired'
  if (days <= 7) return 'badge-expiring-critical'
  if (days <= 30) return 'badge-expiring-warning'
  return 'badge-expiring-soon'
}

const getExpirationText = (days?: number): string => {
  if (!days) return 'Active'
  if (days < 0) return `Expired ${Math.abs(days)}d ago`
  if (days === 0) return 'Expires today'
  return `${days} days`
}

const getCategoryName = (categoryId: string): string => {
  const category = documentCategories.find(c => c.id === categoryId)
  return category?.name || 'Other'
}

const getCategoryIcon = (categoryId: string): JSX.Element => {
  const category = documentCategories.find(c => c.id === categoryId)
  return <FileIcon size={24} color={category?.color || '#888'} />
}

export default function DocumentsVault() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid')
  const [sortBy, setSortBy] = useState<string>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedDocuments, setSelectedDocuments] = useState<Set<string>>(new Set())
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showViewerModal, setShowViewerModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [showVersionModal, setShowVersionModal] = useState(false)
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null)
  const [uploadFiles, setUploadFiles] = useState<File[]>([])
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  // Load documents on mount
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const response = await fetch('/api/documents')
        const data = await response.json()
        if (data.success) {
          setDocuments(data.documents)
        } else {
          // Fallback to demo data
          setDocuments(demoDocuments)
        }
      } catch (error) {
        console.error('Failed to load documents:', error)
        // Fallback to demo data
        setDocuments(demoDocuments)
      } finally {
        setLoading(false)
      }
    }
    loadDocuments()
  }, [])

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    if (selectedCategory !== 'all' && doc.category !== selectedCategory) return false
    if (selectedTags.length > 0 && !selectedTags.some(tag => doc.tags.includes(tag))) return false
    if (searchTerm && !doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !doc.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !doc.notes.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    let comparison = 0
    switch (sortBy) {
      case 'name':
        comparison = a.filename.localeCompare(b.filename)
        break
      case 'size':
        comparison = a.size - b.size
        break
      case 'date':
        comparison = new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
        break
      case 'expiration':
        const aDays = a.daysUntilExpiration ?? Infinity
        const bDays = b.daysUntilExpiration ?? Infinity
        comparison = aDays - bDays
        break
      default:
        comparison = 0
    }
    return sortOrder === 'asc' ? comparison : -comparison
  })

  // Stats
  const totalDocuments = documents.length
  const expiringSoon = documents.filter(d => d.daysUntilExpiration !== undefined && d.daysUntilExpiration <= 30 && d.daysUntilExpiration >= 0).length
  const totalSize = documents.reduce((sum, d) => sum + d.size, 0)
  const recentUploads = documents.filter(d => {
    const uploadDate = new Date(d.uploadDate)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return uploadDate >= sevenDaysAgo
  }).length

  // Handlers
  const toggleDocumentSelection = (docId: string) => {
    const newSelected = new Set(selectedDocuments)
    if (newSelected.has(docId)) {
      newSelected.delete(docId)
    } else {
      newSelected.add(docId)
    }
    setSelectedDocuments(newSelected)
  }

  const selectAllDocuments = () => {
    const allIds = new Set(sortedDocuments.map(d => d.id))
    setSelectedDocuments(allIds)
  }

  const deselectAllDocuments = () => {
    setSelectedDocuments(new Set())
  }

  const viewDocument = (docId: string) => {
    const doc = documents.find(d => d.id === docId)
    if (doc) {
      setCurrentDocument(doc)
      setShowViewerModal(true)
    }
  }

  const editDocument = (docId: string) => {
    const doc = documents.find(d => d.id === docId)
    if (doc) {
      setCurrentDocument(doc)
      setShowEditModal(true)
    }
  }

  const deleteDocument = async (docId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return
    try {
      const response = await fetch(`/api/documents/${docId}`, { method: 'DELETE' })
      if (response.ok) {
        setDocuments(documents.filter(d => d.id !== docId))
        setSelectedDocuments(new Set())
      }
    } catch (error) {
      console.error('Failed to delete document:', error)
      alert('Failed to delete document')
    }
  }

  const downloadDocument = (docId: string) => {
    const doc = documents.find(d => d.id === docId)
    if (doc) {
      window.open(doc.fileUrl, '_blank')
    }
  }

  const bulkDownload = async () => {
    if (selectedDocuments.size === 0) return
    try {
      const response = await fetch('/api/documents/bulk-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentIds: Array.from(selectedDocuments) })
      })
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `documents_${Date.now()}.zip`
        a.click()
        window.URL.revokeObjectURL(url)
        alert(`Downloaded ${selectedDocuments.size} document(s)`)
      } else {
        throw new Error('Download failed')
      }
    } catch (error) {
      console.error('Failed to download documents:', error)
      alert(`Failed to download documents: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  // Upload handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    setUploadFiles(files)
    setShowUploadModal(true)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setUploadFiles(files)
      setShowUploadModal(true)
    }
  }

  const handleUpload = async (metadata: any) => {
    const formData = new FormData()
    uploadFiles.forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })
    formData.append('category', metadata.category)
    formData.append('tags', JSON.stringify(metadata.tags))
    formData.append('expirationDate', metadata.expirationDate || '')
    formData.append('notes', metadata.notes || '')
    formData.append('relatedHoster', metadata.relatedHoster || '')
    formData.append('relatedBatches', JSON.stringify(metadata.relatedBatches || []))

    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        const data = await response.json()
        setDocuments([...documents, ...data.documents])
        setShowUploadModal(false)
        setUploadFiles([])
        alert(`Successfully uploaded ${uploadFiles.length} document(s)`)
      }
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed')
    }
  }

  if (loading) {
    return (
      <div className="documents-vault">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Loading documents...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="documents-vault">
      {/* Header */}
      <div className="vault-header">
        <h1>DOCUMENTS VAULT - Secure Document Management System</h1>
        <div className="vault-header-actions">
          <button className="btn-add-large" onClick={() => setShowUploadModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UploadIcon size={18} /> Upload
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FolderIcon size={16} /> New Folder
          </button>
          <button className="btn-secondary" onClick={() => setShowSearchModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SearchIcon size={16} /> Search
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SettingsIcon size={16} /> Settings
          </button>
          {selectedDocuments.size > 0 && (
            <button className="btn-secondary" onClick={bulkDownload} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <DownloadIcon size={16} /> Bulk Download ({selectedDocuments.size})
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="vault-stats">
        <div className="stat-card">
          <div className="stat-value">{totalDocuments}</div>
          <div className="stat-label">Total Documents</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {expiringSoon}
            {expiringSoon > 0 && <WarningIcon size={20} color="#FFC107" />}
          </div>
          <div className="stat-label">Expiring Soon</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{formatFileSize(totalSize)}</div>
          <div className="stat-label">Size Used</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{recentUploads}</div>
          <div className="stat-label">Recent Uploads (7d)</div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="vault-main-layout">
        {/* Sidebar */}
        <div className="vault-sidebar">
          <div className="sidebar-section">
            <h3>ALL DOCUMENTS</h3>
            <div className="sidebar-category" onClick={() => setSelectedCategory('all')}>
              <span>All Documents</span>
              <span className="category-count">{totalDocuments}</span>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>CATEGORIES</h3>
            {documentCategories.map(cat => (
              <div
                key={cat.id}
                className={`sidebar-category ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.name}</span>
                <span className="category-count">{cat.count}</span>
              </div>
            ))}
          </div>

          <div className="sidebar-section">
            <h3>TAGS</h3>
            {documentTags.map(tag => (
              <div
                key={tag.id}
                className={`sidebar-tag ${selectedTags.includes(tag.id) ? 'active' : ''}`}
                onClick={() => {
                  if (selectedTags.includes(tag.id)) {
                    setSelectedTags(selectedTags.filter(t => t !== tag.id))
                  } else {
                    setSelectedTags([...selectedTags, tag.id])
                  }
                }}
              >
                <TagIcon size={14} />
                <span>{tag.name}</span>
                <span className="tag-count">({tag.count})</span>
              </div>
            ))}
            <button className="btn-add-tag" onClick={() => {}}>+ Add tag</button>
          </div>

          <div className="sidebar-section">
            <h3>EXPIRING SOON</h3>
            {documents
              .filter(d => d.daysUntilExpiration !== undefined && d.daysUntilExpiration <= 30)
              .slice(0, 5)
              .map(doc => (
                <div key={doc.id} className="expiring-item">
                  <WarningIcon size={14} color={doc.daysUntilExpiration! <= 7 ? '#F44336' : '#FFC107'} />
                  <span>{truncateFilename(doc.filename, 20)}</span>
                  <span className="expiring-days">({doc.daysUntilExpiration}d)</span>
                </div>
              ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="vault-content">
          {/* Toolbar */}
          <div className="vault-toolbar">
            <div className="view-mode-selector">
              <button
                className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button
                className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
              <button
                className={`view-mode-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
              >
                Table
              </button>
            </div>

            <div className="sort-filter-controls">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="size">Sort by Size</option>
                <option value="expiration">Sort by Expiration</option>
              </select>
              <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="sort-order-btn">
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>

            {selectedDocuments.size > 0 && (
              <div className="bulk-actions-bar">
                <span>{selectedDocuments.size} selected</span>
                <button onClick={deselectAllDocuments}>Deselect All</button>
                <button onClick={bulkDownload}>Download</button>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            )}
          </div>

          {/* Documents Grid/List/Table */}
          <div className="documents-container" ref={dropZoneRef} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            {dragOver && (
              <div className="drag-drop-overlay">
                <UploadIcon size={64} color="#8afd81" />
                <p>Drop files here to upload</p>
              </div>
            )}

            {viewMode === 'grid' && (
              <div className="documents-grid">
                {sortedDocuments.map(doc => (
                  <div
                    key={doc.id}
                    className={`doc-card ${selectedDocuments.has(doc.id) ? 'selected' : ''}`}
                    onClick={() => toggleDocumentSelection(doc.id)}
                  >
                    <input
                      type="checkbox"
                      className="doc-checkbox"
                      checked={selectedDocuments.has(doc.id)}
                      onChange={() => toggleDocumentSelection(doc.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    {doc.daysUntilExpiration !== undefined && (
                      <span className={`expiration-badge ${getExpirationClass(doc.daysUntilExpiration)}`}>
                        {getExpirationText(doc.daysUntilExpiration)}
                      </span>
                    )}
                    <div className="doc-thumbnail">
                      {doc.thumbnailUrl ? (
                        <img src={doc.thumbnailUrl} alt={doc.filename} />
                      ) : (
                        <div className="doc-icon-large">{getCategoryIcon(doc.category)}</div>
                      )}
                    </div>
                    <h4 className="doc-title">{truncateFilename(doc.filename, 30)}</h4>
                    <div className="doc-meta">
                      <p><small>Type: {getCategoryName(doc.category)}</small></p>
                      <p><small>Size: {formatFileSize(doc.size)}</small></p>
                      <p><small>Uploaded: {formatDate(doc.uploadDate)}</small></p>
                      {doc.expirationDate && (
                        <p><small>Expires: {formatDate(doc.expirationDate)}</small></p>
                      )}
                    </div>
                    <div className="doc-tags">
                      {doc.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag-chip">{tag}</span>
                      ))}
                    </div>
                    <div className="doc-actions" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => viewDocument(doc.id)}>
                        <EyeIcon size={16} />
                      </button>
                      <button onClick={() => downloadDocument(doc.id)}>
                        <DownloadIcon size={16} />
                      </button>
                      <button onClick={() => editDocument(doc.id)}>
                        <EditIcon size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {viewMode === 'table' && (
              <table className="documents-table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectedDocuments.size === sortedDocuments.length && sortedDocuments.length > 0}
                        onChange={(e) => e.target.checked ? selectAllDocuments() : deselectAllDocuments()}
                      />
                    </th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Size</th>
                    <th>Upload Date</th>
                    <th>Expires</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDocuments.map(doc => (
                    <tr key={doc.id} className={selectedDocuments.has(doc.id) ? 'selected' : ''}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedDocuments.has(doc.id)}
                          onChange={() => toggleDocumentSelection(doc.id)}
                        />
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {getCategoryIcon(doc.category)}
                          <span>{doc.filename}</span>
                        </div>
                      </td>
                      <td>{getCategoryName(doc.category)}</td>
                      <td>{formatFileSize(doc.size)}</td>
                      <td>{formatDate(doc.uploadDate)}</td>
                      <td>
                        {doc.daysUntilExpiration !== undefined ? (
                          <span className={`expiration-badge ${getExpirationClass(doc.daysUntilExpiration)}`}>
                            {getExpirationText(doc.daysUntilExpiration)}
                          </span>
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td>
                        <div className="table-actions">
                          <button onClick={() => viewDocument(doc.id)}>
                            <EyeIcon size={14} />
                          </button>
                          <button onClick={() => downloadDocument(doc.id)}>
                            <DownloadIcon size={14} />
                          </button>
                          <button onClick={() => editDocument(doc.id)}>
                            <EditIcon size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="vault-pagination">
            <button>◀</button>
            <span>Page 1 of 1</span>
            <button>▶</button>
            <span>Showing 1-{sortedDocuments.length} of {sortedDocuments.length} documents</span>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          files={uploadFiles}
          onClose={() => {
            setShowUploadModal(false)
            setUploadFiles([])
          }}
          onUpload={handleUpload}
          onFileSelect={handleFileSelect}
          fileInputRef={fileInputRef}
          onRemoveFile={(index) => {
            setUploadFiles(uploadFiles.filter((_, i) => i !== index))
          }}
        />
      )}

      {/* Document Viewer Modal */}
      {showViewerModal && currentDocument && (
        <DocumentViewerModal
          document={currentDocument}
          onClose={() => {
            setShowViewerModal(false)
            setCurrentDocument(null)
          }}
          onEdit={() => {
            setShowViewerModal(false)
            setShowEditModal(true)
          }}
          onVersionHistory={() => {
            setShowViewerModal(false)
            setShowVersionModal(true)
          }}
          onSignature={() => {
            setShowViewerModal(false)
            setShowSignatureModal(true)
          }}
        />
      )}

      {/* Edit Document Modal */}
      {showEditModal && currentDocument && (
        <EditDocumentModal
          document={currentDocument}
          onClose={() => {
            setShowEditModal(false)
            setCurrentDocument(null)
          }}
          onSave={(updatedDoc) => {
            setDocuments(documents.map(d => d.id === updatedDoc.id ? updatedDoc : d))
            setShowEditModal(false)
            setCurrentDocument(null)
          }}
        />
      )}

      {/* Advanced Search Modal */}
      {showSearchModal && (
        <AdvancedSearchModal
          onClose={() => setShowSearchModal(false)}
          onSearch={(results) => {
            // Filter documents based on search results
            setShowSearchModal(false)
          }}
        />
      )}

      {/* Version History Modal */}
      {showVersionModal && currentDocument && (
        <VersionHistoryModal
          document={currentDocument}
          onClose={() => {
            setShowVersionModal(false)
            setCurrentDocument(null)
          }}
        />
      )}

      {/* Signature Modal */}
      {showSignatureModal && currentDocument && (
        <SignatureModal
          document={currentDocument}
          onClose={() => {
            setShowSignatureModal(false)
            setCurrentDocument(null)
          }}
        />
      )}
    </div>
  )
}

// Upload Modal Component
function UploadModal({
  files,
  onClose,
  onUpload,
  onFileSelect,
  fileInputRef,
  onRemoveFile
}: {
  files: File[]
  onClose: () => void
  onUpload: (metadata: any) => void
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  fileInputRef: React.RefObject<HTMLInputElement>
  onRemoveFile: (index: number) => void
}) {
  const [metadata, setMetadata] = useState({
    category: 'contracts',
    tags: [] as string[],
    expirationDate: '',
    notes: '',
    relatedHoster: '',
    relatedBatches: [] as string[],
    extractOCR: false
  })
  const [dragOver, setDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    // Files are handled by parent component
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UploadIcon size={24} /> UPLOAD DOCUMENTS
          </h2>
          <button className="modal-close" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XIcon size={20} />
          </button>
        </div>

        <div className="modal-content">
          <div
            className={`drag-drop-zone ${dragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadIcon size={64} color="#8afd81" />
            <h3>DRAG & DROP ZONE</h3>
            <p>Drag files here or click to browse</p>
            <p>Supported formats: PDF, DOCX, XLSX, JPG, PNG</p>
            <p>Maximum file size: 50 MB per file</p>
            <button className="btn-secondary" style={{ marginTop: '16px' }}>
              Browse Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={onFileSelect}
              accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
            />
          </div>

          {files.length > 0 && (
            <>
              <div className="selected-files-list">
                <h3>SELECTED FILES ({files.length})</h3>
                {files.map((file, index) => (
                  <div key={index} className="selected-file-item">
                    <FileIcon size={16} />
                    <span>{file.name} ({formatFileSize(file.size)})</span>
                    <button onClick={() => onRemoveFile(index)}>Remove</button>
                  </div>
                ))}
              </div>

              <div className="form-section">
                <h3>DOCUMENT INFORMATION</h3>
                <div className="form-group">
                  <label>Category:</label>
                  <select value={metadata.category} onChange={(e) => setMetadata({ ...metadata, category: e.target.value })}>
                    {documentCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Tags:</label>
                  <input
                    type="text"
                    placeholder="Enter tags separated by commas"
                    value={metadata.tags.join(', ')}
                    onChange={(e) => setMetadata({ ...metadata, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                  />
                </div>

                <div className="form-group">
                  <label>Expiration Date (optional):</label>
                  <input
                    type="date"
                    value={metadata.expirationDate}
                    onChange={(e) => setMetadata({ ...metadata, expirationDate: e.target.value })}
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={metadata.extractOCR}
                      onChange={(e) => setMetadata({ ...metadata, extractOCR: e.target.checked })}
                    />
                    Send reminder 30 days before
                  </label>
                </div>

                <div className="form-group">
                  <label>Notes:</label>
                  <textarea
                    value={metadata.notes}
                    onChange={(e) => setMetadata({ ...metadata, notes: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={metadata.extractOCR}
                      onChange={(e) => setMetadata({ ...metadata, extractOCR: e.target.checked })}
                    />
                    Extract data with OCR (if supported)
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          {files.length > 0 && (
            <button className="btn-add-large" onClick={() => onUpload(metadata)}>
              Upload {files.length} Document{files.length > 1 ? 's' : ''}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Document Viewer Modal Component
function DocumentViewerModal({
  document,
  onClose,
  onEdit,
  onVersionHistory,
  onSignature
}: {
  document: Document
  onClose: () => void
  onEdit: () => void
  onVersionHistory: () => void
  onSignature: () => void
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-extra-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileIcon size={24} /> DOCUMENT VIEWER - {document.filename}
          </h2>
          <button className="modal-close" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XIcon size={20} />
          </button>
        </div>

        <div className="viewer-layout">
          <div className="viewer-preview">
            <div className="pdf-viewer-container">
              <p>PDF Viewer Placeholder</p>
              <p>Document: {document.filename}</p>
            </div>
            <div className="viewer-controls">
              <button>◀ Previous</button>
              <span>Page 1 of 12</span>
              <button>Next ▶</button>
              <button>Download</button>
              <button>Print</button>
            </div>
          </div>

          <div className="viewer-details">
            <div className="details-section">
              <h3>GENERAL INFO</h3>
              <p><strong>Name:</strong> {document.filename}</p>
              <p><strong>Type:</strong> PDF Document</p>
              <p><strong>Size:</strong> {formatFileSize(document.size)}</p>
              <p><strong>Pages:</strong> 12</p>
            </div>

            <div className="details-section">
              <h3>DATES</h3>
              <p><strong>Uploaded:</strong> {formatDateTime(document.uploadDate)}</p>
              <p><strong>Modified:</strong> {formatDateTime(document.modifiedDate)}</p>
              {document.contractStart && <p><strong>Contract Start:</strong> {formatDate(document.contractStart)}</p>}
              {document.contractEnd && <p><strong>Contract End:</strong> {formatDate(document.contractEnd)}</p>}
              {document.expirationDate && (
                <p>
                  <strong>Expires in:</strong>{' '}
                  <span className={`expiration-badge ${getExpirationClass(document.daysUntilExpiration)}`}>
                    {getExpirationText(document.daysUntilExpiration)}
                  </span>
                </p>
              )}
            </div>

            <div className="details-section">
              <h3>CLASSIFICATION</h3>
              <p><strong>Category:</strong> {getCategoryName(document.category)}</p>
              <div className="tags-list">
                {document.tags.map(tag => (
                  <span key={tag} className="tag-chip">{tag}</span>
                ))}
              </div>
            </div>

            {document.ocrExtracted && (
              <div className="details-section">
                <h3>OCR EXTRACTED DATA</h3>
                {Object.entries(document.ocrExtracted).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong> {String(value)}
                  </p>
                ))}
              </div>
            )}

            <div className="details-section">
              <h3>ACTIONS</h3>
              <button className="btn-secondary" onClick={onEdit} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', marginBottom: '8px' }}>
                <EditIcon size={16} /> Edit Details
              </button>
              <button className="btn-secondary" onClick={onVersionHistory} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', marginBottom: '8px' }}>
                <ClockIcon size={16} /> Version History
              </button>
              <button className="btn-secondary" onClick={onSignature} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', marginBottom: '8px' }}>
                <SignatureIcon size={16} /> Request Signature
              </button>
              <button className="btn-secondary" onClick={() => window.open(document.fileUrl, '_blank')} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                <DownloadIcon size={16} /> Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Edit Document Modal Component
function EditDocumentModal({
  document,
  onClose,
  onSave
}: {
  document: Document
  onClose: () => void
  onSave: (doc: Document) => void
}) {
  const [formData, setFormData] = useState(document)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <EditIcon size={24} /> EDIT DOCUMENT DETAILS
          </h2>
          <button className="modal-close" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XIcon size={20} />
          </button>
        </div>

        <div className="modal-content">
          <div className="form-section">
            <h3>BASIC INFORMATION</h3>
            <div className="form-group">
              <label>Document Name:</label>
              <input
                type="text"
                value={formData.filename}
                onChange={(e) => setFormData({ ...formData, filename: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {documentCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>DATES & EXPIRATION</h3>
            <div className="form-group">
              <label>Contract Start Date:</label>
              <input
                type="date"
                value={formData.contractStart || ''}
                onChange={(e) => setFormData({ ...formData, contractStart: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Contract End Date / Expiration:</label>
              <input
                type="date"
                value={formData.expirationDate || ''}
                onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>TAGS & CLASSIFICATION</h3>
            <div className="form-group">
              <label>Tags:</label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>NOTES</h3>
            <div className="form-group">
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-add-large" onClick={() => onSave(formData)}>Save Changes</button>
        </div>
      </div>
    </div>
  )
}

// Advanced Search Modal Component
function AdvancedSearchModal({
  onClose,
  onSearch
}: {
  onClose: () => void
  onSearch: (results: Document[]) => void
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SearchIcon size={24} /> ADVANCED DOCUMENT SEARCH
          </h2>
          <button className="modal-close" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XIcon size={20} />
          </button>
        </div>

        <div className="modal-content">
          <div className="form-section">
            <h3>SEARCH CRITERIA</h3>
            <div className="form-group">
              <label>Search Text:</label>
              <input type="text" placeholder="Search in filename, content, notes..." />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <select>
                <option value="all">All Categories</option>
                {documentCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Date Range:</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="date" />
                <span>to</span>
                <input type="date" />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-add-large" onClick={() => onSearch([])}>Search</button>
        </div>
      </div>
    </div>
  )
}

// Version History Modal Component
function VersionHistoryModal({
  document,
  onClose
}: {
  document: Document
  onClose: () => void
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ClockIcon size={24} /> VERSION HISTORY - {document.filename}
          </h2>
          <button className="modal-close" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XIcon size={20} />
          </button>
        </div>

        <div className="modal-content">
          <div className="version-timeline">
            {document.versions?.map((version, index) => (
              <div key={index} className="version-item">
                <div className="version-header">
                  <span className="version-number">v{version.version}</span>
                  {index === 0 && <span className="version-current">CURRENT</span>}
                </div>
                <div className="version-details">
                  <p><strong>Date:</strong> {formatDateTime(version.date)}</p>
                  <p><strong>Uploaded by:</strong> {version.uploadedBy}</p>
                  <p><strong>Size:</strong> {formatFileSize(version.size)}</p>
                  <p><strong>Changes:</strong> {version.changes}</p>
                </div>
                <div className="version-actions">
                  <button><EyeIcon size={14} /> View</button>
                  <button><DownloadIcon size={14} /> Download</button>
                  {index > 0 && <button>Restore</button>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

// Signature Modal Component
function SignatureModal({
  document,
  onClose
}: {
  document: Document
  onClose: () => void
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SignatureIcon size={24} /> SIGNATURE REQUEST - {document.filename}
          </h2>
          <button className="modal-close" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XIcon size={20} />
          </button>
        </div>

        <div className="modal-content">
          <div className="form-section">
            <h3>SIGNATURE WORKFLOW</h3>
            <p>Document: {document.filename}</p>
            <p>Status: {document.signed ? 'Signed' : 'Pending Signatures'}</p>
          </div>

          <div className="form-section">
            <h3>SIGNERS</h3>
            {document.signedBy?.map((signer, index) => (
              <div key={index} className="signer-item">
                <CheckIcon size={16} color="#4CAF50" />
                <span>{signer}</span>
                {document.signedDate && <span>Signed: {formatDateTime(document.signedDate)}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          {!document.signed && (
            <button className="btn-add-large">Sign Now</button>
          )}
        </div>
      </div>
    </div>
  )
}

