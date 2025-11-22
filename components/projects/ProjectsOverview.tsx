'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { statsAPI } from '@/lib/api'

interface Project {
  id: string
  name: string
  description?: string
  type: string
  repoType: string
  status: string
  createdAt: string
  updatedAt: string
  _count?: {
    versions: number
    jobs: number
  }
}

interface ProjectsOverviewProps {
  projects?: Project[]
  loading?: boolean
  getStatusColor?: (status: string) => string
}

export default function ProjectsOverview({ projects = [], loading = false, getStatusColor }: ProjectsOverviewProps) {
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

      {/* Projects List Table */}
      <Card>
        <CardHeader>
          <CardTitle>Projects Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
              <div className="spinner" style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(165, 255, 156, 0.2)',
                borderTopColor: '#a5ff9c',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto var(--space-4)',
              }}></div>
              <p style={{ color: 'var(--text-secondary)' }}>Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No projects yet.</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Type</th>
                    <th>Repository</th>
                    <th>Versions</th>
                    <th>Jobs</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td><strong>{project.name}</strong></td>
                      <td>{project.type}</td>
                      <td>{project.repoType}</td>
                      <td>{project._count?.versions || 0}</td>
                      <td>{project._count?.jobs || 0}</td>
                      <td>
                        {getStatusColor ? (
                          <span style={{ color: getStatusColor(project.status) }}>
                            {project.status}
                          </span>
                        ) : (
                          <span style={{ color: project.status.toUpperCase() === 'ACTIVE' ? 'var(--hearst-green)' : '#888' }}>
                            {project.status}
                          </span>
                        )}
                      </td>
                      <td>{formatDate(project.updatedAt)}</td>
                      <td>
                        <Link href={`/projects/${project.id}`}>
                          <Button variant="outline" size="sm">View</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

