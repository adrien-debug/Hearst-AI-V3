'use client'

import './electricity/Electricity.css'

interface ElectricityData {
  current_power?: number
  daily_consumption?: number
  monthly_consumption?: number
  daily_cost?: number
  monthly_cost?: number
  cost_per_kwh?: number
  miners?: Array<{
    name: string
    status: string
    hashrate: string
    power: number
    temp: number
  }>
  timestamp?: string
}

interface ElectricityViewProps {
  data?: ElectricityData | null
}

export default function ElectricityView({ data }: ElectricityViewProps) {
  const refreshData = () => {
    window.location.reload()
  }

  return (
    <div>
      {/* KPI Cards - Dashboard Style (UNIFIED STRUCTURE) */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Current Power</div>
          <div className="kpi-value">{data?.current_power?.toLocaleString() || '0'} W</div>
          <div className="kpi-description">Real-time power consumption</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Daily Consumption</div>
          <div className="kpi-value">{data?.daily_consumption?.toFixed(1) || '0'} kWh</div>
          <div className="kpi-description">Last 24 hours</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Daily Cost</div>
          <div className="kpi-value">${data?.daily_cost?.toFixed(2) || '0.00'}</div>
          <div className="kpi-description">Last 24 hours</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Cost per kWh</div>
          <div className="kpi-value">${data?.cost_per_kwh?.toFixed(3) || '0.000'}</div>
          <div className="kpi-description">Average rate</div>
        </div>
      </div>

      {/* Active Miners Section - Dashboard Style */}
      {data?.miners && data.miners.length > 0 && (
        <div className="electricity-card">
          <div className="electricity-card-header">
            <h3 className="electricity-card-title">Active Miners</h3>
          </div>
          <div className="electricity-card-body">
            <div className="electricity-miner-grid">
              {data.miners.map((miner: any, index: number) => (
                <div key={index} className="electricity-miner-card">
                  <div className="electricity-miner-header">
                    <div className="electricity-miner-name">{miner.name}</div>
                    <div className={`electricity-miner-status ${miner.status === 'online' ? 'online' : 'offline'}`}>
                      {miner.status}
                    </div>
                  </div>
                  <div className="electricity-miner-metrics">
                    <div>
                      <div className="electricity-miner-metric-label">Hashrate</div>
                      <div className="electricity-miner-metric-value">{miner.hashrate}</div>
                    </div>
                    <div>
                      <div className="electricity-miner-metric-label">Power</div>
                      <div className="electricity-miner-metric-value">{miner.power}W</div>
                    </div>
                    <div>
                      <div className="electricity-miner-metric-label">Temperature</div>
                      <div className="electricity-miner-metric-value">{miner.temp}°C</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Refresh Button and Last Update - Dashboard Style */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-6)' }}>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          Last update: {data?.timestamp ? new Date(data.timestamp).toLocaleString() : 'Never'}
        </div>
        <button className="electricity-btn" onClick={refreshData}>
          🔄 Refresh Data
        </button>
      </div>
    </div>
  )
}
