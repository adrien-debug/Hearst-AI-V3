'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { customersAPI, collateralAPI } from '@/lib/api'

// Fonction pour formater les valeurs avec séparateurs de milliers
const formatValue = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return 'N/A'
  // Afficher même si la valeur est 0
  const numValue = typeof value === 'number' ? value : parseFloat(value as any) || 0
  return `$${numValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default function CollateralCustomers({ refreshKey = 0 }: { refreshKey?: number }) {
  const router = useRouter()
  const [customers, setCustomers] = useState<any[]>([])
  const [collateralData, setCollateralData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Charger les clients depuis la base de données
        const customersResponse = await customersAPI.getAll()
        setCustomers(customersResponse.customers || [])
        
        // Charger les données collatérales depuis DeBank
        try {
          const collateralResponse = await collateralAPI.getAll()
          console.log('[CollateralCustomers] Données collatérales chargées:', collateralResponse)
          setCollateralData(collateralResponse)
        } catch (collateralErr) {
          console.error('Error loading collateral data:', collateralErr)
          setCollateralData({ clients: [] })
        }
      } catch (err) {
        console.error('Error loading customers:', err)
        setCustomers([])
        setCollateralData({ clients: [] })
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [refreshKey])


  return (
    <div>
      <Card style={{ width: '100%' }}>
        <CardHeader>
          <CardTitle>Liste des Clients ({customers.length})</CardTitle>
        </CardHeader>
        <CardContent style={{ padding: 0 }}>
          {loading ? (
            <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <p>Chargement des clients...</p>
            </div>
          ) : customers.length === 0 ? (
            <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <p>Aucun client enregistré</p>
            </div>
          ) : (
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
                    <th>Date de création</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer: any) => {
                    // Trouver les données collatérales correspondantes si disponibles
                    const collateral = collateralData?.clients?.find((c: any) => c.id === customer.id)
                    
                    // Logs de débogage
                    if (customer.id) {
                      console.log(`[CollateralCustomers] Client: ${customer.name} (ID: ${customer.id})`)
                      console.log(`[CollateralCustomers] Collateral trouvé:`, collateral ? 'OUI' : 'NON')
                      if (collateral) {
                        console.log(`[CollateralCustomers] Valeurs:`, {
                          totalValue: collateral.totalValue,
                          totalDebt: collateral.totalDebt,
                          healthFactor: collateral.healthFactor
                        })
                        console.log(`[CollateralCustomers] FormatValue totalValue:`, formatValue(collateral.totalValue))
                        console.log(`[CollateralCustomers] FormatValue totalDebt:`, formatValue(collateral.totalDebt))
                      } else {
                        console.log(`[CollateralCustomers] IDs disponibles dans collateralData:`, collateralData?.clients?.map((c: any) => c.id))
                      }
                    }
                    
                    const chains = JSON.parse(customer.chains || '["eth"]')
                    const protocols = JSON.parse(customer.protocols || '[]')
                    const createdAt = new Date(customer.createdAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                    
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
                          {collateral && (collateral.totalValue !== undefined && collateral.totalValue !== null) 
                            ? `$${Math.round(collateral.totalValue).toLocaleString('en-US')}` 
                            : 'N/A'}
                        </td>
                        <td style={{ color: '#ff4d4d', fontWeight: 600 }}>
                          {collateral && (collateral.totalDebt !== undefined && collateral.totalDebt !== null)
                            ? `$${Math.round(collateral.totalDebt).toLocaleString('en-US')}`
                            : 'N/A'}
                        </td>
                        <td>
                          {collateral && (collateral.healthFactor !== undefined && collateral.healthFactor !== null) ? (
                            <span style={{
                              color: collateral.healthFactor > 2 ? 'var(--hearst-green)' : collateral.healthFactor > 1.5 ? '#FFA500' : collateral.healthFactor > 0 ? '#ff4d4d' : 'var(--text-secondary)',
                              fontWeight: 600,
                            }}>
                              {collateral.healthFactor.toFixed(2)}
                            </span>
                          ) : (
                            <span style={{ color: 'var(--text-secondary)' }}>N/A</span>
                          )}
                        </td>
                        <td style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                          {createdAt}
                        </td>
                        <td>
                          <button
                            onClick={() => router.push(`/collateral/customers/${customer.id}`)}
                            style={{
                              padding: '4px 8px',
                              fontSize: 'var(--text-xs)',
                              backgroundColor: 'var(--hearst-green)',
                              color: '#000000',
                              border: 'none',
                              borderRadius: 'var(--radius-sm)',
                              cursor: 'pointer',
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
                            Détails
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  )
}

