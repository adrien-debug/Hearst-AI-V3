'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SetupSummary from '@/components/setup/SetupSummary'

// Import dynamique pour éviter les erreurs SSR
const SetupManager = dynamic(() => import('@/components/SetupManager'), { ssr: false })

export default function SetupPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'miners', label: 'Miners Configuration' },
    { id: 'prices', label: 'Price List' },
    { id: 'hosters', label: 'Hosters' },
  ]

  useEffect(() => {
    // Charger le CSS du setup
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/css/setup-desktop.css'
    document.head.appendChild(link)

    // Load stats
    const loadStats = async () => {
      try {
        setLoading(true)
        // Simuler un appel API pour les stats
        // Fallback to mock data
        setStats({
          total_miners: 5,
          active_miners: 4,
          total_hashrate: 1.65,
          total_power: 16.3,
          total_hosters: 3,
          configured_prices: 2,
        })
      } catch (err) {
        console.error('Error loading stats:', err)
        // Fallback to mock data
        setStats({
          total_miners: 5,
          active_miners: 4,
          total_hashrate: 1.65,
          total_power: 16.3,
          total_hosters: 3,
          configured_prices: 2,
        })
      } finally {
        setLoading(false)
      }
    }

    loadStats()

    return () => {
      const existingLink = document.querySelector('link[href="/css/setup-desktop.css"]')
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
            <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>Setup Manager</h1>
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
                  <CardTitle>Total Miners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
                    {stats?.total_miners || 5}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                    Configured miners
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Active Miners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
                    {stats?.active_miners || 4}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                    Currently active
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Hashrate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
                    {stats?.total_hashrate ? `${stats.total_hashrate.toFixed(2)}` : '1.65'} PH/s
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                    Network hashrate
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Power</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
                    {stats?.total_power ? `${stats.total_power.toFixed(1)}` : '16.3'} kW
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                    Power consumption
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Configuration Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <SetupSummary loading={loading} />
              </CardContent>
            </Card>
          </>
        )}

        {/* Other sections - use full SetupManager component */}
        {activeSection !== 'overview' && (
          <SetupManager activeTab={activeSection as any} hideHeader={true} />
        )}
      </div>
    </div>
  )
}

