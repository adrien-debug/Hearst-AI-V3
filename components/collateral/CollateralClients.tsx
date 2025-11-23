'use client'

import { useEffect, useState } from 'react'
import { collateralAPI, customersAPI } from '@/lib/api'
import './Collateral.css'

// Fonction pour calculer les métriques d'un client
function computeClientMetrics(client: any) {
  let totalCollateralUsd = 0
  let totalDebtUsd = 0
  let weightedRateNumerator = 0

  client.positions?.forEach((pos: any) => {
    const collatUsd = (pos.collateralAmount || 0) * (pos.collateralPriceUsd || 0)
    const debtUsd = pos.debtAmount || 0
    totalCollateralUsd += collatUsd
    totalDebtUsd += debtUsd
    weightedRateNumerator += debtUsd * (pos.borrowApr || 0)
  })

  const collateralizationRatio = totalDebtUsd === 0 ? Infinity : totalCollateralUsd / totalDebtUsd
  const healthFactor = collateralizationRatio === Infinity ? 999 : collateralizationRatio
  const threshold = 0.9
  const maxDebtSafe = totalCollateralUsd * threshold
  const riskRaw = maxDebtSafe === 0 ? 0 : totalDebtUsd / maxDebtSafe
  const riskPercent = Math.max(0, Math.min(100, riskRaw * 100))
  const avgBorrowRate = totalDebtUsd === 0 ? 0 : weightedRateNumerator / totalDebtUsd
  const availableCredit = Math.max(0, maxDebtSafe - totalDebtUsd)
  const utilizationRate = totalCollateralUsd > 0 ? (totalDebtUsd / totalCollateralUsd) * 100 : 0

  return {
    totalCollateralUsd,
    totalDebtUsd,
    collateralizationRatio,
    healthFactor,
    riskPercent,
    avgBorrowRate,
    availableCredit,
    utilizationRate,
  }
}

