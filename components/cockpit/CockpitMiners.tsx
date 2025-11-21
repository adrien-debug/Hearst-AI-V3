'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CockpitMiners() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>Miners</h2>
        <Button>+ Add Miner</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>Total Miners</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              124
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Fleet size
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Online</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              118
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Currently mining
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Offline</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff4d4d' }}>
              2
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Miners List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Miner ID</th>
                  <th>Model</th>
                  <th>Hashrate</th>
                  <th>Power</th>
                  <th>Temperature</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MINER-001</td>
                  <td>Antminer S21</td>
                  <td>98.5 TH/s</td>
                  <td>3550 W</td>
                  <td>36°C</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>ONLINE</span></td>
                </tr>
                <tr>
                  <td>MINER-002</td>
                  <td>Antminer S21</td>
                  <td>97.2 TH/s</td>
                  <td>3520 W</td>
                  <td>35°C</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>ONLINE</span></td>
                </tr>
                <tr>
                  <td>MINER-003</td>
                  <td>Antminer S19 Pro</td>
                  <td>110.0 TH/s</td>
                  <td>3250 W</td>
                  <td>38°C</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>ONLINE</span></td>
                </tr>
                <tr>
                  <td>MINER-004</td>
                  <td>Antminer S19</td>
                  <td>95.0 TH/s</td>
                  <td>3250 W</td>
                  <td>42°C</td>
                  <td><span style={{ color: '#FFA500' }}>DEGRADED</span></td>
                </tr>
                <tr>
                  <td>MINER-005</td>
                  <td>Antminer S19</td>
                  <td>0 TH/s</td>
                  <td>0 W</td>
                  <td>-</td>
                  <td><span style={{ color: '#ff4d4d' }}>OFFLINE</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

