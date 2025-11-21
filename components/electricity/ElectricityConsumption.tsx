'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getElectricity } from '@/lib/api'

export default function ElectricityConsumption() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getElectricity()
        setData(response.data || response)
      } catch (err) {
        console.error('Error loading electricity data:', err)
        // Fallback to mock data
        setData({
          current_power: 1250.5,
          daily_consumption: 30012.0,
          monthly_consumption: 900360.0,
        })
      }
    }
    loadData()
    const interval = setInterval(loadData, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>Current Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {data?.current_power ? data.current_power.toFixed(1) : '1250.5'} kW
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Real-time power
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Daily Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {data?.daily_consumption ? data.daily_consumption.toFixed(0) : '30012'} kWh
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Last 24 hours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {data?.monthly_consumption ? (data.monthly_consumption / 1000).toFixed(0) : '900'} MWh
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Current month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Daily Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              ${data?.daily_cost ? data.daily_cost.toFixed(2) : '2400.96'}
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Cost per day
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Consumption by Farm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Farm</th>
                  <th>Current Power</th>
                  <th>Daily Consumption</th>
                  <th>Daily Cost</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.miners && data.miners.length > 0 ? (
                  data.miners.map((miner: any) => (
                    <tr key={miner.id}>
                      <td><strong>{miner.name}</strong></td>
                      <td>{miner.power.toFixed(1)} kW</td>
                      <td>{miner.consumption.toFixed(1)} kWh</td>
                      <td>${miner.cost.toFixed(2)}</td>
                      <td><span style={{ color: miner.status === 'active' ? 'var(--hearst-green)' : '#ff4d4d' }}>{miner.status.toUpperCase()}</span></td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr>
                      <td><strong>Farm A</strong></td>
                      <td>450.2 kW</td>
                      <td>10804.8 kWh</td>
                      <td>$864.38</td>
                      <td><span style={{ color: 'var(--hearst-green)' }}>ACTIVE</span></td>
                    </tr>
                    <tr>
                      <td><strong>Farm B</strong></td>
                      <td>380.5 kW</td>
                      <td>9132.0 kWh</td>
                      <td>$730.56</td>
                      <td><span style={{ color: 'var(--hearst-green)' }}>ACTIVE</span></td>
                    </tr>
                    <tr>
                      <td><strong>Farm C</strong></td>
                      <td>419.8 kW</td>
                      <td>10075.2 kWh</td>
                      <td>$806.02</td>
                      <td><span style={{ color: 'var(--hearst-green)' }}>ACTIVE</span></td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

