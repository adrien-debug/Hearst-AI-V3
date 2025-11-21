'use client'

import { useEffect, useState } from 'react'
import { projectsAPI } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import ProjectsOverview from '@/components/projects/ProjectsOverview'
import ProjectsCalculator from '@/components/projects/ProjectsCalculator'
import ProjectsResults from '@/components/projects/ProjectsResults'
import ProjectsCharts from '@/components/projects/ProjectsCharts'
import ProjectsMonteCarlo from '@/components/projects/ProjectsMonteCarlo'
import ProjectsHardware from '@/components/projects/ProjectsHardware'
import ProjectsEnergy from '@/components/projects/ProjectsEnergy'
import ProjectsInfrastructure from '@/components/projects/ProjectsInfrastructure'

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('list')

  const sections = [
    { id: 'list', label: 'Projects List' },
    { id: 'overview', label: 'Overview' },
    { id: 'calculator', label: 'Calculator' },
    { id: 'results', label: 'Results' },
    { id: 'charts', label: 'Charts' },
    { id: 'monte-carlo', label: 'Monte Carlo' },
    { id: 'hardware', label: 'Hardware' },
    { id: 'energy', label: 'Energy' },
    { id: 'infrastructure', label: 'Infrastructure' },
  ]

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await projectsAPI.getAll()
        setProjects(response.projects || [])
        setError(null)
      } catch (err) {
        console.error('Error loading projects:', err)
        setError(err instanceof Error ? err.message : 'Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const getStatusColor = (status: string) => {
    const statusUpper = status.toUpperCase()
    if (statusUpper === 'ACTIVE') return '#a5ff9c'
    if (statusUpper === 'ARCHIVED') return '#888'
    return '#ffa500'
  }

  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>Projects</h1>
          </div>
          
          {/* Navigation tabs */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-2)',
            flexWrap: 'wrap',
            borderBottom: '1px solid var(--border)',
            marginBottom: 'var(--space-6)',
            overflowX: 'auto',
          }}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeSection === section.id ? '2px solid var(--hearst-green)' : '2px solid transparent',
                  color: activeSection === section.id ? 'var(--hearst-green)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: activeSection === section.id ? 600 : 400,
                  transition: 'all var(--duration-fast) var(--ease-in-out)',
                  whiteSpace: 'nowrap',
                }}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div style={{ color: '#ff4d4d', marginBottom: 'var(--space-4)' }}>
            Error: {error}
          </div>
        )}

        {/* Projects List Section */}
        {activeSection === 'list' && (
          <>
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
              <Card>
                <CardContent style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                  <p>No projects yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <CardTitle>{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                        {project.description || 'No description'}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                        <div>
                          <strong>Type:</strong> {project.type}
                        </div>
                        <div>
                          <strong>Repository:</strong> {project.repoType}
                        </div>
                        <div>
                          <strong>Status:</strong>{' '}
                          <span style={{ color: getStatusColor(project.status) }}>
                            {project.status}
                          </span>
                        </div>
                        {project._count && (
                          <>
                            <div>
                              <strong>Versions:</strong> {project._count.versions}
                            </div>
                            <div>
                              <strong>Jobs:</strong> {project._count.jobs}
                            </div>
                          </>
                        )}
                        <div style={{ marginTop: 'var(--space-4)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          Updated: {formatDate(project.updatedAt)}
                        </div>
                      </div>
                      <div style={{ marginTop: 'var(--space-4)' }}>
                        <Link href={`/projects/${project.id}`}>
                          <Button variant="outline" style={{ width: '100%' }}>
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* Other Sections */}
        {activeSection === 'overview' && <ProjectsOverview />}
        {activeSection === 'calculator' && <ProjectsCalculator />}
        {activeSection === 'results' && <ProjectsResults />}
        {activeSection === 'charts' && <ProjectsCharts />}
        {activeSection === 'monte-carlo' && <ProjectsMonteCarlo />}
        {activeSection === 'hardware' && <ProjectsHardware />}
        {activeSection === 'energy' && <ProjectsEnergy />}
        {activeSection === 'infrastructure' && <ProjectsInfrastructure />}
      </div>
    </div>
  )
}



