'use client'

import { useEffect, useState } from 'react'
import Dashboard from '@/components/Dashboard'
import { statsAPI } from '@/lib/api'

export default function Home() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await statsAPI.getStats()
        setData(response.stats)
        setError(null)
      } catch (err) {
        console.error('Error loading dashboard data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
    
    // Refresh every 30 seconds
    const interval = setInterval(() => {
      loadData()
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="dashboard-view">
        <div className="dashboard-content">
          <div className="loading-state" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            gap: 'var(--space-4)',
          }}>
            <div className="spinner" style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(165, 255, 156, 0.2)',
              borderTopColor: '#a5ff9c',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}></div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)' }}>Chargement des données...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-view">
        <div className="dashboard-content">
          <div className="error-state" style={{
            padding: 'var(--space-6)',
            textAlign: 'center',
            color: 'var(--text-error)',
          }}>
            <p>Erreur: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Dashboard Component avec graphiques BTC Mined */}
      <Dashboard data={data} />
    </div>
  )
}
