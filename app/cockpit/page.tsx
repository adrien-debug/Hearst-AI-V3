'use client'

import { useState } from 'react'
import CockpitDashboard from '@/components/cockpit/CockpitDashboard'
import CockpitProduction from '@/components/cockpit/CockpitProduction'
import CockpitIncidents from '@/components/cockpit/CockpitIncidents'
import CockpitClients from '@/components/cockpit/CockpitClients'
import CockpitMiningAccounts from '@/components/cockpit/CockpitMiningAccounts'
import CockpitWorkers from '@/components/cockpit/CockpitWorkers'
import CockpitMiners from '@/components/cockpit/CockpitMiners'
import CockpitReports from '@/components/cockpit/CockpitReports'
import CockpitHosters from '@/components/cockpit/CockpitHosters'

export default function CockpitPage() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const sections = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'production', label: 'Production' },
    { id: 'incidents', label: 'Incidents' },
    { id: 'clients', label: 'Clients' },
    { id: 'mining-accounts', label: 'Mining Accounts' },
    { id: 'workers', label: 'Workers' },
    { id: 'miners', label: 'Miners' },
    { id: 'reports', label: 'Reports' },
    { id: 'hosters', label: 'Hosters' },
  ]

  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
            Cockpit
          </h1>
          
          {/* Navigation tabs */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-2)',
            flexWrap: 'wrap',
            borderBottom: '1px solid var(--border)',
            marginBottom: 'var(--space-6)',
            overflowX: 'auto',
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
                  whiteSpace: 'nowrap',
                }}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section Content */}
        {activeSection === 'dashboard' && <CockpitDashboard />}
        {activeSection === 'production' && <CockpitProduction />}
        {activeSection === 'incidents' && <CockpitIncidents />}
        {activeSection === 'clients' && <CockpitClients />}
        {activeSection === 'mining-accounts' && <CockpitMiningAccounts />}
        {activeSection === 'workers' && <CockpitWorkers />}
        {activeSection === 'miners' && <CockpitMiners />}
        {activeSection === 'reports' && <CockpitReports />}
        {activeSection === 'hosters' && <CockpitHosters />}
      </div>
    </div>
  )
}

