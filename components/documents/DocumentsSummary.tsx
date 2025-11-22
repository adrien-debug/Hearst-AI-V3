'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

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
  expirationDate?: string
  daysUntilExpiration?: number
  tags: string[]
  description: string
  signed: boolean
}

interface DocumentsSummaryProps {
  documents?: Document[]
  loading?: boolean
}

export default function DocumentsSummary({ documents = [], loading = false }: DocumentsSummaryProps) {
  const [displayDocuments, setDisplayDocuments] = useState<Document[]>(documents)

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const response = await fetch('/api/documents')
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setDisplayDocuments(data.documents || [])
          } else {
            // Fallback to mock data
            setDisplayDocuments([
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
                expirationDate: '2025-01-01',
                daysUntilExpiration: 52,
                tags: ['datacenter', 'annual'],
                description: 'Annual hosting contract',
                signed: true,
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
                tags: ['electricity', 'november'],
                description: 'Monthly electricity invoice',
                signed: false,
              },
              {
                id: 'doc-003',
                filename: 'Purchase_Order_Antminer_S19_Pro.pdf',
                originalName: 'PO-2024-001-Antminer-S19-Pro.pdf',
                type: 'application/pdf',
                size: 1228800,
                category: 'purchase-orders',
                uploadDate: '2023-12-20T14:00:00Z',
                modifiedDate: '2023-12-20T14:00:00Z',
                uploadedBy: 'admin@hearstai.com',
                tags: ['antminer', 's19-pro'],
                description: 'Purchase order for Antminer units',
                signed: false,
              },
            ])
          }
        } else {
          // Fallback to mock data
          setDisplayDocuments([
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
              expirationDate: '2025-01-01',
              daysUntilExpiration: 52,
              tags: ['datacenter', 'annual'],
              description: 'Annual hosting contract',
              signed: true,
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
              tags: ['electricity', 'november'],
              description: 'Monthly electricity invoice',
              signed: false,
            },
          ])
        }
      } catch (err) {
        console.error('Error loading documents:', err)
        // Keep mock data
      }
    }

    if (documents.length === 0) {
      loadDocuments()
    } else {
      setDisplayDocuments(documents)
    }
  }, [documents])

  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      contracts: 'Contracts',
      invoices: 'Invoices',
      'purchase-orders': 'Purchase Orders',
      insurance: 'Insurance',
      warranties: 'Warranties',
      other: 'Other',
    }
    return categories[category] || 'Other'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const getStatusColor = (signed: boolean, daysUntilExpiration?: number) => {
    if (signed) return '#a5ff9c'
    if (daysUntilExpiration !== undefined) {
      if (daysUntilExpiration < 0) return '#ff4d4d'
      if (daysUntilExpiration <= 7) return '#ff4d4d'
      if (daysUntilExpiration <= 30) return '#FFA500'
    }
    return '#888'
  }

  const getStatusText = (signed: boolean, daysUntilExpiration?: number) => {
    if (signed) return 'SIGNED'
    if (daysUntilExpiration !== undefined) {
      if (daysUntilExpiration < 0) return 'EXPIRED'
      if (daysUntilExpiration <= 7) return 'EXPIRING SOON'
      if (daysUntilExpiration <= 30) return 'EXPIRING'
    }
    return 'ACTIVE'
  }

  return (
    <div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
          <div className="spinner" style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(165, 255, 156, 0.2)',
            borderTopColor: '#a5ff9c',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto var(--space-4)',
          }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading documents...</p>
        </div>
      ) : displayDocuments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No documents yet.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Category</th>
                <th>Size</th>
                <th>Upload Date</th>
                <th>Expires</th>
                <th>Status</th>
                <th>Uploaded By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <strong>{doc.filename}</strong>
                  </td>
                  <td>{getCategoryName(doc.category)}</td>
                  <td>{formatFileSize(doc.size || 0)}</td>
                  <td>{formatDate(doc.uploadDate)}</td>
                  <td>
                    {doc.expirationDate ? formatDate(doc.expirationDate) : 'N/A'}
                  </td>
                  <td>
                    <span style={{ color: getStatusColor(doc.signed, doc.daysUntilExpiration) }}>
                      {getStatusText(doc.signed, doc.daysUntilExpiration)}
                    </span>
                  </td>
                  <td>{doc.uploadedBy}</td>
                  <td>
                    <Button variant="outline" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

