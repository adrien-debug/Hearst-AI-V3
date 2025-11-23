'use client'

import './Cockpit.css'

export default function CockpitClients() {
  return (
    <div>
      {/* KPI Cards - Dashboard Style (UNIFIED STRUCTURE) */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Clients</div>
          <div className="kpi-value">0</div>
          <div className="kpi-description">Active clients</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active Contracts</div>
          <div className="kpi-value">0</div>
          <div className="kpi-description">Current contracts</div>
        </div>
      </div>

      {/* Clients List Table - Dashboard Style */}
      <div className="cockpit-card">
        <div className="cockpit-card-header">
          <h3 className="cockpit-card-title">Clients List</h3>
        </div>
        <div className="cockpit-card-body">
          <div className="cockpit-table-container">
            <table className="cockpit-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Contracts</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: 'var(--space-8)' }}>
                    No clients yet. Add your first client!
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
