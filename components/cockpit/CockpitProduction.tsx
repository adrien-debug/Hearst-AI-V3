'use client'

import './Cockpit.css'

export default function CockpitProduction() {
  return (
    <div>
      {/* KPI Cards - Dashboard Style (UNIFIED STRUCTURE) */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Daily Production</div>
          <div className="kpi-value">0 BTC</div>
          <div className="kpi-description">Last 24 hours</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Monthly Production</div>
          <div className="kpi-value">0 BTC</div>
          <div className="kpi-description">Current month</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Efficiency</div>
          <div className="kpi-value">0%</div>
          <div className="kpi-description">Average efficiency</div>
        </div>
      </div>

      {/* Production History - Dashboard Style */}
      <div className="cockpit-card">
        <div className="cockpit-card-header">
          <h3 className="cockpit-card-title">Production History</h3>
        </div>
        <div className="cockpit-card-body">
          <div style={{ 
            padding: 'var(--space-8)', 
            background: 'rgba(255, 255, 255, 0.02)', 
            borderRadius: 'var(--radius-md)', 
            textAlign: 'center',
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <p style={{ color: 'var(--text-secondary)' }}>Production charts will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
