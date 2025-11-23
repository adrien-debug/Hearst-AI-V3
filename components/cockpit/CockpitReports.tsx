'use client'

import './Cockpit.css'

export default function CockpitReports() {
  return (
    <div>
      {/* Report Cards - Dashboard Style */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div className="cockpit-card">
          <div className="cockpit-card-header">
            <h3 className="cockpit-card-title">Daily Report</h3>
          </div>
          <div className="cockpit-card-body">
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              Generate daily production and performance reports
            </p>
            <button className="cockpit-btn" style={{ width: '100%' }}>Generate</button>
          </div>
        </div>
        <div className="cockpit-card">
          <div className="cockpit-card-header">
            <h3 className="cockpit-card-title">Weekly Report</h3>
          </div>
          <div className="cockpit-card-body">
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              Weekly summary and analytics
            </p>
            <button className="cockpit-btn" style={{ width: '100%' }}>Generate</button>
          </div>
        </div>
        <div className="cockpit-card">
          <div className="cockpit-card-header">
            <h3 className="cockpit-card-title">Monthly Report</h3>
          </div>
          <div className="cockpit-card-body">
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              Comprehensive monthly analysis
            </p>
            <button className="cockpit-btn" style={{ width: '100%' }}>Generate</button>
          </div>
        </div>
      </div>

      {/* Recent Reports Table - Dashboard Style */}
      <div className="cockpit-card">
        <div className="cockpit-card-header">
          <h3 className="cockpit-card-title">Recent Reports</h3>
        </div>
        <div className="cockpit-card-body">
          <div className="cockpit-table-container">
            <table className="cockpit-table">
              <thead>
                <tr>
                  <th>Report Name</th>
                  <th>Type</th>
                  <th>Generated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: 'var(--space-8)' }}>
                    No reports generated yet
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
