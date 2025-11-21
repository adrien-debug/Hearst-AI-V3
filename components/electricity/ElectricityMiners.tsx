'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ElectricityMiners() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Miner Power Consumption</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Miner ID</th>
                  <th>Model</th>
                  <th>Power (W)</th>
                  <th>Hashrate</th>
                  <th>Efficiency (J/TH)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MINER-001</td>
                  <td>Antminer S21</td>
                  <td>3550 W</td>
                  <td>98.5 TH/s</td>
                  <td>36.0 J/TH</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>ACTIVE</span></td>
                </tr>
                <tr>
                  <td>MINER-002</td>
                  <td>Antminer S21</td>
                  <td>3520 W</td>
                  <td>97.2 TH/s</td>
                  <td>36.2 J/TH</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>ACTIVE</span></td>
                </tr>
                <tr>
                  <td>MINER-003</td>
                  <td>Antminer S19 Pro</td>
                  <td>3250 W</td>
                  <td>110.0 TH/s</td>
                  <td>29.5 J/TH</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>ACTIVE</span></td>
                </tr>
                <tr>
                  <td>MINER-004</td>
                  <td>Antminer S19</td>
                  <td>3250 W</td>
                  <td>95.0 TH/s</td>
                  <td>34.2 J/TH</td>
                  <td><span style={{ color: '#FFA500' }}>DEGRADED</span></td>
                </tr>
                <tr>
                  <td>MINER-005</td>
                  <td>Antminer S19</td>
                  <td>0 W</td>
                  <td>0 TH/s</td>
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

