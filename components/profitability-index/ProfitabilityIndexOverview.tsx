'use client'

export default function ProfitabilityIndexOverview() {
  return (
    <div>
      {/* Main KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Overall Profitability Index</div>
          <div className="kpi-value">87.5%</div>
          <div className="kpi-description">Excellent performance</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">ROI</div>
          <div className="kpi-value">245%</div>
          <div className="kpi-description">Return on investment</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Profit</div>
          <div className="kpi-value" style={{ fontSize: 'var(--text-3xl)' }}>+$1,247,890</div>
          <div className="kpi-description">All time profit</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Break-even Period</div>
          <div className="kpi-value" style={{ fontSize: 'var(--text-2xl)' }}>8 months</div>
          <div className="kpi-description">Time to break-even</div>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="profitability-grid-2">
        <div className="profitability-card">
          <div className="profitability-card-header">
            <div className="profitability-card-title">Key Performance Indicators</div>
          </div>
          <div className="profitability-card-body">
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Revenue Efficiency</span>
                <span style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-bold)' }}>92.3%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '92.3%', background: '#C5FFA7', borderRadius: 'var(--radius-full)' }}></div>
              </div>
            </div>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Cost Efficiency</span>
                <span style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-bold)' }}>85.7%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '85.7%', background: '#C5FFA7', borderRadius: 'var(--radius-full)' }}></div>
              </div>
            </div>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Market Performance</span>
                <span style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-bold)' }}>78.9%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '78.9%', background: '#C5FFA7', borderRadius: 'var(--radius-full)' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Risk Score</span>
                <span style={{ color: '#FFA500', fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-bold)' }}>Medium</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '60%', background: '#FFA500', borderRadius: 'var(--radius-full)' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="profitability-card">
          <div className="profitability-card-header">
            <div className="profitability-card-title">Performance Trends</div>
          </div>
          <div className="profitability-card-body">
            <div className="profitability-chart-placeholder">
              Chart: Profitability Index over time<br />
              (Chart.js integration would go here)
            </div>
          </div>
        </div>
      </div>

      {/* Batches Summary */}
      <div className="profitability-card">
        <div className="profitability-card-header">
          <div className="profitability-card-title">Batches Summary</div>
          <button className="profitability-btn">Export CSV</button>
        </div>
        <div className="profitability-table-container">
          <table className="profitability-table">
            <thead>
              <tr>
                <th>Batch Number</th>
                <th>Model</th>
                <th>Quantity</th>
                <th>Hashrate</th>
                <th>Daily Revenue</th>
                <th>Daily Cost</th>
                <th>Daily Profit</th>
                <th>Profitability</th>
                <th>ROI Days</th>
                <th>Status</th>
                <th>Hoster</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>01</td>
                <td>Antminer S19 XP</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>5</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>0.70 PH/s</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>$36.54</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>$0.00</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)' }}>-$114.46</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-75.8%</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-1 days</td>
                <td><span className="profitability-badge profitability-badge-error">UNPROFITABLE</span></td>
                <td>DataCenter USA</td>
                <td>
                  <button className="profitability-btn-secondary" style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-3)' }}>View</button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>02</td>
                <td>Antminer S19 Pro</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>10</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>1.10 PH/s</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>$57.42</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>$0.00</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)' }}>-$248.74</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-81.2%</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-1 days</td>
                <td><span className="profitability-badge profitability-badge-error">UNPROFITABLE</span></td>
                <td>DataCenter USA</td>
                <td>
                  <button className="profitability-btn-secondary" style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-3)' }}>View</button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>03</td>
                <td>Whatsminer M50S</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>8</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>1.01 PH/s</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>$52.62</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>$0.00</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)' }}>-$247.68</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-82.5%</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-1 days</td>
                <td><span className="profitability-badge profitability-badge-error">UNPROFITABLE</span></td>
                <td>Mining Farm EU</td>
                <td>
                  <button className="profitability-btn-secondary" style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-3)' }}>View</button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>04</td>
                <td>Antminer S19j Pro</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>12</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>1.25 PH/s</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>$65.15</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>$0.00</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)' }}>-$298.47</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-82.1%</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-1 days</td>
                <td><span className="profitability-badge profitability-badge-error">UNPROFITABLE</span></td>
                <td>DataCenter USA</td>
                <td>
                  <button className="profitability-btn-secondary" style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-3)' }}>View</button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>05</td>
                <td>Antminer S17+</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>15</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>1.09 PH/s</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>$57.16</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>$0.00</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)' }}>-$455.34</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-88.8%</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-1 days</td>
                <td><span className="profitability-badge profitability-badge-error">UNPROFITABLE</span></td>
                <td>Cloud Mining Asia</td>
                <td>
                  <button className="profitability-btn-secondary" style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-3)' }}>View</button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>06</td>
                <td>Antminer S9</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>20</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>0.26 PH/s</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>$13.57</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>$0.00</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)' }}>-$646.62</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-97.9%</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-1 days</td>
                <td><span className="profitability-badge profitability-badge-error">UNPROFITABLE</span></td>
                <td>Mining Farm EU</td>
                <td>
                  <button className="profitability-btn-secondary" style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-3)' }}>View</button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>07</td>
                <td>Antminer S9i</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>25</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>0.33 PH/s</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>$16.97</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>$0.00</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)' }}>-$808.27</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-97.9%</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-1 days</td>
                <td><span className="profitability-badge profitability-badge-error">UNPROFITABLE</span></td>
                <td>Mining Farm EU</td>
                <td>
                  <button className="profitability-btn-secondary" style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-3)' }}>View</button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>08</td>
                <td>Whatsminer M20S</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>18</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>1.22 PH/s</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>$63.90</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>$0.00</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)' }}>-$490.61</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-88.5%</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-1 days</td>
                <td><span className="profitability-badge profitability-badge-error">UNPROFITABLE</span></td>
                <td>DataCenter USA</td>
                <td>
                  <button className="profitability-btn-secondary" style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-3)' }}>View</button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>09</td>
                <td>Antminer S15</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>22</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>0.62 PH/s</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>$32.16</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>$0.00</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)' }}>-$658.00</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-95.3%</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-1 days</td>
                <td><span className="profitability-badge profitability-badge-error">UNPROFITABLE</span></td>
                <td>Cloud Mining Asia</td>
                <td>
                  <button className="profitability-btn-secondary" style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-3)' }}>View</button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>10</td>
                <td>Antminer S7</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>30</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>0.14 PH/s</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>$7.05</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>$0.00</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)' }}>-$981.39</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-99.3%</td>
                <td style={{ color: '#FF4D4D', fontFamily: 'var(--font-mono)' }}>-1 days</td>
                <td><span className="profitability-badge profitability-badge-error">UNPROFITABLE</span></td>
                <td>-</td>
                <td>
                  <button className="profitability-btn-secondary" style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-3)' }}>View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="profitability-card">
        <div className="profitability-card-header">
          <div className="profitability-card-title">Financial Summary</div>
          <button className="profitability-btn-secondary">View Details</button>
        </div>
        <div className="profitability-table-container">
          <table className="profitability-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Revenue</th>
                <th>Costs</th>
                <th>Profit</th>
                <th>Profit Margin</th>
                <th>ROI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Last 30 days</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>$245,890</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>$156,234</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)' }}>+$89,656</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>36.5%</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>57.4%</td>
              </tr>
              <tr>
                <td>Last 90 days</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>$712,450</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>$468,789</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)' }}>+$243,661</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>34.2%</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>52.0%</td>
              </tr>
              <tr>
                <td>Last 12 months</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>$2,847,230</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>$1,599,340</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-semibold)' }}>+$1,247,890</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>43.8%</td>
                <td style={{ color: '#C5FFA7', fontFamily: 'var(--font-mono)' }}>245.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

