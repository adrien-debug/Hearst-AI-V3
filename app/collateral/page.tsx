'use client'

import { useState } from 'react'
import CollateralOverview from '@/components/collateral/CollateralOverview'
import '@/components/collateral/Collateral.css'
import CollateralAssets from '@/components/collateral/CollateralAssets'
import CollateralLoans from '@/components/collateral/CollateralLoans'
import CollateralTransactions from '@/components/collateral/CollateralTransactions'
import CollateralAnalytics from '@/components/collateral/CollateralAnalytics'
import CollateralClients from '@/components/collateral/CollateralClients'

export default function CollateralPage() {
  const [activeSection, setActiveSection] = useState('overview')

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'clients', label: 'Clients' },
    { id: 'assets', label: 'Assets' },
    { id: 'loans', label: 'Loans' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'analytics', label: 'Analytics' },
  ]

  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>Collateral</h1>
          
          {/* Navigation tabs - Dashboard Style */}
          <nav className="collateral-nav-tabs">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`collateral-nav-tab ${activeSection === section.id ? 'active' : ''}`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Section Content */}
        {activeSection === 'overview' && <CollateralOverview />}
        {activeSection === 'clients' && <CollateralClients />}
        {activeSection === 'assets' && <CollateralAssets />}
        {activeSection === 'loans' && <CollateralLoans />}
        {activeSection === 'transactions' && <CollateralTransactions />}
        {activeSection === 'analytics' && <CollateralAnalytics />}
      </div>
    </div>
  )
}

