'use client'

export default function HomeStatistics() {
  return (
    <div>
      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Revenue</div>
          <div className="kpi-value" style={{ color: '#C5FFA7' }}>$125,432.89</div>
          <div className="kpi-description">Last 30 days</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active Jobs</div>
          <div className="kpi-value">234</div>
          <div className="kpi-description">Currently running</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Success Rate</div>
          <div className="kpi-value" style={{ color: '#C5FFA7' }}>98.5%</div>
          <div className="kpi-description">Last 30 days</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Average Runtime</div>
          <div className="kpi-value">4.2h</div>
          <div className="kpi-description">Per job</div>
        </div>
      </div>

      {/* Statistics Table */}
      <div className="home-card">
        <div className="home-card-header">
          <div className="home-card-title">Detailed Statistics</div>
          <button className="home-btn-secondary">Export CSV</button>
        </div>
        <div className="home-table-container">
          <table className="home-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
                <th>Change</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 'var(--font-semibold)' }}>Total Projects</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>12</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>+2.5%</td>
                <td><span className="home-badge home-badge-success">↑ Up</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'var(--font-semibold)' }}>Total Jobs</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>234</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>+12.3%</td>
                <td><span className="home-badge home-badge-success">↑ Up</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'var(--font-semibold)' }}>Success Rate</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>98.5%</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>+0.5%</td>
                <td><span className="home-badge home-badge-success">↑ Up</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'var(--font-semibold)' }}>Average Runtime</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>4.2h</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-0.3h</td>
                <td><span className="home-badge home-badge-success">↑ Up</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

