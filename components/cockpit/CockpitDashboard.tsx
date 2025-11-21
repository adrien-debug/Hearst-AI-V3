'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cockpitAPI } from '@/lib/api'

export default function CockpitDashboard() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await cockpitAPI.getData()
        setData(response.data)
      } catch (err) {
        console.error('Error loading cockpit data:', err)
        // Fallback to mock data
        setData({
          globalHashrate: 245.8,
          theoreticalHashrate: 250.0,
          btcProduction24h: 0.084521,
          totalMiners: 124,
          onlineMiners: 118,
          miningAccounts: [
            { id: '1', name: 'AKT04', hashrate: 2041.42, btc24h: 0.084521, status: 'active' },
            { id: '2', name: 'AKT05', hashrate: 1987.23, btc24h: 0.082156, status: 'active' },
            { id: '3', name: 'AKT06', hashrate: 2156.78, btc24h: 0.089234, status: 'active' },
          ],
        })
      }
    }
    loadData()
    const interval = setInterval(loadData, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  const onlinePercentage = data ? Math.round((data.onlineMiners / data.totalMiners) * 100) : 95

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>Global Hashrate</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {data?.globalHashrate || 245.8} PH/s
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Theoretical: {data?.theoreticalHashrate || 250.0} PH/s
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>BTC Production (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {data?.btcProduction24h ? data.btcProduction24h.toFixed(6) : '0.084521'} BTC
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              ≈ ${data?.btcProduction24h ? (data.btcProduction24h * 114000).toFixed(2) : '9635.39'} USD
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Miners</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {data?.totalMiners || 124}
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Fleet capacity
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Online Miners</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {data?.onlineMiners || 118}
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              {onlinePercentage}% of fleet
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mining Accounts Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Hashrate</th>
                  <th>BTC (24h)</th>
                  <th>USD (24h)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.miningAccounts && data.miningAccounts.length > 0 ? (
                  data.miningAccounts.map((account: any) => (
                    <tr key={account.id}>
                      <td><strong>{account.name}</strong></td>
                      <td>{account.hashrate.toFixed(2)} TH/s</td>
                      <td>{account.btc24h.toFixed(6)} BTC</td>
                      <td>${(account.btc24h * 114000).toFixed(2)}</td>
                      <td><span style={{ color: account.status === 'active' ? 'var(--hearst-green)' : '#ff4d4d' }}>{account.status.toUpperCase()}</span></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                      No mining accounts yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

