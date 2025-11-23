'use client'

import './Cockpit.css'

export default function CockpitMiningAccounts() {
  return (
    <div>
      {/* Mining Accounts Summary Table - Dashboard Style */}
      <div className="cockpit-card">
        <div className="cockpit-card-header">
          <h3 className="cockpit-card-title">Mining Accounts Summary</h3>
        </div>
        <div className="cockpit-card-body">
          <div className="cockpit-table-container">
            <table className="cockpit-table">
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Miner Type</th>
                  <th>Real-time Hashrate</th>
                  <th>Last 24h</th>
                  <th>Active Miners</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: 'var(--space-8)' }}>
                    No mining accounts configured yet
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
