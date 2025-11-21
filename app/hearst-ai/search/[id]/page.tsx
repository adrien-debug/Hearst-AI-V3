'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface SearchResult {
  type: 'project' | 'job' | 'customer'
  title: string
  description: string
  url: string
}

interface SearchHistoryItem {
  id: string
  timestamp: Date
  query: string
  results: SearchResult[]
  resultsCount: number
}

export default function SearchDetailPage() {
  const params = useParams()
  const router = useRouter()
  const searchId = params.id as string
  const [searchItem, setSearchItem] = useState<SearchHistoryItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load search history from localStorage or use mock data
    const loadSearchItem = () => {
      try {
        // Try to load from localStorage first
        const storedHistory = localStorage.getItem('hearst-ai-search-history')
        if (storedHistory) {
          const history: SearchHistoryItem[] = JSON.parse(storedHistory).map((item: any) => ({
            ...item,
            timestamp: new Date(item.timestamp),
          }))
          const found = history.find(item => item.id === searchId)
          if (found) {
            setSearchItem(found)
            setLoading(false)
            return
          }
        }

        // Fallback to mock data
        const mockHistory: SearchHistoryItem[] = [
          {
            id: '1',
            timestamp: new Date(Date.now() - 3600000),
            query: 'Project Alpha',
            results: [
              {
                type: 'project',
                title: 'Project Alpha',
                description: 'Projet de mining principal avec configuration optimisée',
                url: '/projects/alpha',
              },
            ],
            resultsCount: 1,
          },
          {
            id: '2',
            timestamp: new Date(Date.now() - 7200000),
            query: 'Job #1234',
            results: [
              {
                type: 'job',
                title: 'Job #1234',
                description: 'Job de mining en cours avec hash rate élevé',
                url: '/jobs/1234',
              },
            ],
            resultsCount: 1,
          },
          {
            id: '3',
            timestamp: new Date(Date.now() - 10800000),
            query: 'Customer Beta',
            results: [
              {
                type: 'customer',
                title: 'Customer Beta',
                description: 'Customer avec portefeuille actif sur plusieurs chaînes',
                url: '/collateral/customers/beta',
              },
            ],
            resultsCount: 1,
          },
          {
            id: '4',
            timestamp: new Date(Date.now() - 14400000),
            query: 'mining',
            results: [
              {
                type: 'project',
                title: 'Project Alpha',
                description: 'Projet de mining principal',
                url: '/projects/alpha',
              },
              {
                type: 'job',
                title: 'Job #1234',
                description: 'Job de mining en cours',
                url: '/jobs/1234',
              },
            ],
            resultsCount: 2,
          },
          {
            id: '5',
            timestamp: new Date(Date.now() - 18000000),
            query: 'hashrate',
            results: [
              {
                type: 'job',
                title: 'Job #1234',
                description: 'Job de mining en cours avec hash rate élevé',
                url: '/jobs/1234',
              },
            ],
            resultsCount: 1,
          },
        ]

        const found = mockHistory.find(item => item.id === searchId)
        if (found) {
          setSearchItem(found)
        } else {
          // If not found, redirect to main search page
          router.push('/hearst-ai')
        }
      } catch (error) {
        console.error('Error loading search item:', error)
        router.push('/hearst-ai')
      } finally {
        setLoading(false)
      }
    }

    if (searchId) {
      loadSearchItem()
    }
  }, [searchId, router])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project':
        return '#a5ff9c'
      case 'job':
        return '#FFA500'
      case 'customer':
        return '#8afd81'
      default:
        return 'var(--text-secondary)'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'project':
        return 'Projet'
      case 'job':
        return 'Job'
      case 'customer':
        return 'Customer'
      default:
        return type
    }
  }

  const getTypeBgColor = (type: string) => {
    switch (type) {
      case 'project':
        return 'rgba(165, 255, 156, 0.1)'
      case 'job':
        return 'rgba(255, 165, 0, 0.1)'
      case 'customer':
        return 'rgba(138, 253, 129, 0.1)'
      default:
        return 'rgba(255, 255, 255, 0.05)'
    }
  }

  const getTypeBorderColor = (type: string) => {
    switch (type) {
      case 'project':
        return 'rgba(165, 255, 156, 0.3)'
      case 'job':
        return 'rgba(255, 165, 0, 0.3)'
      case 'customer':
        return 'rgba(138, 253, 129, 0.3)'
      default:
        return 'rgba(255, 255, 255, 0.1)'
    }
  }

  if (loading) {
    return (
      <div className="dashboard-view">
        <div className="dashboard-content">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            gap: 'var(--space-4)',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(165, 255, 156, 0.2)',
              borderTopColor: '#a5ff9c',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}></div>
            <p style={{ color: 'var(--text-secondary)' }}>Chargement de la recherche...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!searchItem) {
    return (
      <div className="dashboard-view">
        <div className="dashboard-content">
          <div style={{
            padding: 'var(--space-8)',
            textAlign: 'center',
          }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              Recherche non trouvée
            </p>
            <Link
              href="/hearst-ai"
              style={{
                display: 'inline-block',
                padding: 'var(--space-3) var(--space-5)',
                backgroundColor: 'var(--hearst-green)',
                color: '#000000',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
              }}
            >
              Retour à la recherche
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        {/* Header */}
        <div style={{
          marginBottom: 'var(--space-6)',
          paddingBottom: 'var(--space-6)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <Link
            href="/hearst-ai"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: 'var(--text-sm)',
              marginBottom: 'var(--space-4)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--hearst-green)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retour à My Hearst AI
          </Link>
          
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-4)',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, rgba(165, 255, 156, 0.2) 0%, rgba(138, 253, 129, 0.2) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(165, 255, 156, 0.3)',
              flexShrink: 0,
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#a5ff9c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-2)',
              }}>
                Résultats de la recherche
              </h1>
              <div style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 600,
                color: 'var(--hearst-green)',
                marginBottom: 'var(--space-2)',
              }}>
                "{searchItem.query}"
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                flexWrap: 'wrap',
              }}>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                }}>
                  {searchItem.timestamp.toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div style={{
                  padding: 'var(--space-1) var(--space-3)',
                  backgroundColor: 'rgba(165, 255, 156, 0.1)',
                  border: '1px solid rgba(165, 255, 156, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--hearst-green)',
                  fontWeight: 500,
                }}>
                  {searchItem.resultsCount} résultat{searchItem.resultsCount > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}>
          {searchItem.results.length > 0 ? (
            searchItem.results.map((result, index) => (
              <Link
                key={index}
                href={result.url}
                style={{
                  display: 'block',
                  padding: 'var(--space-6)',
                  backgroundColor: 'rgba(14, 14, 14, 0.75)',
                  border: '0.5px solid rgba(255, 255, 255, 0.04)',
                  borderLeft: `4px solid ${getTypeColor(result.type)}`,
                  borderRadius: 'var(--radius-lg)',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.borderColor = getTypeBorderColor(result.type)
                  e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)'
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-4)',
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: getTypeBgColor(result.type),
                    border: `2px solid ${getTypeBorderColor(result.type)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 700,
                    color: getTypeColor(result.type),
                    flexShrink: 0,
                  }}>
                    {result.type === 'project' ? 'P' : result.type === 'job' ? 'J' : 'C'}
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      marginBottom: 'var(--space-2)',
                    }}>
                      <h3 style={{
                        fontSize: 'var(--text-xl)',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        margin: 0,
                      }}>
                        {result.title}
                      </h3>
                      <span style={{
                        padding: 'var(--space-1) var(--space-2)',
                        backgroundColor: getTypeBgColor(result.type),
                        border: `1px solid ${getTypeBorderColor(result.type)}`,
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--text-xs)',
                        color: getTypeColor(result.type),
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }}>
                        {getTypeLabel(result.type)}
                      </span>
                    </div>
                    
                    <p style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: 'var(--space-3)',
                    }}>
                      {result.description}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--hearst-green)',
                      fontWeight: 500,
                    }}>
                      <span>Voir les détails</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div style={{
              padding: 'var(--space-8)',
              textAlign: 'center',
              backgroundColor: 'rgba(14, 14, 14, 0.75)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <p style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-4)',
              }}>
                Aucun résultat trouvé pour cette recherche
              </p>
              <Link
                href="/hearst-ai"
                style={{
                  display: 'inline-block',
                  padding: 'var(--space-3) var(--space-5)',
                  backgroundColor: 'var(--hearst-green)',
                  color: '#000000',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
              >
                Nouvelle recherche
              </Link>
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div style={{
          marginTop: 'var(--space-8)',
          paddingTop: 'var(--space-6)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}>
          <button
            onClick={() => {
              router.push('/hearst-ai')
              // Set the search query in the main page
              setTimeout(() => {
                const event = new CustomEvent('setSearchQuery', { detail: searchItem.query })
                window.dispatchEvent(event)
              }, 100)
            }}
            style={{
              padding: 'var(--space-3) var(--space-5)',
              backgroundColor: 'rgba(165, 255, 156, 0.1)',
              border: '1px solid rgba(165, 255, 156, 0.3)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--hearst-green)',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(165, 255, 156, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(165, 255, 156, 0.1)'
            }}
          >
            Relancer cette recherche
          </button>
          
          <Link
            href="/hearst-ai"
            style={{
              padding: 'var(--space-3) var(--space-5)',
              backgroundColor: 'var(--hearst-green)',
              color: '#000000',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
            }}
          >
            Retour à My Hearst AI
          </Link>
        </div>
      </div>
    </div>
  )
}

