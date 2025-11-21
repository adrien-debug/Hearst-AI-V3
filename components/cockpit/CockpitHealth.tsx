'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CockpitHealth() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              Healthy
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              All systems operational
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              99.9%
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              0
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              No critical issues
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Health Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Status</th>
                  <th>Last Check</th>
                  <th>Response Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>API Server</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>Online</span></td>
                  <td>Just now</td>
                  <td>12ms</td>
                </tr>
                <tr>
                  <td>Database</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>Connected</span></td>
                  <td>Just now</td>
                  <td>5ms</td>
                </tr>
                <tr>
                  <td>Cache</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>Active</span></td>
                  <td>Just now</td>
                  <td>2ms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

