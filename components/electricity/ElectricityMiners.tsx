'use client'

import './Electricity.css'

export default function ElectricityMiners() {
  return (
    <div>
      {/* Miner Power Consumption Table - Dashboard Style */}
      <div className="electricity-card">
        <div className="electricity-card-header">
          <h3 className="electricity-card-title">Miner Power Consumption</h3>
        </div>
        <div className="electricity-card-body">
          <div className="electricity-table-container">
            <table className="electricity-table">
              <thead>
                <tr>
                  <th>Miner ID</th>
                  <th>Model</th>
                  <th>Power (W)</th>
                  <th>Hashrate</th>
                  <th>Efficiency (J/TH)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MINER-001</td>
                  <td>Antminer S21</td>
                  <td className="electricity-value-green">3550 W</td>
                  <td className="electricity-value-green">98.5 TH/s</td>
                  <td>36.0 J/TH</td>
                  <td><span className="electricity-miner-status online">ACTIVE</span></td>
                </tr>
                <tr>
                  <td>MINER-002</td>
                  <td>Antminer S21</td>
                  <td className="electricity-value-green">3520 W</td>
                  <td className="electricity-value-green">97.2 TH/s</td>
                  <td>36.2 J/TH</td>
                  <td><span className="electricity-miner-status online">ACTIVE</span></td>
                </tr>
                <tr>
                  <td>MINER-003</td>
                  <td>Antminer S19 Pro</td>
                  <td className="electricity-value-green">3250 W</td>
                  <td className="electricity-value-green">110.0 TH/s</td>
                  <td>29.5 J/TH</td>
                  <td><span className="electricity-miner-status online">ACTIVE</span></td>
                </tr>
                <tr>
                  <td>MINER-004</td>
                  <td>Antminer S19</td>
                  <td className="electricity-value-green">3250 W</td>
                  <td className="electricity-value-green">95.0 TH/s</td>
                  <td>34.2 J/TH</td>
                  <td><span className="electricity-miner-status degraded">DEGRADED</span></td>
                </tr>
                <tr>
                  <td>MINER-005</td>
                  <td>Antminer S19</td>
                  <td>0 W</td>
                  <td>0 TH/s</td>
                  <td>-</td>
                  <td><span className="electricity-miner-status offline">OFFLINE</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
