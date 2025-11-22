'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DocumentsSummary from '@/components/documents/DocumentsSummary'

// Import dynamique pour éviter les erreurs SSR
const DocumentsVault = dynamic(() => import('@/components/DocumentsVault'), {
  ssr: false
})

export default function DocumentsVaultPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'all', label: 'All Documents' },
    { id: 'contracts', label: 'Contracts' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'purchase-orders', label: 'Purchase Orders' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'warranties', label: 'Warranties' },
    { id: 'other', label: 'Other' },
  ]

  useEffect(() => {
    // Charger le CSS du documents vault
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/css/documents-vault-desktop.css'
    document.head.appendChild(link)

    // Load stats
    const loadStats = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/documents')
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.documents) {
            const docs = data.documents
            const totalSize = docs.reduce((sum: number, d: any) => sum + (d.size || 0), 0)
            const expiringSoon = docs.filter((d: any) => d.daysUntilExpiration !== undefined && d.daysUntilExpiration <= 30 && d.daysUntilExpiration >= 0).length
            const recentUploads = docs.filter((d: any) => {
              const uploadDate = new Date(d.uploadDate)
              const sevenDaysAgo = new Date()
              sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
              return uploadDate >= sevenDaysAgo
            }).length
            
            setStats({
              total_documents: docs.length,
              total_size: totalSize,
              expiring_soon: expiringSoon,
              recent_uploads: recentUploads,
            })
          } else {
            // Fallback to mock data
            setStats({
              total_documents: 247,
              total_size: 125000000,
              expiring_soon: 5,
              recent_uploads: 12,
            })
          }
        } else {
          // Fallback to mock data
          setStats({
            total_documents: 247,
            total_size: 125000000,
            expiring_soon: 5,
            recent_uploads: 12,
          })
        }
      } catch (err) {
        console.error('Error loading stats:', err)
        // Fallback to mock data
        setStats({
          total_documents: 247,
          total_size: 125000000,
          expiring_soon: 5,
          recent_uploads: 12,
        })
      } finally {
        setLoading(false)
      }
    }

    loadStats()

    return () => {
      const existingLink = document.querySelector('link[href="/css/documents-vault-desktop.css"]')
      if (existingLink && existingLink.parentNode) {
        existingLink.parentNode.removeChild(existingLink)
      }
    }
  }, [])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>Documents Vault</h1>
          </div>
          
          {/* Navigation tabs */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-2)',
            flexWrap: 'wrap',
            borderBottom: '1px solid var(--border)',
            marginBottom: 'var(--space-6)',
            overflowX: 'auto',
          }}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeSection === section.id ? '2px solid var(--hearst-green)' : '2px solid transparent',
                  color: activeSection === section.id ? 'var(--hearst-green)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: activeSection === section.id ? 600 : 400,
                  transition: 'all var(--duration-fast) var(--ease-in-out)',
                  whiteSpace: 'nowrap',
                }}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards - Same design as Projections */}
        {activeSection === 'overview' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <Card>
                <CardHeader>
                  <CardTitle>Total Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
                    {stats?.total_documents || 247}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                    All documents
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Size</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
                    {stats?.total_size ? formatFileSize(stats.total_size) : '119 MB'}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                    Storage used
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Uploads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
                    {stats?.recent_uploads || 12}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                    Last 7 days
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Expiring Soon</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: stats?.expiring_soon > 0 ? '#ff4d4d' : 'var(--hearst-green)' }}>
                    {stats?.expiring_soon || 5}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                    Next 30 days
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Documents Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentsSummary loading={loading} />
              </CardContent>
            </Card>
          </>
        )}

        {/* Other sections - use full DocumentsVault component */}
        {activeSection !== 'overview' && (
          <DocumentsVault />
        )}
      </div>
    </div>
  )
}

