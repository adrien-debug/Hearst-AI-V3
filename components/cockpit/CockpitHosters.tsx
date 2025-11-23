'use client'

import './Cockpit.css'

export default function CockpitHosters() {
  return (
    <div>
      {/* KPI Cards - Dashboard Style (UNIFIED STRUCTURE) */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Providers</div>
          <div className="kpi-value">0</div>
          <div className="kpi-description">Active providers</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Capacity</div>
          <div className="kpi-value">0 MW</div>
          <div className="kpi-description">Combined capacity</div>
        </div>
      </div>

      {/* Hosting Providers Table - Dashboard Style */}
      <div className="cockpit-card">
        <div className="cockpit-card-header">
          <h3 className="cockpit-card-title">Hosting Providers</h3>
        </div>
        <div className="cockpit-card-body">
          <div className="cockpit-table-container">
            <table className="cockpit-table">
              <thead>
                <tr>
                  <th>Provider Name</th>
                  <th>Location</th>
                  <th>Capacity</th>
                  <th>Miners</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: 'var(--space-8)' }}>
                    No hosting providers configured yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
