'use client'

import './Electricity.css'

export default function ElectricityAnalytics() {
  return (
    <div>
      {/* Analytics Cards - Dashboard Style */}
      <div className="electricity-kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div className="electricity-card">
          <div className="electricity-card-header">
            <h3 className="electricity-card-title">Consumption Trend</h3>
          </div>
          <div className="electricity-card-body">
            <div style={{ 
              padding: 'var(--space-8)', 
              background: 'rgba(255, 255, 255, 0.02)', 
              borderRadius: 'var(--radius-md)', 
              minHeight: '250px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <p style={{ color: 'var(--text-secondary)' }}>Trend chart will be displayed here</p>
            </div>
          </div>
        </div>
        <div className="electricity-card">
          <div className="electricity-card-header">
            <h3 className="electricity-card-title">Cost Analysis</h3>
          </div>
          <div className="electricity-card-body">
            <div style={{ 
              padding: 'var(--space-8)', 
              background: 'rgba(255, 255, 255, 0.02)', 
              borderRadius: 'var(--radius-md)', 
              minHeight: '250px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <p style={{ color: 'var(--text-secondary)' }}>Cost analysis chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Efficiency Metrics - Dashboard Style */}
      <div className="electricity-card">
        <div className="electricity-card-header">
          <h3 className="electricity-card-title">Efficiency Metrics</h3>
        </div>
        <div className="electricity-card-body">
          <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div className="kpi-card">
              <div className="kpi-label">Average Efficiency</div>
              <div className="kpi-value">0 J/TH</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Power Factor</div>
              <div className="kpi-value">0.00</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Peak Demand</div>
              <div className="kpi-value">0 kW</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
