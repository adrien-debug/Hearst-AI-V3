'use client'

import { useState } from 'react'

interface MenuSection {
  id: string
  label: string
  icon?: string
  items?: MenuItem[]
}

interface MenuItem {
  id: string
  label: string
  icon?: string
}

interface CockpitSidebarProps {
  activeSection: string
  onSectionChange: (sectionId: string) => void
}

const menuStructure: MenuSection[] = [
  {
    id: 'overview',
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'operations', label: 'Operations' },
      { id: 'production', label: 'Production' },
      { id: 'energy-costs', label: 'Energy & Costs' },
      { id: 'incidents', label: 'Incidents & SLA' },
    ],
  },
  {
    id: 'management',
    label: 'Management',
    items: [
      { id: 'clients', label: 'Clients' },
      { id: 'mining-accounts', label: 'Customer Batch' },
      { id: 'workers', label: 'Miners Activity' },
      { id: 'miners', label: 'Miners Profiles' },
      { id: 'reports', label: 'Reports' },
      { id: 'hosters', label: 'Hosting Providers' },
    ],
  },
]

export default function CockpitSidebar({ activeSection, onSectionChange }: CockpitSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['overview', 'management'])

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    )
  }

  return (
    <aside
      style={{
        width: '280px',
        minHeight: '100vh',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)',
        padding: 'var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
        zIndex: 100,
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h2
          style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-2)',
          }}
        >
          Mining Operations
        </h2>
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
          }}
        >
          Navigation
        </p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {menuStructure.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => toggleGroup(section.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--space-3) var(--space-4)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                transition: 'color var(--duration-fast) var(--ease-in-out)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--hearst-green)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              <span>{section.label}</span>
              <span
                style={{
                  transform: expandedGroups.includes(section.id) ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform var(--duration-fast) var(--ease-in-out)',
                  fontSize: 'var(--text-xs)',
                }}
              >
                ▼
              </span>
            </button>

            {expandedGroups.includes(section.id) && section.items && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-1)',
                  marginLeft: 'var(--space-2)',
                  marginTop: 'var(--space-2)',
                }}
              >
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: 'var(--space-2) var(--space-4)',
                      background: activeSection === item.id ? '#A7FB90' : 'transparent',
                      border: 'none',
                      borderLeft:
                        activeSection === item.id ? '3px solid var(--hearst-green)' : '3px solid transparent',
                      color: activeSection === item.id ? 'var(--hearst-green)' : 'var(--text-primary)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: activeSection === item.id ? 600 : 400,
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'all var(--duration-fast) var(--ease-in-out)',
                    }}
                    onMouseEnter={(e) => {
                      if (activeSection !== item.id) {
                        e.currentTarget.style.background = 'rgba(167, 251, 144, 0.1)'
                        e.currentTarget.style.color = 'var(--hearst-green)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSection !== item.id) {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = 'var(--text-primary)'
                      }
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}

