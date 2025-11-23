'use client'

import { useState } from 'react'
import HomeOverview from '@/components/home/HomeOverview'
import HomeStatistics from '@/components/home/HomeStatistics'
import HomeAnalytics from '@/components/home/HomeAnalytics'
import HomePerformance from '@/components/home/HomePerformance'
import HomeActivity from '@/components/home/HomeActivity'
import HomeReports from '@/components/home/HomeReports'
import '@/components/home/Home.css'

export default function Home() {
  const [activeSection, setActiveSection] = useState('overview')

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'statistics', label: 'Statistics' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'performance', label: 'Performance' },
    { id: 'activity', label: 'Recent Activity' },
    { id: 'reports', label: 'Reports' },
  ]

  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700 }}>Home</h1>
          <nav className="home-nav-tabs">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`home-nav-tab ${activeSection === section.id ? 'active' : ''}`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {activeSection === 'overview' && <HomeOverview />}
        {activeSection === 'statistics' && <HomeStatistics />}
        {activeSection === 'analytics' && <HomeAnalytics />}
        {activeSection === 'performance' && <HomePerformance />}
        {activeSection === 'activity' && <HomeActivity />}
        {activeSection === 'reports' && <HomeReports />}
      </div>
    </div>
  )
}




