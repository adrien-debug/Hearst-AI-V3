'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { collateralAPI, customersAPI } from '@/lib/api'

export default function CollateralOverview({ refreshKey = 0 }: { refreshKey?: number }) {
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Charger les clients depuis la base de données
        const customersResponse = await customersAPI.getAll()
        console.log('[CollateralOverview] Clients depuis DB:', customersResponse)
        setCustomers(customersResponse.customers || [])
        
        // Charger les données collatérales depuis DeBank
        const response = await collateralAPI.getAll()
        console.log('[CollateralOverview] Données collatérales:', response)
        setData(response)
      } catch (err) {
        console.error('Error loading data:', err)
        // En cas d'erreur, essayer de charger au moins les clients depuis la DB
        try {
          const customersResponse = await customersAPI.getAll()
          setCustomers(customersResponse.customers || [])
        } catch (customerErr) {
          console.error('Error loading customers:', customerErr)
        }
        setData({ clients: [] })
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [refreshKey])

  const totalCollateral = data?.clients?.reduce((sum: number, client: any) => sum + (client.totalValue || 0), 0) || 2100000
  const totalDebt = data?.clients?.reduce((sum: number, client: any) => sum + (client.totalDebt || 0), 0) || 770000
  const totalAvailable = data?.clients?.reduce((sum: number, client: any) => sum + (client.availableCredit || 0), 0) || 1330000
  const utilizationRate = totalCollateral > 0 ? ((totalDebt / totalCollateral) * 100).toFixed(1) : '0'

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>Total Collateral</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              ${(totalCollateral / 1000000).toFixed(2)}M
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Total value locked
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {data?.clients?.length || 2}
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Outstanding loans
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Utilization Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: parseFloat(utilizationRate) < 50 ? 'var(--hearst-green)' : parseFloat(utilizationRate) < 80 ? '#FFA500' : '#ff4d4d' }}>
              {utilizationRate}%
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Collateral utilization
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Available Credit</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              ${(totalAvailable / 1000).toFixed(0)}K
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Available to borrow
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Clients List */}
      <Card style={{ marginBottom: 'var(--space-6)', width: '100%' }}>
        <CardHeader>
          <CardTitle>Clients ({customers.length > 0 ? customers.length : data?.clients?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent style={{ padding: 0 }}>
          {loading ? (
            <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <p>Chargement des clients...</p>
            </div>
          ) : (customers.length > 0 || (data?.clients && data.clients.length > 0)) ? (
            <div className="table-container" style={{ width: '100%' }}>
              <table className="table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Tag</th>
                    <th>Adresse ERC20</th>
                    <th>Chaînes</th>
                    <th>Protocoles</th>
                    <th>Total Value</th>
                    <th>Total Debt</th>
                    <th>Health Factor</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer: any) => {
                    // Trouver les données collatérales correspondantes si disponibles
                    const collateralData = data?.clients?.find((c: any) => c.id === customer.id)
                    const chains = JSON.parse(customer.chains || '["eth"]')
                    const protocols = JSON.parse(customer.protocols || '[]')
                    
                    return (
                      <tr key={customer.id}>
                        <td style={{ fontWeight: 600 }}>{customer.name || 'N/A'}</td>
                        <td>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'rgba(165, 255, 156, 0.1)',
                            color: 'var(--hearst-green)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 500,
                          }}>
                            {customer.tag || 'Client'}
                          </span>
                        </td>
                        <td style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)' }}>
                          {customer.erc20Address || 'N/A'}
                        </td>
                        <td>
                          {Array.isArray(chains) && chains.length > 0 ? (
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                              {chains.map((chain: string, idx: number) => (
                                <span key={idx} style={{
                                  padding: '2px 6px',
                                  borderRadius: 'var(--radius-sm)',
                                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                  fontSize: 'var(--text-xs)',
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
                          {Array.isArray(protocols) && protocols.length > 0 ? (
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                              {protocols.map((protocol: string, idx: number) => (
                                <span key={idx} style={{
                                  padding: '2px 6px',
                                  borderRadius: 'var(--radius-sm)',
                                  backgroundColor: 'rgba(165, 255, 156, 0.1)',
                                  color: 'var(--hearst-green)',
                                  fontSize: 'var(--text-xs)',
                                }}>
                                  {protocol}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span style={{ color: 'var(--text-secondary)' }}>Tous</span>
                          )}
                        </td>
                        <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>
                          {collateralData?.totalValue ? `$${(collateralData.totalValue / 1000).toFixed(0)}K` : 'N/A'}
                        </td>
                        <td style={{ color: '#ff4d4d', fontWeight: 600 }}>
                          {collateralData?.totalDebt ? `$${(collateralData.totalDebt / 1000).toFixed(0)}K` : 'N/A'}
                        </td>
                        <td>
                          {collateralData?.healthFactor ? (
                            <span style={{
                              color: collateralData.healthFactor > 2 ? 'var(--hearst-green)' : collateralData.healthFactor > 1.5 ? '#FFA500' : '#ff4d4d',
                              fontWeight: 600,
                            }}>
                              {collateralData.healthFactor.toFixed(2)}
                            </span>
                          ) : (
                            <span style={{ color: 'var(--text-secondary)' }}>N/A</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{
              padding: 'var(--space-6)',
              textAlign: 'center',
              color: 'var(--text-secondary)',
            }}>
              <p>Aucun client enregistré.</p>
              <p style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
                Utilisez le bouton "Ajouter Customer" pour ajouter un nouveau client.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <CardTitle>Recent Activity</CardTitle>
            <button
              onClick={() => {
                // Naviguer vers la page collateral avec l'onglet transactions actif
                router.push('/collateral?section=transactions')
              }}
              style={{
                padding: '6px 12px',
                fontSize: 'var(--text-sm)',
                backgroundColor: 'transparent',
                color: 'var(--hearst-green)',
                border: '1px solid var(--hearst-green)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(138, 253, 129, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              Voir tout →
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="table-container" style={{ width: '100%' }}>
            <table className="table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Protocol</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Supply</td>
                  <td style={{ color: 'var(--hearst-green)' }}>+500 ETH</td>
                  <td>Morpho</td>
                  <td>2 hours ago</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>Completed</span></td>
                </tr>
                <tr>
                  <td>Borrow</td>
                  <td style={{ color: '#ff4d4d' }}>-200 ETH</td>
                  <td>Morpho</td>
                  <td>1 day ago</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>Completed</span></td>
                </tr>
                <tr>
                  <td>Supply</td>
                  <td style={{ color: 'var(--hearst-green)' }}>+300 BTC</td>
                  <td>Aave</td>
                  <td>2 days ago</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>Completed</span></td>
                </tr>
                <tr>
                  <td>Repay</td>
                  <td style={{ color: 'var(--hearst-green)' }}>+150 BTC</td>
                  <td>Aave</td>
                  <td>3 days ago</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>Completed</span></td>
                </tr>
                <tr>
                  <td>Supply</td>
                  <td style={{ color: 'var(--hearst-green)' }}>+400 USDC</td>
                  <td>Morpho</td>
                  <td>5 days ago</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>Completed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

