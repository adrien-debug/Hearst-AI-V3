'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { statsAPI } from '@/lib/api'

export default function ProjectsOverview() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await statsAPI.getStats()
        setStats(response.stats)
      } catch (err) {
        console.error('Error loading stats:', err)
        // Fallback to mock data
        setStats({
          total_projects: 12,
          total_versions: 45,
          total_jobs: 234,
          jobs_success_rate: 94.5,
        })
      }
    }
    loadStats()
  }, [])

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {stats?.total_projects || 12}
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Active projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Versions</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {stats?.total_versions || 45}
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              All versions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {stats?.total_jobs || 234}
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              All jobs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: stats?.jobs_success_rate >= 90 ? 'var(--hearst-green)' : stats?.jobs_success_rate >= 70 ? '#FFA500' : '#ff4d4d' }}>
              {stats?.jobs_success_rate ? `${stats.jobs_success_rate.toFixed(1)}%` : '94.5%'}
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Job success rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Projects Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Type</th>
                  <th>Versions</th>
                  <th>Jobs</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>HearstAI Dashboard</td>
                  <td>DASHBOARD</td>
                  <td>8</td>
                  <td>45</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>ACTIVE</span></td>
                  <td>2 days ago</td>
                </tr>
                <tr>
                  <td>Mining Analytics Platform</td>
                  <td>DASHBOARD</td>
                  <td>12</td>
                  <td>78</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>ACTIVE</span></td>
                  <td>1 day ago</td>
                </tr>
                <tr>
                  <td>Electricity Monitor</td>
                  <td>NODEJS_APP</td>
                  <td>6</td>
                  <td>34</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>ACTIVE</span></td>
                  <td>5 hours ago</td>
                </tr>
                <tr>
                  <td>Collateral Tracker</td>
                  <td>DASHBOARD</td>
                  <td>9</td>
                  <td>56</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>ACTIVE</span></td>
                  <td>3 days ago</td>
                </tr>
                <tr>
                  <td>Cockpit Management</td>
                  <td>DASHBOARD</td>
                  <td>15</td>
                  <td>21</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>ACTIVE</span></td>
                  <td>12 hours ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

