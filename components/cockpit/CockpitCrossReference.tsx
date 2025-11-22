'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CockpitCrossReference() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
            Data Cross-Reference
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
            Matrix view of clients, contracts, and hosting providers
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button variant="outline">Export CSV</Button>
          <Button variant="outline">Refresh Data</Button>
        </div>
      </div>

      <Card style={{ marginBottom: 'var(--space-6)' }}>
        <CardHeader>
          <CardTitle>Client × Hosting Provider Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ overflowX: 'auto' }}>
            <div className="table-container">
              <table className="table" style={{ minWidth: '800px' }}>
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Enegix</th>
                    <th>GoMining</th>
                    <th>Cryptominer</th>
                    <th>50blocks</th>
                    <th>Bitkern</th>
                    <th>Block Forge</th>
                    <th>Total Hashrate</th>
                    <th>Total Contracts</th>
                    <th>Total Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Royal Group MENA</strong></td>
                    <td>2.4 PH/s<br />$28,800/day</td>
                    <td>1.8 PH/s<br />$21,600/day</td>
                    <td>-</td>
                    <td>0.9 PH/s<br />$10,800/day</td>
                    <td>-</td>
                    <td>1.2 PH/s<br />$14,400/day</td>
                    <td><strong>6.3 PH/s</strong></td>
                    <td><strong>12</strong></td>
                    <td><strong>$75,600/day</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Jason Wilson Family</strong></td>
                    <td>1.5 PH/s<br />$18,000/day</td>
                    <td>-</td>
                    <td>0.8 PH/s<br />$9,600/day</td>
                    <td>-</td>
                    <td>0.6 PH/s<br />$7,200/day</td>
                    <td>-</td>
                    <td><strong>2.9 PH/s</strong></td>
                    <td><strong>8</strong></td>
                    <td><strong>$34,800/day</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Akt Account 1</strong></td>
                    <td>0.8 PH/s<br />$9,600/day</td>
                    <td>1.2 PH/s<br />$14,400/day</td>
                    <td>0.5 PH/s<br />$6,000/day</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td><strong>2.5 PH/s</strong></td>
                    <td><strong>6</strong></td>
                    <td><strong>$30,000/day</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Akt Account 2</strong></td>
                    <td>-</td>
                    <td>1.1 PH/s<br />$13,200/day</td>
                    <td>1.5 PH/s<br />$18,000/day</td>
                    <td>0.7 PH/s<br />$8,400/day</td>
                    <td>-</td>
                    <td>-</td>
                    <td><strong>3.3 PH/s</strong></td>
                    <td><strong>7</strong></td>
                    <td><strong>$39,600/day</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Dubai Investments</strong></td>
                    <td>0.9 PH/s<br />$10,800/day</td>
                    <td>-</td>
                    <td>-</td>
                    <td>1.7 PH/s<br />$20,400/day</td>
                    <td>1.1 PH/s<br />$13,200/day</td>
                    <td>0.1 PH/s<br />$1,200/day</td>
                    <td><strong>3.8 PH/s</strong></td>
                    <td><strong>9</strong></td>
                    <td><strong>$45,600/day</strong></td>
                  </tr>
                  <tr style={{ background: 'rgba(167, 251, 144, 0.05)', fontWeight: 700 }}>
                    <td><strong>TOTAL</strong></td>
                    <td><strong>5.2 PH/s</strong></td>
                    <td><strong>4.1 PH/s</strong></td>
                    <td><strong>2.8 PH/s</strong></td>
                    <td><strong>3.3 PH/s</strong></td>
                    <td><strong>1.7 PH/s</strong></td>
                    <td><strong>1.3 PH/s</strong></td>
                    <td><strong>18.4 PH/s</strong></td>
                    <td><strong>42</strong></td>
                    <td><strong>$225,600/day</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contract × Provider Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Contract ID</th>
                  <th>Client</th>
                  <th>Provider</th>
                  <th>Cryptocurrency</th>
                  <th>Hashrate</th>
                  <th>Machines</th>
                  <th>Start Date</th>
                  <th>Status</th>
                  <th>Daily Revenue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CTR-RG-001</td>
                  <td>Royal Group MENA</td>
                  <td>Enegix</td>
                  <td>Bitcoin</td>
                  <td>2.4 PH/s</td>
                  <td>200</td>
                  <td>2024-01-15</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>Active</span></td>
                  <td>$28,800</td>
                </tr>
                <tr>
                  <td>CTR-RG-002</td>
                  <td>Royal Group MENA</td>
                  <td>GoMining</td>
                  <td>Bitcoin</td>
                  <td>1.8 PH/s</td>
                  <td>150</td>
                  <td>2024-02-01</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>Active</span></td>
                  <td>$21,600</td>
                </tr>
                <tr>
                  <td>CTR-JW-001</td>
                  <td>Jason Wilson Family</td>
                  <td>Enegix</td>
                  <td>Bitcoin</td>
                  <td>1.5 PH/s</td>
                  <td>125</td>
                  <td>2024-01-20</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>Active</span></td>
                  <td>$18,000</td>
                </tr>
                <tr>
                  <td>CTR-AKT1-001</td>
                  <td>Akt Account 1</td>
                  <td>Enegix</td>
                  <td>Bitcoin</td>
                  <td>0.8 PH/s</td>
                  <td>67</td>
                  <td>2024-03-01</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>Active</span></td>
                  <td>$9,600</td>
                </tr>
                <tr>
                  <td>CTR-AKT1-002</td>
                  <td>Akt Account 1</td>
                  <td>GoMining</td>
                  <td>Bitcoin</td>
                  <td>1.2 PH/s</td>
                  <td>100</td>
                  <td>2024-03-10</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>Active</span></td>
                  <td>$14,400</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

