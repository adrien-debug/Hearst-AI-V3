'use client'

import { useState, useEffect } from 'react'

interface SetupSummaryProps {
  loading?: boolean
}

export default function SetupSummary({ loading = false }: SetupSummaryProps) {
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    const loadConfig = async () => {
      try {
        // Simuler un appel API
        // Fallback to mock data
        setConfig({
          miners: {
            total: 5,
            active: 4,
            offline: 1,
            configured: true,
            lastUpdated: 'Just now',
          },
          prices: {
            count: 2,
            active: true,
            lastUpdated: '2h ago',
          },
          hosters: {
            total: 3,
            configured: 3,
            allValid: true,
            lastUpdated: 'Just now',
          },
          electricity: {
            active: true,
            allSet: true,
            lastUpdated: 'Just now',
          },
          monitoring: {
            online: 4,
            total: 5,
            status: 'operational',
            lastUpdated: 'Live',
          },
        })
      } catch (err) {
        console.error('Error loading config:', err)
        // Keep mock data
        setConfig({
          miners: {
            total: 5,
            active: 4,
            offline: 1,
            configured: true,
            lastUpdated: 'Just now',
          },
          prices: {
            count: 2,
            active: true,
            lastUpdated: '2h ago',
          },
          hosters: {
            total: 3,
            configured: 3,
            allValid: true,
            lastUpdated: 'Just now',
          },
          electricity: {
            active: true,
            allSet: true,
            lastUpdated: 'Just now',
          },
          monitoring: {
            online: 4,
            total: 5,
            status: 'operational',
            lastUpdated: 'Live',
          },
        })
      }
    }

    loadConfig()
  }, [])

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
          <p style={{ color: 'var(--text-secondary)' }}>Loading configuration...</p>
        </div>
      ) : !config ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No configuration yet.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Status</th>
                <th>Details</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Miners</strong></td>
                <td>
                  <span style={{ color: 'var(--hearst-green)', fontWeight: 700 }}>
                    {config.miners.total}/{config.miners.total} configured
                  </span>
                </td>
                <td>{config.miners.active} active, {config.miners.offline} offline</td>
                <td>{config.miners.lastUpdated}</td>
              </tr>
              <tr>
                <td><strong>Prices</strong></td>
                <td>
                  <span style={{ color: 'var(--hearst-green)', fontWeight: 700 }}>
                    ACTIVE
                  </span>
                </td>
                <td>{config.prices.count} cryptocurrencies tracked</td>
                <td>{config.prices.lastUpdated}</td>
              </tr>
              <tr>
                <td><strong>Hosters</strong></td>
                <td>
                  <span style={{ color: 'var(--hearst-green)', fontWeight: 700 }}>
                    {config.hosters.configured}/{config.hosters.total} configured
                  </span>
                </td>
                <td>All contracts valid</td>
                <td>{config.hosters.lastUpdated}</td>
              </tr>
              <tr>
                <td><strong>Electricity Rates</strong></td>
                <td>
                  <span style={{ color: 'var(--hearst-green)', fontWeight: 700 }}>
                    ACTIVE
                  </span>
                </td>
                <td>All rates set</td>
                <td>{config.electricity.lastUpdated}</td>
              </tr>
              <tr>
                <td><strong>Monitoring</strong></td>
                <td>
                  <span style={{ 
                    color: config.monitoring.online === config.monitoring.total ? 'var(--hearst-green)' : '#FFA500', 
                    fontWeight: 700 
                  }}>
                    {config.monitoring.online}/{config.monitoring.total} online
                  </span>
                </td>
                <td>
                  {config.monitoring.total - config.monitoring.online > 0 
                    ? `${config.monitoring.total - config.monitoring.online} miners offline` 
                    : 'All systems operational'}
                </td>
                <td>{config.monitoring.lastUpdated}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

