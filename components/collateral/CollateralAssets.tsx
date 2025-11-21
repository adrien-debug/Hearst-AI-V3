'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CollateralAssets() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>Collateral Assets</h2>
        <Button>+ Add Asset</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assets List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Asset Type</th>
                  <th>Amount</th>
                  <th>Value (USD)</th>
                  <th>Locked</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ETH</td>
                  <td>500.00</td>
                  <td>$1,250,000</td>
                  <td>Yes</td>
                  <td>
                    <Button variant="outline" style={{ padding: 'var(--space-1) var(--space-2)', fontSize: 'var(--text-xs)' }}>View</Button>
                  </td>
                </tr>
                <tr>
                  <td>BTC</td>
                  <td>300.00</td>
                  <td>$850,000</td>
                  <td>Yes</td>
                  <td>
                    <Button variant="outline" style={{ padding: 'var(--space-1) var(--space-2)', fontSize: 'var(--text-xs)' }}>View</Button>
                  </td>
                </tr>
                <tr>
                  <td>USDC</td>
                  <td>400,000.00</td>
                  <td>$400,000</td>
                  <td>Yes</td>
                  <td>
                    <Button variant="outline" style={{ padding: 'var(--space-1) var(--space-2)', fontSize: 'var(--text-xs)' }}>View</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

