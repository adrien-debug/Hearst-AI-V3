'use client'

import './Cockpit.css'

export default function CockpitHealth() {
  return (
    <div>
      {/* KPI Cards - Dashboard Style (UNIFIED STRUCTURE) */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">System Health</div>
          <div className="kpi-value">Healthy</div>
          <div className="kpi-description">All systems operational</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Uptime</div>
          <div className="kpi-value">99.9%</div>
          <div className="kpi-description">Last 30 days</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active Alerts</div>
          <div className="kpi-value">0</div>
          <div className="kpi-description">No critical issues</div>
        </div>
      </div>

      {/* Health Monitoring Table - Dashboard Style */}
      <div className="cockpit-card">
        <div className="cockpit-card-header">
          <h3 className="cockpit-card-title">Health Monitoring</h3>
        </div>
        <div className="cockpit-card-body">
          <div className="cockpit-table-container">
            <table className="cockpit-table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Status</th>
                  <th>Last Check</th>
                  <th>Response Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>API Server</strong></td>
                  <td><span className="cockpit-value-green">Online</span></td>
                  <td>Just now</td>
                  <td>12ms</td>
                </tr>
                <tr>
                  <td><strong>Database</strong></td>
                  <td><span className="cockpit-value-green">Connected</span></td>
                  <td>Just now</td>
                  <td>5ms</td>
                </tr>
                <tr>
                  <td><strong>Cache</strong></td>
                  <td><span className="cockpit-value-green">Active</span></td>
                  <td>Just now</td>
                  <td>2ms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
