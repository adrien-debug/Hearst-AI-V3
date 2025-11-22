'use client'

import { useState } from 'react'
import CockpitDashboard from '@/components/cockpit/CockpitDashboard'
import CockpitOperations from '@/components/cockpit/CockpitOperations'
import CockpitProduction from '@/components/cockpit/CockpitProduction'
import CockpitIncidents from '@/components/cockpit/CockpitIncidents'
import CockpitClients from '@/components/cockpit/CockpitClients'
import CockpitMiningAccounts from '@/components/cockpit/CockpitMiningAccounts'
import CockpitWorkers from '@/components/cockpit/CockpitWorkers'

const sections = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'operations', label: 'Operations' },
  { id: 'production', label: 'Production' },
  { id: 'incidents', label: 'Incidents & SLA' },
  { id: 'clients', label: 'Clients' },
  { id: 'mining-accounts', label: 'Customer Batch' },
  { id: 'workers', label: 'Miners Activity' },
]

export default function CockpitPage() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <CockpitDashboard />
      case 'operations':
        return <CockpitOperations />
      case 'production':
        return <CockpitProduction />
      case 'incidents':
        return <CockpitIncidents />
      case 'clients':
        return <CockpitClients />
      case 'mining-accounts':
        return <CockpitMiningAccounts />
      case 'workers':
        return <CockpitWorkers />
      default:
        return <CockpitDashboard />
    }
  }

  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        <div style={{ marginBottom: '10px' }}>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
            Cockpit
          </h1>
          
          {/* Navigation tabs */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-3)', /* 8px gap */
            flexWrap: 'wrap',
            borderBottom: '1px solid var(--border)',
            marginBottom: '10px',
            overflowX: 'auto',
          }}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  padding: 'var(--space-3) var(--space-5)', /* 8px 16px */
                  background: activeSection === section.id ? 'var(--bg-overlay-10)' : 'transparent', /* rgba(255, 255, 255, 0.1) when active */
                  border: 'none',
                  borderBottom: activeSection === section.id ? '2px solid var(--hearst-green)' : '2px solid transparent',
                  borderRadius: activeSection === section.id ? 'var(--radius-sm) var(--radius-sm) 0 0' : '0',
                  color: activeSection === section.id ? 'var(--text-primary)' : 'var(--text-secondary)',
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

        {/* Section Content */}
        {renderSection()}
      </div>
    </div>
  )
}

