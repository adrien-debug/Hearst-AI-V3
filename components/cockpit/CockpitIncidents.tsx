'use client'

import './Cockpit.css'

export default function CockpitIncidents() {
  return (
    <div>
      {/* KPI Cards - Dashboard Style (UNIFIED STRUCTURE) */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Open Incidents</div>
          <div className="kpi-value">0</div>
          <div className="kpi-description">Active incidents</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Resolved (24h)</div>
          <div className="kpi-value">0</div>
          <div className="kpi-description">Last 24 hours</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Average Resolution</div>
          <div className="kpi-value">0h</div>
          <div className="kpi-description">Mean time to resolve</div>
        </div>
      </div>

      {/* Recent Incidents Table - Dashboard Style */}
      <div className="cockpit-card">
        <div className="cockpit-card-header">
          <h3 className="cockpit-card-title">Recent Incidents</h3>
        </div>
        <div className="cockpit-card-body">
          <div className="cockpit-table-container">
            <table className="cockpit-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Resolved</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: 'var(--space-8)' }}>
                    No incidents recorded
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
