'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CockpitEnergyCosts() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
            Energy & Costs
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
            Power consumption and profitability analysis
          </p>
        </div>
        <Button variant="outline">Override Values</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>Total kWh (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              0
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Energy cost: $0
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>
              Avg: $0 /kWh
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              $0
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              0 BTC mined
            </p>
            <p style={{ color: 'var(--hearst-green)', fontSize: 'var(--text-xs)' }}>
              +0% vs yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Net Margin (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              $0
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Mgmt fees: $0
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>
              Margin: 0%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Break-even BTC Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              $0
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Market: $0
            </p>
            <p style={{ color: 'var(--hearst-green)', fontSize: 'var(--text-xs)' }}>
              Safe Spread +0%
            </p>
          </CardContent>
        </Card>
      </div>

      <Card style={{ marginBottom: 'var(--space-6)' }}>
        <CardHeader>
          <CardTitle>Energy Cost by Hosting Provider</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Hosting Provider</th>
                  <th>Cost /24h</th>
                  <th>kWh Price</th>
                  <th>kWh Used</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: 'var(--space-8)' }}>
                    No energy data available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: 'var(--space-6)' }}>
        <CardHeader>
          <CardTitle>Electricity Invoices Calculations for Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <select
              style={{
                padding: 'var(--space-2) var(--space-4)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: 'var(--text-sm)',
              }}
            >
              <option>Select Month</option>
            </select>
            <Button>Calculate</Button>
            <Button variant="outline">Export CSV</Button>
            <Button variant="outline">Export PDF</Button>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Customer Name</th>
                  <th>Uptime (M-1)</th>
                  <th>BTC Mined (M-1)</th>
                  <th>Electricity Payment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: 'var(--space-8)' }}>
                    Select a month and click "Calculate" to generate electricity invoices.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-secondary)' }}>
            No risk factors identified at this time.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


