'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { projectsAPI } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

interface Project {
  id: string
  name: string
  description?: string
  type: string
  repoType: string
  status: string
  createdAt: string
  updatedAt: string
  versions?: Array<{
    id: string
    version: string
    status: string
    createdAt: string
  }>
  jobs?: Array<{
    id: string
    type: string
    status: string
    createdAt: string
  }>
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await projectsAPI.getById(projectId)
        setProject(response.project || response)
      } catch (err) {
        console.error('Error loading project:', err)
        setError(err instanceof Error ? err.message : 'Failed to load project')
      } finally {
        setLoading(false)
      }
    }

    if (projectId) {
      loadProject()
    }
  }, [projectId])

  const getStatusColor = (status: string) => {
    const statusUpper = status.toUpperCase()
    if (statusUpper === 'ACTIVE') return '#a5ff9c'
    if (statusUpper === 'ARCHIVED') return '#888'
    return '#ffa500'
  }

  if (loading) {
    return (
      <div className="dashboard-view">
        <div className="dashboard-content">
          <div className="loading-state">
            <div className="spinner" style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(165, 255, 156, 0.2)',
              borderTopColor: '#a5ff9c',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}></div>
            <p style={{ color: 'var(--text-secondary)' }}>Loading project...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="dashboard-view">
        <div className="dashboard-content">
          <div className="error-state">
            <p>Error: {error || 'Project not found'}</p>
            <Button style={{ marginTop: 'var(--space-4)' }} onClick={() => router.push('/projects')}>
              Back to Projects
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <div>
              <Link href="/projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)', display: 'block' }}>
                ← Back to Projects
              </Link>
              <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
                {project.name}
              </h1>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <Button variant="outline">Edit</Button>
              <Button>New Job</Button>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
                    Description
                  </div>
                  <div style={{ color: 'var(--text-primary)' }}>
                    {project.description || 'No description'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
                    Type
                  </div>
                  <div style={{ color: 'var(--text-primary)' }}>
                    {project.type}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
                    Repository Type
                  </div>
                  <div style={{ color: 'var(--text-primary)' }}>
                    {project.repoType}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
                    Status
                  </div>
                  <div style={{ color: getStatusColor(project.status) }}>
                    {project.status}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
                    Created
                  </div>
                  <div style={{ color: 'var(--text-primary)' }}>
                    {formatDate(project.createdAt)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
                    Last Updated
                  </div>
                  <div style={{ color: 'var(--text-primary)' }}>
                    {formatDate(project.updatedAt)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                    Total Versions
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
                    {project.versions?.length || 0}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                    Total Jobs
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
                    {project.jobs?.length || 0}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Versions */}
        <Card style={{ marginBottom: 'var(--space-6)' }}>
          <CardHeader>
            <CardTitle>Versions</CardTitle>
          </CardHeader>
          <CardContent>
            {project.versions && project.versions.length > 0 ? (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Version</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.versions.map((version) => (
                      <tr key={version.id}>
                        <td>{version.version}</td>
                        <td>
                          <span style={{ color: version.status === 'stable' ? 'var(--hearst-green)' : 'var(--text-secondary)' }}>
                            {version.status}
                          </span>
                        </td>
                        <td>{formatDate(version.createdAt)}</td>
                        <td>
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: 'var(--space-4)' }}>
                No versions yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            {project.jobs && project.jobs.length > 0 ? (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.jobs.slice(0, 10).map((job) => (
                      <tr key={job.id}>
                        <td>{job.type}</td>
                        <td>
                          <span style={{ color: job.status === 'SUCCESS' ? 'var(--hearst-green)' : job.status === 'FAILED' ? '#ff4d4d' : 'var(--text-secondary)' }}>
                            {job.status}
                          </span>
                        </td>
                        <td>{formatDate(job.createdAt)}</td>
                        <td>
                          <Link href={`/jobs/${job.id}`}>
                            <Button variant="outline" size="sm">View</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: 'var(--space-4)' }}>
                No jobs yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

