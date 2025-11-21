'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

// Dynamically import Chart.js components to avoid SSR issues
const LineChart = dynamic(
  () => import('react-chartjs-2').then((mod) => ({ default: mod.Line })),
  { 
    ssr: false,
    loading: () => <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Loading chart...</div>
  }
)

const BarChart = dynamic(
  () => import('react-chartjs-2').then((mod) => ({ default: mod.Bar })),
  { 
    ssr: false,
    loading: () => <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Loading chart...</div>
  }
)

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface DashboardProps {
  data?: {
    total_projects?: number
    total_versions?: number
    total_jobs?: number
    jobs_running?: number
    jobs_success_rate?: number
    last_7_days_jobs?: number
    total_storage_mb?: number
  }
}

export default function Dashboard({ data }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [lastSearchQuery, setLastSearchQuery] = useState<string>('')
  const [lastSearchResults, setLastSearchResults] = useState<any[]>([
    {
      type: 'project',
      title: 'Project Alpha',
      description: 'Projet de mining principal avec configuration optimisée',
      url: '/projects/alpha',
    },
    {
      type: 'job',
      title: 'Job #1234',
      description: 'Job de mining en cours avec hash rate élevé',
      url: '/jobs/1234',
    },
    {
      type: 'customer',
      title: 'Customer Beta',
      description: 'Customer avec portefeuille actif sur plusieurs chaînes',
      url: '/collateral',
    },
  ])

  useEffect(() => {
    // Load icons
    const loadIcons = () => {
    if (typeof window !== 'undefined' && (window as any).Icons) {
      document.querySelectorAll('[data-icon]').forEach(el => {
        const iconName = el.getAttribute('data-icon')
        if (iconName) {
          const iconSvg = (window as any).Icons[iconName]
          if (iconSvg) {
            el.innerHTML = iconSvg
          }
        }
      })
    }
    }
    
    loadIcons()
    // Retry after a short delay in case icons aren't loaded yet
    const timeout = setTimeout(loadIcons, 500)
    return () => clearTimeout(timeout)
  }, [])

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      // Simuler une recherche dans les données de la plateforme
      // Dans un vrai cas, vous feriez un appel API ici
      const results = await performAISearch(query)
      setSearchResults(results)
      
      // Sauvegarder la dernière recherche si elle a des résultats
      if (results.length > 0) {
        setLastSearchQuery(query)
        setLastSearchResults(results)
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const performAISearch = async (query: string): Promise<any[]> => {
    // Simulation d'une recherche AI
    // Dans un vrai cas, cela appellerait une API AI
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResults = [
          {
            type: 'project',
            title: 'Project Alpha',
            description: `Found project matching "${query}"`,
            url: '/projects/alpha',
          },
          {
            type: 'job',
            title: 'Job #1234',
            description: `Found job matching "${query}"`,
            url: '/jobs/1234',
          },
          {
            type: 'customer',
            title: 'Customer Beta',
            description: `Found customer matching "${query}"`,
            url: '/collateral',
          },
        ].filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
        )
        resolve(mockResults)
      }, 300)
    })
  }

  const chartData1 = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Projects',
        data: [2, 4, 6, 8, 9, 10, 11, 11, 12, 12, 12, data?.total_projects || 12],
        borderColor: '#a5ff9c',
        backgroundColor: 'rgba(165, 255, 156, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Jobs',
        data: [15, 32, 48, 67, 89, 112, 145, 178, 201, 215, 228, data?.total_jobs || 234],
        borderColor: 'rgba(255, 255, 255, 0.4)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const chartData2 = {
    labels: ['Projects', 'Versions', 'Jobs', 'Running'],
    datasets: [
      {
        label: 'Statistics',
        data: [
          data?.total_projects || 12,
          data?.total_versions || 45,
          data?.total_jobs || 234,
          data?.jobs_running || 8,
        ],
        backgroundColor: [
          'rgba(165, 255, 156, 0.8)',
          'rgba(138, 253, 129, 0.8)',
          'rgba(165, 255, 156, 0.8)',
          'rgba(138, 253, 129, 0.8)',
        ],
        borderColor: [
          '#a5ff9c',
          '#8afd81',
          '#a5ff9c',
          '#8afd81',
        ],
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(26, 26, 26, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#a5ff9c',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
    },
  }

  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        {/* AI Search Bar Section */}
        <div className="ai-search-section">
          <div className="ai-search-container">
            <div className="ai-search-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, rgba(165, 255, 156, 0.2) 0%, rgba(138, 253, 129, 0.2) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(165, 255, 156, 0.3)',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#a5ff9c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h2 style={{ 
                    fontSize: 'var(--text-xl)', 
                    fontWeight: 600, 
                    color: 'var(--text-primary)',
                    margin: 0,
                    marginBottom: '4px',
                  }}>
                    My Hearst AI
                  </h2>
                  <p style={{ 
                    fontSize: 'var(--text-sm)', 
                    color: 'var(--text-secondary)',
                    margin: 0,
                  }}>
                    Recherchez dans toutes les données de la plateforme
                  </p>
                </div>
              </div>
            </div>
            <div className="ai-search-input-wrapper" style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Rechercher des projets, jobs, customers, transactions..."
                className="ai-search-input"
                style={{
                  width: '100%',
                  padding: 'var(--space-4) var(--space-5)',
                  paddingLeft: '48px',
                  fontSize: 'var(--text-base)',
                  backgroundColor: 'rgba(14, 14, 14, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--hearst-green)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(165, 255, 156, 0.1)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
              <div style={{
                position: 'absolute',
                left: 'var(--space-4)',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}>
                {isSearching ? (
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(165, 255, 156, 0.3)',
                    borderTopColor: '#a5ff9c',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }}></div>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            {searchResults.length > 0 && (
              <div className="ai-search-results" style={{
                marginTop: 'var(--space-4)',
                padding: 'var(--space-3)',
                backgroundColor: 'rgba(14, 14, 14, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-lg)',
                maxHeight: '400px',
                overflowY: 'auto',
              }}>
                {searchResults.map((result, index) => (
                  <a
                    key={index}
                    href={result.url}
                    style={{
                      display: 'block',
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      textDecoration: 'none',
                      color: 'var(--text-primary)',
                      transition: 'background-color 0.2s',
                      marginBottom: index < searchResults.length - 1 ? 'var(--space-2)' : 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(165, 255, 156, 0.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: result.type === 'project' ? 'rgba(165, 255, 156, 0.2)' :
                                        result.type === 'job' ? 'rgba(255, 165, 0, 0.2)' :
                                        'rgba(138, 253, 129, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        color: result.type === 'project' ? '#a5ff9c' :
                               result.type === 'job' ? '#FFA500' :
                               '#8afd81',
                      }}>
                        {result.type === 'project' ? 'P' : result.type === 'job' ? 'J' : 'C'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontSize: 'var(--text-base)', 
                          fontWeight: 600,
                          marginBottom: '4px',
                        }}>
                          {result.title}
                        </div>
                        <div style={{ 
                          fontSize: 'var(--text-sm)', 
                          color: 'var(--text-secondary)',
                        }}>
                          {result.description}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
            
            {/* Last Search Results Boxes - Inside the same container */}
            {lastSearchResults.length > 0 && (
              <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-6)', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{
                  marginBottom: 'var(--space-4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                }}>
                  <h3 style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    margin: 0,
                  }}>
                    {lastSearchQuery ? `Résultats de la recherche: "${lastSearchQuery}"` : 'Résultats récents'}
                  </h3>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 'var(--space-4)',
                }}>
                  {lastSearchResults.map((result, index) => (
                    <a
                      key={index}
                      href={result.url}
                      style={{
                        display: 'block',
                        padding: 'var(--space-5)',
                        backgroundColor: 'rgba(14, 14, 14, 0.75)',
                        border: '0.5px solid rgba(255, 255, 255, 0.04)',
                        borderLeft: '3px solid var(--hearst-green)',
                        borderRadius: 'var(--radius-lg)',
                        textDecoration: 'none',
                        color: 'var(--text-primary)',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.2)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)'
                        e.currentTarget.style.borderColor = 'rgba(165, 255, 156, 0.3)'
                        e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)'
                        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: result.type === 'project' ? 'rgba(165, 255, 156, 0.2)' :
                                          result.type === 'job' ? 'rgba(255, 165, 0, 0.2)' :
                                          'rgba(138, 253, 129, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 'var(--text-lg)',
                          fontWeight: 700,
                          color: result.type === 'project' ? '#a5ff9c' :
                                 result.type === 'job' ? '#FFA500' :
                                 '#8afd81',
                          flexShrink: 0,
                          border: `1px solid ${result.type === 'project' ? 'rgba(165, 255, 156, 0.3)' :
                                                 result.type === 'job' ? 'rgba(255, 165, 0, 0.3)' :
                                                 'rgba(138, 253, 129, 0.3)'}`,
                        }}>
                          {result.type === 'project' ? 'P' : result.type === 'job' ? 'J' : 'C'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: 'var(--text-base)',
                            fontWeight: 600,
                            marginBottom: 'var(--space-1)',
                            color: 'var(--text-primary)',
                          }}>
                            {result.title}
                          </div>
                          <div style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.5,
                          }}>
                            {result.description}
                          </div>
                          <div style={{
                            marginTop: 'var(--space-2)',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--hearst-green)',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                          }}>
                            {result.type === 'project' ? 'Projet' : result.type === 'job' ? 'Job' : 'Customer'}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BTC Mined Section */}
        <div className="premium-wallet-section">
          <div className="premium-wallet-box" style={{ width: '100%' }}>
            <div className="premium-wallet-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(165, 255, 156, 0.1)',
                  border: '1px solid rgba(165, 255, 156, 0.2)',
                }}>
                  <svg className="icon" width="40" height="40" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M43 0C19.254 0 0 19.254 0 43C0 66.746 19.254 86 43 86C66.746 86 86 66.746 86 43C86 19.254 66.746 0 43 0Z" fill="#a5ff9c"/>
                    <path d="M57.2 28.6L52.9 26.5L51.3 32.3L46.5 30.1V23.4L43 21.5L39.5 23.4V30.1L34.7 32.3L33.1 26.5L28.8 28.6L30.4 34.4L26.1 36.5L27.7 42.3L23.4 44.4L25 50.2L29.3 48.1L30.9 53.9L35.7 56.1V62.8L39.2 64.7L42.7 62.8V56.1L47.5 53.9L49.1 48.1L53.4 50.2L51.8 44.4L56.1 42.3L54.5 36.5L58.8 34.4L57.2 28.6ZM43 50.2C38.03 50.2 34 46.17 34 41.2C34 36.23 38.03 32.2 43 32.2C47.97 32.2 52 36.23 52 41.2C52 46.17 47.97 50.2 43 50.2Z" fill="#0a0a0a"/>
                  </svg>
                </div>
                <h3 className="premium-wallet-title">BTC Mined</h3>
              </div>
            </div>
            
            {/* BTC Mined Values - All Periods Side by Side */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-6)',
            }}>
              {/* Daily */}
              <div style={{
                padding: 'var(--space-4)',
                backgroundColor: 'rgba(165, 255, 156, 0.05)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(165, 255, 156, 0.1)',
              }}>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 500,
                }}>
                  Daily
                </div>
                <div style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--hearst-green)',
                  marginBottom: 'var(--space-1)',
                }}>
                  0.084521 BTC
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                }}>
                  $9,642.89 USD
                </div>
              </div>

              {/* Weekly */}
              <div style={{
                padding: 'var(--space-4)',
                backgroundColor: 'rgba(165, 255, 156, 0.05)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(165, 255, 156, 0.1)',
              }}>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 500,
                }}>
                  Weekly
                </div>
                <div style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--hearst-green)',
                  marginBottom: 'var(--space-1)',
                }}>
                  0.591647 BTC
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                }}>
                  $67,500.23 USD
                </div>
              </div>

              {/* Monthly */}
              <div style={{
                padding: 'var(--space-4)',
                backgroundColor: 'rgba(165, 255, 156, 0.05)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(165, 255, 156, 0.1)',
              }}>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 500,
                }}>
                  Monthly
                </div>
                <div style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--hearst-green)',
                  marginBottom: 'var(--space-1)',
                }}>
                  2.536588 BTC
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                }}>
                  $289,286.25 USD
                </div>
              </div>

              {/* Yearly */}
              <div style={{
                padding: 'var(--space-4)',
                backgroundColor: 'rgba(165, 255, 156, 0.05)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(165, 255, 156, 0.1)',
              }}>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 500,
                }}>
                  Yearly
                </div>
                <div style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--hearst-green)',
                  marginBottom: 'var(--space-1)',
                }}>
                  30.439056 BTC
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                }}>
                  $3,471,435.00 USD
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="premium-transaction-section">
          <div className="premium-section-header">
            <h3 className="premium-section-title">Transaction history</h3>
          </div>
          <div className="premium-transaction-placeholder" style={{ padding: 0, textAlign: 'left' }}>
            <div className="table-container" style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
              <table className="table" style={{ background: 'transparent' }}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Account</th>
                    <th>Total Reward</th>
                    <th>Hashrate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2025-01-18</td>
                    <td>AKT04</td>
                    <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>0.084521 BTC</td>
                    <td>2041.42 TH/s</td>
                  </tr>
                  <tr>
                    <td>2025-01-17</td>
                    <td>AKT04</td>
                    <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>0.083247 BTC</td>
                    <td>2041.42 TH/s</td>
                  </tr>
                  <tr>
                    <td>2025-01-16</td>
                    <td>AKT05</td>
                    <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>0.082156 BTC</td>
                    <td>1987.23 TH/s</td>
                  </tr>
                  <tr>
                    <td>2025-01-15</td>
                    <td>AKT06</td>
                    <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>0.081234 BTC</td>
                    <td>2156.78 TH/s</td>
                  </tr>
                  <tr>
                    <td>2025-01-14</td>
                    <td>AKT04</td>
                    <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>0.080521 BTC</td>
                    <td>2041.42 TH/s</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-6)', padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '16px', fontWeight: 600 }}>
                <strong>Total: <span style={{ color: 'var(--hearst-green)', marginLeft: 'var(--space-2)' }}>0.491902 BTC</span></strong>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Container */}
        <div className="wallet-charts-container">
          <div className="wallet-chart-section">
            <div className="chart-header">
              <h2 className="chart-title">Performance Overview</h2>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-dot green"></span>
                  <span>Projects</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot gray"></span>
                  <span>Jobs</span>
                </div>
              </div>
            </div>
            <div className="chart-container" style={{ position: 'relative', width: '100%', height: '240px' }}>
              <LineChart data={chartData1} options={chartOptions} />
            </div>
          </div>

          <div className="wallet-chart-section">
            <div className="chart-header">
              <h2 className="chart-title">Statistics Bar Chart</h2>
            </div>
            <div className="chart-container" style={{ position: 'relative', width: '100%', height: '240px' }}>
              <BarChart data={chartData2} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



