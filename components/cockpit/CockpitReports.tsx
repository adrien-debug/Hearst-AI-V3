'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CockpitReports() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>Reports</h2>
        <Button>Generate Report</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>Daily Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              Generate daily production and performance reports
            </p>
            <Button variant="outline" style={{ width: '100%' }}>Generate</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              Weekly summary and analytics
            </p>
            <Button variant="outline" style={{ width: '100%' }}>Generate</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              Comprehensive monthly analysis
            </p>
            <Button variant="outline" style={{ width: '100%' }}>Generate</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Type</th>
                  <th>Generated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No reports generated yet
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

