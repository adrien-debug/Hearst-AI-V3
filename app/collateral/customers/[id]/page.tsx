'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { customersAPI, collateralAPI } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import EditCustomerModal from '@/components/collateral/EditCustomerModal'

export default function CustomerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const customerId = params.id as string
  const [customer, setCustomer] = useState<any>(null)
  const [collateralData, setCollateralData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingCustomer, setEditingCustomer] = useState<any | null>(null)
  const [deletingCustomerId, setDeletingCustomerId] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Mock data for text-based IDs from MyHearstAI
        const mockCustomers: Record<string, any> = {
          'beta': {
            id: 'beta',
            name: 'Customer Beta',
            tag: 'Customer',
            erc20Address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            chains: JSON.stringify(['eth', 'bsc']),
            protocols: JSON.stringify(['Aave', 'Compound']),
            createdAt: new Date().toISOString(),
          },
        }

        const mockCollateralData: Record<string, any> = {
          'beta': {
            id: 'beta',
            totalValue: 1250000,
            totalDebt: 450000,
            healthFactor: 2.78,
            availableCredit: 800000,
            positions: [
              {
                asset: 'ETH',
                protocol: 'Aave',
                chain: 'eth',
                collateralAmount: 500,
                collateralValueUsd: 750000,
                debtToken: 'USDC',
                debtAmount: 300000,
                debtValueUsd: 300000,
                collateralPriceUsd: 1500,
              },
              {
                asset: 'BTC',
                protocol: 'Compound',
                chain: 'eth',
                collateralAmount: 10,
                collateralValueUsd: 500000,
                debtToken: 'DAI',
                debtAmount: 150000,
                debtValueUsd: 150000,
                collateralPriceUsd: 50000,
              },
            ],
          },
        }

        // Check if it's a mock customer first
        if (mockCustomers[customerId]) {
          setCustomer(mockCustomers[customerId])
          setCollateralData(mockCollateralData[customerId])
          setLoading(false)
          return
        }
        
        // Charger les données du client
        const customerResponse = await customersAPI.getById(customerId)
        setCustomer(customerResponse.customer || customerResponse)
        
        // Charger les données collatérales
        const collateralResponse = await collateralAPI.getAll()
        const clientData = collateralResponse.clients?.find((c: any) => c.id === customerId)
        setCollateralData(clientData)
      } catch (err) {
        console.error('Error loading customer:', err)
        setError(err instanceof Error ? err.message : 'Failed to load customer')
      } finally {
        setLoading(false)
      }
    }

    if (customerId) {
      loadData()
    }
  }, [customerId])

  const formatValue = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return '$0'
    return `$${Math.round(value).toLocaleString('en-US')}`
  }

  const getHealthFactorColor = (hf: number): string => {
    if (hf > 2) return 'var(--hearst-green)' // Vert clair Hearst
    if (hf > 1.5) return 'var(--hearst-green)' // Vert clair
    if (hf > 1) return 'var(--hearst-green)' // Vert moyen-clair
    if (hf > 0) return 'var(--hearst-green)' // Vert moyen
    return 'var(--text-secondary)'
  }

  const handleEdit = () => {
    setEditingCustomer(customer)
  }

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      return
    }

    setDeletingCustomerId(customerId)
    try {
      await customersAPI.delete(customerId)
      // Rediriger vers la liste des clients après suppression
      router.push('/collateral')
    } catch (err: any) {
      console.error('Error deleting customer:', err)
      alert(`Erreur lors de la suppression: ${err.message || 'Erreur inconnue'}`)
      setDeletingCustomerId(null)
    }
  }

  const handleEditSuccess = async () => {
    setEditingCustomer(null)
    // Recharger les données du client
    try {
      const customerResponse = await customersAPI.getById(customerId)
      setCustomer(customerResponse.customer || customerResponse)
      
      const collateralResponse = await collateralAPI.getAll()
      const clientData = collateralResponse.clients?.find((c: any) => c.id === customerId)
      setCollateralData(clientData)
    } catch (err) {
      console.error('Error reloading customer:', err)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-view">
        <div className="dashboard-content">
          <div style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
            <div className="spinner" style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(165, 255, 156, 0.2)',
              borderTopColor: '#a5ff9c',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto',
            }}></div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-4)' }}>Chargement des données...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !customer) {
    return (
      <div className="dashboard-view">
        <div className="dashboard-content">
          <div style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
            <p style={{ color: '#ff4d4d', marginBottom: 'var(--space-4)' }}>Erreur: {error || 'Client non trouvé'}</p>
            <Button onClick={() => router.push('/collateral')} style={{ backgroundColor: 'var(--hearst-green)' }}>
              Retour à Collateral
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const chains = JSON.parse(customer.chains || '["eth"]')
  const protocols = JSON.parse(customer.protocols || '[]')
  const positions = collateralData?.positions || []
  
  const totalValue = collateralData?.totalValue || 0
  const totalDebt = collateralData?.totalDebt || 0
  const healthFactor = collateralData?.healthFactor || 0
  const availableCredit = collateralData?.availableCredit || 0
  const utilizationRate = totalValue > 0 ? ((totalDebt / totalValue) * 100).toFixed(1) : '0'

  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <div>
              <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                {customer.name}
              </h1>
              <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(165, 255, 156, 0.1)',
                  color: 'var(--hearst-green)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                }}>
                  {customer.tag || 'Client'}
                </span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                  {customer.erc20Address}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <button
                onClick={handleEdit}
                style={{
                  padding: '8px 16px',
                  fontSize: 'var(--text-sm)',
                  backgroundColor: 'var(--hearst-green)',
                  color: '#000000',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
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
                Modifier
              </button>
              <button
                onClick={handleDelete}
                disabled={!!deletingCustomerId}
                style={{
                  padding: '8px 16px',
                  fontSize: 'var(--text-sm)',
                  backgroundColor: deletingCustomerId ? 'var(--text-secondary)' : '#ff4d4d',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: deletingCustomerId ? 'not-allowed' : 'pointer',
                  fontWeight: 500,
                  transition: 'opacity 0.2s',
                  opacity: deletingCustomerId ? '0.6' : '1',
                }}
                onMouseEnter={(e) => {
                  if (!deletingCustomerId) {
                    e.currentTarget.style.opacity = '0.8'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = deletingCustomerId ? '0.6' : '1'
                }}
              >
                {deletingCustomerId ? 'Suppression...' : 'Supprimer'}
              </button>
              <button
                onClick={() => router.push('/collateral')}
                style={{
                  padding: '8px 16px',
                  fontSize: 'var(--text-sm)',
                  backgroundColor: 'var(--hearst-green)',
                  color: '#000000',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'opacity 0.2s',
                  marginLeft: 'var(--space-4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
              >
                ← Retour
              </button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <Card>
            <CardHeader>
              <CardTitle style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Total Collateral</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
                {formatValue(totalValue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Total Debt</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
                {formatValue(totalDebt)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Health Factor</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: getHealthFactorColor(healthFactor) }}>
                {healthFactor > 0 ? healthFactor.toFixed(2) : '0.00'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Available Credit</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
                {formatValue(availableCredit)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Utilization Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: parseFloat(utilizationRate) > 80 ? 'var(--hearst-green)' : parseFloat(utilizationRate) > 50 ? 'var(--hearst-green)' : 'var(--hearst-green)' }}>
                {utilizationRate}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Barre de progression Collateral Status */}
        {positions.length > 0 && totalValue > 0 && (
          <Card style={{ marginBottom: 'var(--space-6)', width: '100%' }}>
            <CardHeader>
              <CardTitle>Statut Collatéral</CardTitle>
            </CardHeader>
            <CardContent style={{ width: '100%' }}>
              <div style={{ width: '100%' }}>
                {/* Barre de progression horizontale avec dégradé */}
                <div style={{
                  width: '100%',
                  paddingTop: '30px',
                  position: 'relative',
                }}>
                  {/* Conteneur de la barre avec overflow hidden */}
                  <div style={{
                    width: '100%',
                    height: '40px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid var(--border)',
                  }}>
                    {/* Barre complète avec dégradé vert → orange (80%) → rouge (90%) */}
                    {(() => {
                      const utilizationPercent = (totalDebt / totalValue) * 100
                      const availablePercent = ((totalValue - totalDebt) / totalValue) * 100
                      
                      // Couleurs selon le niveau d'utilisation
                      // La partie utilisée (gauche) change de couleur selon le pourcentage
                      // La partie disponible (droite) reste grise/transparente
                      let gradientColors = ''
                      
                      if (utilizationPercent <= 80) {
                        // Vert jusqu'à 80% d'utilisation
                        gradientColors = `linear-gradient(to right, 
                          var(--hearst-green) 0%, 
                          var(--hearst-green) ${utilizationPercent}%, 
                          rgba(255, 255, 255, 0.1) ${utilizationPercent}%, 
                          rgba(255, 255, 255, 0.1) 100%)`
                      } else if (utilizationPercent <= 90) {
                        // Orange entre 80% et 90%
                        const orangeStart = 80
                        gradientColors = `linear-gradient(to right, 
                          var(--hearst-green) 0%, 
                          var(--hearst-green) ${orangeStart}%, 
                          #ff9800 ${orangeStart}%, 
                          #ff9800 ${utilizationPercent}%, 
                          rgba(255, 255, 255, 0.1) ${utilizationPercent}%, 
                          rgba(255, 255, 255, 0.1) 100%)`
                      } else {
                        // Rouge à partir de 90% (liquidation)
                        const orangeStart = 80
                        const redStart = 90
                        gradientColors = `linear-gradient(to right, 
                          var(--hearst-green) 0%, 
                          var(--hearst-green) ${orangeStart}%, 
                          #ff9800 ${orangeStart}%, 
                          #ff9800 ${redStart}%, 
                          #f44336 ${redStart}%, 
                          #f44336 ${utilizationPercent}%, 
                          rgba(255, 255, 255, 0.1) ${utilizationPercent}%, 
                          rgba(255, 255, 255, 0.1) 100%)`
                      }
                      
                      return (
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          height: '100%',
                          width: '100%',
                          background: gradientColors,
                          transition: 'background 0.5s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingLeft: 'var(--space-2)',
                          paddingRight: 'var(--space-2)',
                        }}>
                        </div>
                      )
                    })()}
                  </div>
                  
                  {/* Curseur à la position d'utilisation - en dehors du conteneur avec overflow */}
                  {(() => {
                    const utilizationPercent = (totalDebt / totalValue) * 100
                    return (
                      <div style={{
                        position: 'absolute',
                        left: `${utilizationPercent}%`,
                        top: '5px',
                        height: '40px',
                        width: '2px',
                        backgroundColor: 'white',
                        boxShadow: '0 0 4px rgba(0, 0, 0, 0.5)',
                        transform: 'translateX(-50%)',
                        zIndex: 10,
                      }}>
                        {/* Valeur affichée au-dessus du curseur */}
                        <div style={{
                          position: 'absolute',
                          top: '-28px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: 'rgba(0, 0, 0, 0.9)',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                          pointerEvents: 'none',
                        }}>
                          {utilizationPercent.toFixed(1)}%
                        </div>
                      </div>
                    )
                  })()}
                </div>
                
                {/* Légende et valeurs */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'var(--space-4)',
                  flexWrap: 'wrap',
                  gap: 'var(--space-4)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                      Total Collateral: <strong style={{ color: 'var(--text-primary)' }}>{formatValue(totalValue)}</strong>
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: 'var(--hearst-green)',
                      borderRadius: 'var(--radius-sm)',
                    }}></div>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                      Available Credit: <strong style={{ color: 'var(--hearst-green)' }}>{formatValue(totalValue - totalDebt)}</strong>
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                      Utilization: <strong style={{
                        color: parseFloat(utilizationRate) > 80 ? 'var(--hearst-green)' : parseFloat(utilizationRate) > 50 ? 'var(--hearst-green)' : parseFloat(utilizationRate) > 30 ? 'var(--hearst-green)' : 'var(--hearst-green)'
                      }}>{utilizationRate}%</strong>
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Informations générales */}
        <Card style={{ marginBottom: 'var(--space-6)' }}>
          <CardHeader>
            <CardTitle>Informations Générales</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
              <div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Nom</p>
                <p style={{ fontWeight: 600 }}>{customer.name}</p>
              </div>
              <div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Tag</p>
                <p style={{ fontWeight: 600 }}>{customer.tag || 'N/A'}</p>
              </div>
              <div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Adresse ERC20</p>
                <p style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)' }}>{customer.erc20Address}</p>
              </div>
              <div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Chaînes</p>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {chains.map((chain: string, idx: number) => (
                    <span key={idx} style={{
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      fontSize: 'var(--text-xs)',
                    }}>
                      {chain}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Protocoles</p>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {protocols.length > 0 ? protocols.map((protocol: string, idx: number) => (
                    <span key={idx} style={{
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(165, 255, 156, 0.1)',
                      color: 'var(--hearst-green)',
                      fontSize: 'var(--text-xs)',
                    }}>
                      {protocol}
                    </span>
                  )) : (
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Tous</span>
                  )}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Date de création</p>
                <p style={{ fontSize: 'var(--text-sm)' }}>
                  {new Date(customer.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Positions Collatérales */}
        <Card>
          <CardHeader>
            <CardTitle>Positions Collatérales ({positions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {positions.length === 0 ? (
              <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <p>Aucune position collatérale trouvée</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>Protocole</th>
                      <th>Chaîne</th>
                      <th>Collateral Amount</th>
                      <th>Collateral Value</th>
                      <th>Debt Token</th>
                      <th>Debt Amount</th>
                      <th>Debt Value</th>
                      <th>LTV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((position: any, idx: number) => {
                      // Utiliser les valeurs USD directement depuis DeBank si disponibles, sinon calculer
                      const collateralValue = position.collateralValueUsd !== undefined && position.collateralValueUsd !== null
                        ? position.collateralValueUsd
                        : (position.collateralAmount || 0) * (position.collateralPriceUsd || 0)
                      
                      const debtValue = position.debtValueUsd !== undefined && position.debtValueUsd !== null
                        ? position.debtValueUsd
                        : (position.debtAmount || 0) * (position.collateralPriceUsd || 0)
                      
                      const ltv = collateralValue > 0 ? ((debtValue / collateralValue) * 100).toFixed(2) : '0.00'
                      
                      return (
                        <tr key={idx}>
                          <td style={{ fontWeight: 600 }}>{position.asset || 'N/A'}</td>
                          <td>{position.protocol || 'N/A'}</td>
                          <td>{position.chain || 'N/A'}</td>
                          <td style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)' }}>
                            {position.collateralAmount ? position.collateralAmount.toLocaleString('en-US', { maximumFractionDigits: 6 }) : '0'}
                          </td>
                          <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>
                            {formatValue(collateralValue)}
                          </td>
                          <td>{position.debtToken || 'N/A'}</td>
                          <td style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)' }}>
                            {position.debtAmount ? position.debtAmount.toLocaleString('en-US', { maximumFractionDigits: 6 }) : '0'}
                          </td>
                          <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>
                            {formatValue(debtValue)}
                          </td>
                          <td style={{ color: parseFloat(ltv) > 80 ? 'var(--hearst-green)' : parseFloat(ltv) > 50 ? 'var(--hearst-green)' : parseFloat(ltv) > 30 ? 'var(--hearst-green)' : 'var(--hearst-green)', fontWeight: 600 }}>
                            {ltv}%
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

        {/* Détails par protocole */}
        {positions.length > 0 && (
          <Card style={{ marginTop: 'var(--space-6)' }}>
            <CardHeader>
              <CardTitle>Résumé par Protocole</CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const protocolSummary: Record<string, { totalCollateral: number; totalDebt: number; positions: number }> = {}
                
                positions.forEach((pos: any) => {
                  const protocol = pos.protocol || 'Unknown'
                  if (!protocolSummary[protocol]) {
                    protocolSummary[protocol] = { totalCollateral: 0, totalDebt: 0, positions: 0 }
                  }
                  // Utiliser les valeurs USD directement depuis DeBank si disponibles
                  const collateralValue = pos.collateralValueUsd !== undefined && pos.collateralValueUsd !== null
                    ? pos.collateralValueUsd
                    : (pos.collateralAmount || 0) * (pos.collateralPriceUsd || 0)
                  
                  const debtValue = pos.debtValueUsd !== undefined && pos.debtValueUsd !== null
                    ? pos.debtValueUsd
                    : (pos.debtAmount || 0) * (pos.collateralPriceUsd || 0)
                  
                  protocolSummary[protocol].totalCollateral += collateralValue
                  protocolSummary[protocol].totalDebt += debtValue
                  protocolSummary[protocol].positions += 1
                })

                return (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
                    {Object.entries(protocolSummary).map(([protocol, data]) => {
                      const protocolHealthFactor = data.totalDebt > 0 ? data.totalCollateral / data.totalDebt : 0
                      return (
                        <div key={protocol} style={{
                          padding: 'var(--space-4)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--bg-secondary)',
                        }}>
                          <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>
                            {protocol}
                          </h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: 'var(--text-secondary)' }}>Positions:</span>
                              <span style={{ fontWeight: 600 }}>{data.positions}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: 'var(--text-secondary)' }}>Collateral:</span>
                              <span style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{formatValue(data.totalCollateral)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: 'var(--text-secondary)' }}>Debt:</span>
                              <span style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{formatValue(data.totalDebt)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-2)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border)' }}>
                              <span style={{ color: 'var(--text-secondary)' }}>Health Factor:</span>
                              <span style={{ color: getHealthFactorColor(protocolHealthFactor), fontWeight: 600 }}>
                                {protocolHealthFactor > 0 ? protocolHealthFactor.toFixed(2) : '0.00'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })()}
            </CardContent>
          </Card>
        )}
      </div>

      {editingCustomer && (
        <EditCustomerModal
          isOpen={!!editingCustomer}
          onClose={() => setEditingCustomer(null)}
          onSuccess={handleEditSuccess}
          customer={editingCustomer}
        />
      )}
    </div>
  )
}

