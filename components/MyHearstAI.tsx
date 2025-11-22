'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SearchHistoryItem {
  id: string
  timestamp: Date
  query: string
  results: any[]
  resultsCount: number
}

export default function MyHearstAI() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([
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
  ])
  const [historyFilter, setHistoryFilter] = useState('')
  const [searchTypeFilter, setSearchTypeFilter] = useState<string | null>(null)

  const searchTypes = [
    { id: 'rapport-client', label: 'Rapport Client', icon: 'document' },
    { id: 'mining-batch', label: 'Mining Batch', icon: 'dashboard' },
    { id: 'customer-detail', label: 'Customers Detail', icon: 'users' },
    { id: 'transaction', label: 'Transactions', icon: 'transaction' },
    { id: 'hashrate', label: 'Hashrate', icon: 'energy' },
    { id: 'wallet', label: 'Wallet', icon: 'wallet' },
    { id: 'all', label: 'Tous', icon: 'search' },
  ]

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

  // Save search history to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && searchHistory.length > 0) {
      try {
        const historyToSave = searchHistory.map(item => ({
          ...item,
          timestamp: item.timestamp.toISOString(),
        }))
        localStorage.setItem('hearst-ai-search-history', JSON.stringify(historyToSave))
      } catch (error) {
        console.error('Error saving search history:', error)
      }
    }
  }, [searchHistory])

  // Listen for custom event to set search query
  useEffect(() => {
    const handleSetSearchQuery = (event: CustomEvent) => {
      const query = event.detail
      if (query) {
        setSearchQuery(query)
        // Trigger search after a short delay to ensure state is updated
        setTimeout(() => {
          handleSearch(query)
        }, 100)
      }
    }

    window.addEventListener('setSearchQuery', handleSetSearchQuery as EventListener)
    return () => {
      window.removeEventListener('setSearchQuery', handleSetSearchQuery as EventListener)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
      const results = await performAISearch(query, searchTypeFilter)
      setSearchResults(results)
      
      // Sauvegarder dans l'historique si elle a des résultats
      if (results.length > 0) {
        const historyItem: SearchHistoryItem = {
          id: Date.now().toString(),
          timestamp: new Date(),
          query: query.trim(),
          results: results,
          resultsCount: results.length,
        }
        setSearchHistory(prev => [historyItem, ...prev])
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const performAISearch = async (query: string, typeFilter?: string | null): Promise<any[]> => {
    // Simulation d'une recherche AI
    // Dans un vrai cas, cela appellerait une API AI
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResults = [
          {
            type: 'project',
            searchType: 'mining-batch',
            title: 'Project Alpha',
            description: `Found project matching "${query}"`,
            url: '/projects/alpha',
          },
          {
            type: 'job',
            searchType: 'mining-batch',
            title: 'Job #1234',
            description: `Found job matching "${query}"`,
            url: '/jobs/1234',
          },
          {
            type: 'customer',
            searchType: 'customer-detail',
            title: 'Customer Beta',
            description: `Found customer matching "${query}"`,
            url: '/collateral/customers/beta',
          },
          {
            type: 'report',
            searchType: 'rapport-client',
            title: 'Rapport Client Alpha',
            description: `Rapport détaillé du client Alpha pour "${query}"`,
            url: '/reports/client-alpha',
          },
          {
            type: 'transaction',
            searchType: 'transaction',
            title: 'Transaction #5678',
            description: `Transaction BTC matching "${query}"`,
            url: '/transactions/5678',
          },
          {
            type: 'hashrate',
            searchType: 'hashrate',
            title: 'Hashrate Report',
            description: `Rapport de hash rate matching "${query}"`,
            url: '/hashrate/report',
          },
          {
            type: 'wallet',
            searchType: 'wallet',
            title: 'Wallet BTC',
            description: `Portefeuille BTC matching "${query}"`,
            url: '/wallet/btc',
          },
        ].filter(item => {
          // Filter by search query
          const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
          
          // Filter by type if selected
          if (typeFilter && typeFilter !== 'all') {
            return matchesQuery && item.searchType === typeFilter
          }
          
          return matchesQuery
        })
        resolve(mockResults)
      }, 300)
    })
  }

  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        {/* AI Search Bar Section - Style Home page */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>
            My Hearst AI
          </h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Recherche dans toutes les données de la plateforme</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search Type Filter Buttons */}
              <div className="search-type-filters" style={{ marginBottom: 'var(--space-4)' }}>
              {searchTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    if (searchTypeFilter === type.id) {
                      setSearchTypeFilter(null)
                    } else {
                      setSearchTypeFilter(type.id)
                    }
                  }}
                  className={`search-type-btn ${searchTypeFilter === type.id ? 'active' : ''}`}
                >
                  <span className="search-type-btn-icon">
                    {type.id === 'rapport-client' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {type.id === 'mining-batch' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M3 9H21" stroke="currentColor" strokeWidth="2"/>
                        <path d="M9 21V9" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                    {type.id === 'customer-detail' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {type.id === 'transaction' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {type.id === 'hashrate' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {type.id === 'wallet' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                    {type.id === 'all' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
            
            <div className="ai-search-input-wrapper">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Rechercher dans les données Bitcoin Mining (rapports, batches, customers, transactions, hash rate, wallets)..."
                className="ai-search-input"
              />
              <div>
                {isSearching ? (
                  <div className="spinner"></div>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            {searchResults.length > 0 && (
              <div className="ai-search-results">
                {searchResults.map((result, index) => {
                  // Pour les jobs, aller directement à la page Job sans passer par la page intermédiaire
                  const href = result.type === 'job' ? result.url : result.url
                  
                  return (
                  <a
                    key={index}
                    href={href}
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
                  )
                })}
              </div>
            )}
            
            </CardContent>
          </Card>
        </div>
        
        {/* Search History Table Section - Style Home page */}
        <div style={{ marginTop: '-10px', width: '100%', maxWidth: '100%', gridColumn: '1 / -1' }}>
          <Card style={{ width: '100%', maxWidth: '100%' }}>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                <CardTitle>Historique des recherches</CardTitle>
                <div style={{ position: 'relative', width: '300px' }}>
                  <input
                    type="text"
                    value={historyFilter}
                    onChange={(e) => setHistoryFilter(e.target.value)}
                    placeholder="Rechercher dans l'historique..."
                    className="ai-search-input"
                    style={{ paddingLeft: '40px', fontSize: 'var(--text-sm)' }}
                  />
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      position: 'absolute',
                      left: 'var(--space-3)',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent style={{ padding: 'var(--space-6)', width: '100%' }}>
              <div className="table-container" style={{ marginTop: '-10px', width: '100%', maxWidth: '100%', overflowX: 'auto' }}>
                <table className="table" style={{ width: '100%', minWidth: '100%', tableLayout: 'auto' }}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Recherche</th>
                    <th>Résultats</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchHistory
                    .filter(item => 
                      historyFilter === '' || 
                      item.query.toLowerCase().includes(historyFilter.toLowerCase()) ||
                      item.results.some(r => 
                        r.title.toLowerCase().includes(historyFilter.toLowerCase()) ||
                        r.description.toLowerCase().includes(historyFilter.toLowerCase())
                      )
                    )
                    .map((historyItem, index) => (
                    <tr key={historyItem.id}>
                      <td>
                        {historyItem.timestamp.toLocaleString('fr-FR', { 
                          day: '2-digit', 
                          month: '2-digit', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td style={{ color: 'var(--hearst-green)', fontWeight: 500 }}>
                        "{historyItem.query}"
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                          {historyItem.results.slice(0, 3).map((result, idx) => {
                            const href = result.type === 'job' ? result.url : `/hearst-ai/search/${historyItem.id}`
                            return (
                            <a
                              key={idx}
                              href={href}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 'var(--space-1)',
                                padding: 'var(--space-1) var(--space-2)',
                                backgroundColor: result.type === 'project' ? 'rgba(165, 255, 156, 0.1)' :
                                                result.type === 'job' ? 'rgba(255, 165, 0, 0.1)' :
                                                'rgba(138, 253, 129, 0.1)',
                                border: `1px solid ${result.type === 'project' ? 'rgba(165, 255, 156, 0.2)' :
                                                       result.type === 'job' ? 'rgba(255, 165, 0, 0.2)' :
                                                       'rgba(138, 253, 129, 0.2)'}`,
                                borderRadius: 'var(--radius-sm)',
                                textDecoration: 'none',
                                color: 'var(--text-primary)',
                                fontSize: 'var(--text-xs)',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              <span style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: result.type === 'project' ? '#a5ff9c' :
                                                result.type === 'job' ? '#FFA500' :
                                                '#8afd81',
                                display: 'inline-block',
                              }}></span>
                              {result.title}
                            </a>
                            )
                          })}
                          {historyItem.results.length > 3 && (
                            <span style={{ padding: 'var(--space-1) var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                              +{historyItem.results.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <a
                          href={`/hearst-ai/search/${historyItem.id}`}
                          className="btn-secondary"
                          style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-2) var(--space-3)' }}
                        >
                          Voir détails
                        </a>
                      </td>
                    </tr>
                  ))}
                  {searchHistory.filter(item => 
                    historyFilter === '' || 
                    item.query.toLowerCase().includes(historyFilter.toLowerCase()) ||
                    item.results.some(r => 
                      r.title.toLowerCase().includes(historyFilter.toLowerCase()) ||
                      r.description.toLowerCase().includes(historyFilter.toLowerCase())
                    )
                  ).length === 0 && (
                    <tr>
                      <td colSpan={4} style={{
                        padding: 'var(--space-8)',
                        textAlign: 'center',
                        color: 'var(--text-secondary)',
                        fontSize: 'var(--text-sm)',
                      }}>
                        Aucune recherche trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

