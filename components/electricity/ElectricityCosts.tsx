'use client'

import './Electricity.css'

export default function ElectricityCosts() {
  return (
    <div>
      {/* KPI Cards - Dashboard Style (UNIFIED STRUCTURE) */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Daily Cost</div>
          <div className="kpi-value">$0.00</div>
          <div className="kpi-description">Last 24 hours</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Cost per kWh</div>
          <div className="kpi-value">$0.000</div>
          <div className="kpi-description">Average rate</div>
        </div>
      </div>

      {/* Cost Breakdown Table - Dashboard Style */}
      <div className="electricity-card">
        <div className="electricity-card-header">
          <h3 className="electricity-card-title">Cost Breakdown</h3>
        </div>
        <div className="electricity-card-body">
          <div className="electricity-table-container">
            <table className="electricity-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Consumption (kWh)</th>
                  <th>Cost (USD)</th>
                  <th>Rate (USD/kWh)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: 'var(--space-8)' }}>
                    No cost data available
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
