'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import BatchesSummary from '@/components/profitability/BatchesSummary'

// Import dynamique pour éviter les erreurs SSR
const ProfitabilityIndex = dynamic(() => import('@/components/ProfitabilityIndex'), { ssr: false })

export default function ProfitabilityIndexPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'calculator', label: 'Calculator' },
    { id: 'results', label: 'Results' },
    { id: 'charts', label: 'Charts' },
    { id: 'monte-carlo', label: 'Monte Carlo' },
    { id: 'hardware', label: 'Hardware' },
    { id: 'energy', label: 'Energy' },
    { id: 'infrastructure', label: 'Infrastructure' },
  ]

  useEffect(() => {
    // Charger le CSS du profitability index
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/css/profitability-desktop.css'
    document.head.appendChild(link)

    // Load stats
    const loadStats = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/profitability/summary')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        } else {
          // Fallback to mock data
          setStats({
            total_batches: 8,
            total_hashrate: 45.2,
            total_profitability: 94.5,
            avg_roi_days: 234,
          })
        }
      } catch (err) {
        console.error('Error loading stats:', err)
        // Fallback to mock data
        setStats({
          total_batches: 8,
          total_hashrate: 45.2,
          total_profitability: 94.5,
          avg_roi_days: 234,
        })
      } finally {
        setLoading(false)
      }
    }

    loadStats()

    return () => {
      const existingLink = document.querySelector('link[href="/css/profitability-desktop.css"]')
      if (existingLink && existingLink.parentNode) {
        existingLink.parentNode.removeChild(existingLink)
      }
    }
  }, [])

  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>Profitability Index</h1>
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
                  <CardTitle>Total Batches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
                    {stats?.total_batches || 8}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                    Active batches
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Hashrate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
                    {stats?.total_hashrate ? `${stats.total_hashrate.toFixed(1)}` : '45.2'} PH/s
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                    All batches
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Avg ROI Days</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
                    {stats?.avg_roi_days || 234}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                    Average ROI
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Profitability Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: stats?.total_profitability >= 90 ? 'var(--hearst-green)' : stats?.total_profitability >= 70 ? '#FFA500' : '#ff4d4d' }}>
                    {stats?.total_profitability ? `${stats.total_profitability.toFixed(1)}%` : '94.5%'}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                    Overall profitability
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Batches Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <BatchesSummary loading={loading} />
              </CardContent>
            </Card>
          </>
        )}

        {/* Other sections - placeholder for now */}
        {activeSection !== 'overview' && (
          <Card>
            <CardContent style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)' }}>
                {sections.find(s => s.id === activeSection)?.label} section coming soon...
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

