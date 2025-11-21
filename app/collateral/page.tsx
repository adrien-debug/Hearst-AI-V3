'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CollateralOverview from '@/components/collateral/CollateralOverview'
import CollateralAssets from '@/components/collateral/CollateralAssets'
import CollateralLoans from '@/components/collateral/CollateralLoans'
import CollateralTransactions from '@/components/collateral/CollateralTransactions'
import CollateralAnalytics from '@/components/collateral/CollateralAnalytics'
import CollateralCustomers from '@/components/collateral/CollateralCustomers'
import AddCustomerModal from '@/components/collateral/AddCustomerModal'

function CollateralPageContent() {
  const searchParams = useSearchParams()
  const [activeSection, setActiveSection] = useState('overview')
  const [showAddModal, setShowAddModal] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    // Vérifier si un paramètre section est présent dans l'URL
    const section = searchParams?.get('section')
    if (section && ['overview', 'customers', 'assets', 'loans', 'transactions', 'analytics'].includes(section)) {
      setActiveSection(section)
    }
  }, [searchParams])

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'customers', label: 'Clients' },
    { id: 'assets', label: 'Assets' },
    { id: 'loans', label: 'Loans' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'analytics', label: 'Analytics' },
  ]

  const handleCustomerAdded = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>
              Collateral Management
            </h1>
            <Button
              onClick={() => setShowAddModal(true)}
              variant="default"
              size="default"
              style={{
                backgroundColor: 'var(--hearst-green)',
                color: '#000000',
                padding: 'var(--space-2) var(--space-4)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: 'var(--text-base)',
                fontWeight: 500,
              }}
            >
              + Ajouter Customer
            </Button>
          </div>
          
          {/* Navigation tabs */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-2)',
            borderBottom: '1px solid var(--border)',
            marginBottom: 'var(--space-6)',
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
                }}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

            {/* Section Content */}
            {activeSection === 'overview' && <CollateralOverview refreshKey={refreshKey} />}
        {activeSection === 'customers' && <CollateralCustomers key={refreshKey} />}
        {activeSection === 'assets' && <CollateralAssets key={refreshKey} />}
        {activeSection === 'loans' && <CollateralLoans key={refreshKey} />}
        {activeSection === 'transactions' && <CollateralTransactions key={refreshKey} />}
        {activeSection === 'analytics' && <CollateralAnalytics key={refreshKey} />}
      </div>

      <AddCustomerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleCustomerAdded}
      />
    </div>
  )
}

export default function CollateralPage() {
  return (
    <Suspense fallback={<div style={{ padding: 'var(--space-6)', textAlign: 'center' }}>Chargement...</div>}>
      <CollateralPageContent />
    </Suspense>
  )
}

