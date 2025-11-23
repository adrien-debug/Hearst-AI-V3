'use client'

import './Cockpit.css'

export default function CockpitMiners() {
  return (
    <div>
      {/* KPI Cards - Dashboard Style (UNIFIED STRUCTURE) */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Miners</div>
          <div className="kpi-value">124</div>
          <div className="kpi-description">Fleet size</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Online</div>
          <div className="kpi-value">118</div>
          <div className="kpi-description">Currently mining</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Offline</div>
          <div className="kpi-value" style={{ color: '#ff4d4d' }}>2</div>
          <div className="kpi-description">Requires attention</div>
        </div>
      </div>

      {/* Miners List Table - Dashboard Style */}
      <div className="cockpit-card">
        <div className="cockpit-card-header">
          <h3 className="cockpit-card-title">Miners List</h3>
        </div>
        <div className="cockpit-card-body">
          <div className="cockpit-table-container">
            <table className="cockpit-table">
              <thead>
                <tr>
                  <th>Miner ID</th>
                  <th>Model</th>
                  <th>Hashrate</th>
                  <th>Power</th>
                  <th>Temperature</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MINER-001</td>
                  <td>Antminer S21</td>
                  <td className="cockpit-value-green">98.5 TH/s</td>
                  <td>3550 W</td>
                  <td>36°C</td>
                  <td><span className="cockpit-value-green">ONLINE</span></td>
                </tr>
                <tr>
                  <td>MINER-002</td>
                  <td>Antminer S21</td>
                  <td className="cockpit-value-green">97.2 TH/s</td>
                  <td>3520 W</td>
                  <td>35°C</td>
                  <td><span className="cockpit-value-green">ONLINE</span></td>
                </tr>
                <tr>
                  <td>MINER-003</td>
                  <td>Antminer S19 Pro</td>
                  <td className="cockpit-value-green">110.0 TH/s</td>
                  <td>3250 W</td>
                  <td>38°C</td>
                  <td><span className="cockpit-value-green">ONLINE</span></td>
                </tr>
                <tr>
                  <td>MINER-004</td>
                  <td>Antminer S19</td>
                  <td className="cockpit-value-green">95.0 TH/s</td>
                  <td>3250 W</td>
                  <td>42°C</td>
                  <td><span style={{ color: '#FFA500' }}>DEGRADED</span></td>
                </tr>
                <tr>
                  <td>MINER-005</td>
                  <td>Antminer S19</td>
                  <td>0 TH/s</td>
                  <td>0 W</td>
                  <td>-</td>
                  <td><span style={{ color: '#ff4d4d' }}>OFFLINE</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