export default function CollateralClients() {
  const [customers, setCustomers] = useState<any[]>([])
  const [collateralData, setCollateralData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        
        // Charger les clients depuis la base de données
        let customersResponse
        try {
          customersResponse = await customersAPI.getAll()
          setCustomers(customersResponse.customers || [])
        } catch (customerErr) {
          console.error('Error loading customers:', customerErr)
          // Fallback sur données mockées
          setCustomers([
            {
              id: '1',
              name: 'Client Principal',
              tag: 'Client',
              erc20Address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
              chains: '["eth"]',
              protocols: '["morpho", "aave"]',
              createdAt: new Date().toISOString(),
            },
            {
              id: '2',
              name: 'Client Secondaire',
              tag: 'VIP',
              erc20Address: '0x8ba1f109551bD432803012645Hac136c22C9',
              chains: '["eth"]',
              protocols: '["morpho"]',
              createdAt: new Date().toISOString(),
            },
          ])
        }
        
        // Charger les données collatérales depuis DeBank
        try {
          const collateralResponse = await collateralAPI.getAll()
          setCollateralData(collateralResponse)
        } catch (collateralErr) {
          console.error('Error loading collateral data:', collateralErr)
          // Fallback sur données mockées
          setCollateralData({
            clients: [
              {
                id: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
                name: 'Client Principal',
                positions: [
                  { protocol: 'Morpho', asset: 'ETH', collateralAmount: 500, collateralPriceUsd: 3800, debtToken: 'USDC', debtAmount: 200000, borrowApr: 0.065, chain: 'ethereum' },
                  { protocol: 'Aave', asset: 'BTC', collateralAmount: 300, collateralPriceUsd: 71000, debtToken: 'USDC', debtAmount: 150000, borrowApr: 0.072, chain: 'ethereum' },
                ],
                lastUpdate: new Date().toISOString(),
              },
              {
                id: '0x8ba1f109551bD432803012645Hac136c22C9',
                name: 'Client Secondaire',
                positions: [
                  { protocol: 'Morpho', asset: 'USDC', collateralAmount: 400000, collateralPriceUsd: 1, debtToken: 'USDC', debtAmount: 180000, borrowApr: 0.062, chain: 'ethereum' },
                ],
                lastUpdate: new Date().toISOString(),
              },
            ],
          })
        }
      } catch (err) {
        console.error('Error loading data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Loading clients...
      </div>
    )
  }

  // Fonction pour trouver les données collatérales d'un client
  const getCollateralData = (customer: any) => {
    const erc20Address = customer.erc20Address || customer.id
    return collateralData?.clients?.find((c: any) => 
      c.id === erc20Address || c.id?.toLowerCase() === erc20Address?.toLowerCase()
    )
  }

  // Calculer les statistiques globales
  const totalClients = customers.length
  const clientsWithPositions = customers.filter(c => {
    const collateral = getCollateralData(c)
    return collateral && (collateral.positions?.length > 0)
  }).length

  // Calculer les totaux
  const allMetrics = collateralData?.clients?.map((client: any) => computeClientMetrics(client)) || []
  const totalCollateral = allMetrics.reduce((sum, m) => sum + m.totalCollateralUsd, 0)
  const totalDebt = allMetrics.reduce((sum, m) => sum + m.totalDebtUsd, 0)

  return (
    <div>
      {/* Summary KPI */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Clients</div>
          <div className="kpi-value">{totalClients}</div>
          <div className="kpi-description">All registered clients</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active Clients</div>
          <div className="kpi-value">{clientsWithPositions}</div>
          <div className="kpi-description">Clients with positions</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Collateral</div>
          <div className="kpi-value">${(totalCollateral / 1000000).toFixed(2)}M</div>
          <div className="kpi-description">All clients collateral</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Debt</div>
          <div className="kpi-value">${(totalDebt / 1000).toFixed(0)}K</div>
          <div className="kpi-description">All clients debt</div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="collateral-card">
        <div className="collateral-card-header">
          <h3 className="collateral-card-title">Clients List</h3>
        </div>
        <div className="collateral-card-body">
          <div className="collateral-table-container">
            <table className="collateral-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Tag</th>
                  <th>ERC20 Address</th>
                  <th>Chains</th>
                  <th>Protocols</th>
                  <th>Total Collateral</th>
                  <th>Total Debt</th>
                  <th>Health Factor</th>
                  <th>Positions</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map((customer) => {
                    const collateral = getCollateralData(customer)
                    const metrics = collateral ? computeClientMetrics(collateral) : null
                    const positionsCount = collateral?.positions?.length || 0
                    
                    // Parser les chains et protocols
                    let chains: string[] = []
                    let protocols: string[] = []
                    try {
                      chains = customer.chains ? JSON.parse(customer.chains) : []
                      protocols = customer.protocols ? JSON.parse(customer.protocols) : []
                    } catch (e) {
                      // Si le parsing échoue, utiliser les valeurs par défaut
                      chains = ['eth']
                    }
                    
                    const erc20Address = customer.erc20Address || customer.id || 'N/A'
                    const truncatedAddress = erc20Address.length > 20 
                      ? `${erc20Address.slice(0, 10)}...${erc20Address.slice(-8)}`
                      : erc20Address

                    return (
                      <tr key={customer.id}>
                        <td><strong>{customer.name || 'N/A'}</strong></td>
                        <td>
                          <span style={{ 
                            padding: '4px 8px', 
                            background: 'rgba(197, 255, 167, 0.1)', 
                            borderRadius: '4px', 
                            fontSize: 'var(--text-xs)',
                            color: '#C5FFA7'
                          }}>
                            {customer.tag || 'Client'}
                          </span>
                        </td>
                        <td>
                          <span style={{ 
                            fontFamily: 'var(--font-mono)', 
                            fontSize: 'var(--text-xs)',
                            color: 'var(--text-secondary)'
                          }} title={erc20Address}>
                            {truncatedAddress}
                          </span>
                        </td>
                        <td>
                          {chains.length > 0 ? (
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                              {chains.map((chain: string, idx: number) => (
                                <span key={idx} style={{
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  background: 'rgba(255, 255, 255, 0.05)',
                                  fontSize: 'var(--text-xs)',
                                  textTransform: 'capitalize'
                                }}>
                                  {chain}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span style={{ color: 'var(--text-secondary)' }}>N/A</span>
                          )}
                        </td>
                        <td>
                          {protocols.length > 0 ? (
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                              {protocols.map((protocol: string, idx: number) => (
                                <span key={idx} style={{
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  background: 'rgba(197, 255, 167, 0.1)',
                                  color: '#C5FFA7',
                                  fontSize: 'var(--text-xs)',
                                  textTransform: 'capitalize'
                                }}>
                                  {protocol}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span style={{ color: 'var(--text-secondary)' }}>N/A</span>
                          )}
                        </td>
                        <td className={metrics && metrics.totalCollateralUsd > 0 ? 'collateral-value-green' : 'var(--text-secondary)'}>
                          {metrics ? `$${metrics.totalCollateralUsd.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '$0'}
                        </td>
                        <td style={{ color: metrics && metrics.totalDebtUsd > 0 ? '#ff4d4d' : 'var(--text-secondary)' }}>
                          {metrics ? `$${metrics.totalDebtUsd.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '$0'}
                        </td>
                        <td style={{ 
                          color: metrics && metrics.healthFactor >= 2 ? '#C5FFA7' : metrics && metrics.healthFactor >= 1.5 ? '#FFA500' : 'var(--text-secondary)',
                          fontWeight: metrics ? 'var(--font-semibold)' : 'normal'
                        }}>
                          {metrics ? metrics.healthFactor.toFixed(2) : 'N/A'}
                        </td>
                        <td>{positionsCount}</td>
                        <td>
                          <span style={{ 
                            padding: '4px 8px', 
                            borderRadius: '4px', 
                            fontSize: 'var(--text-xs)',
                            background: positionsCount > 0 
                              ? 'rgba(197, 255, 167, 0.2)' 
                              : 'rgba(255, 255, 255, 0.05)',
                            color: positionsCount > 0 ? '#C5FFA7' : 'var(--text-secondary)'
                          }}>
                            {positionsCount > 0 ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <button className="collateral-btn-secondary">View</button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={11} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: 'var(--space-8)' }}>
                      No clients found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

