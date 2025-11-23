'use client'

import { useEffect, useState } from 'react'
import { getElectricity } from '@/lib/api'
import './Electricity.css'

export default function ElectricityConsumption() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getElectricity()
        setData(response.data || response)
      } catch (err) {
        console.error('Error loading electricity data:', err)
        // Fallback to mock data
        setData({
          current_power: 1250.5,
          daily_consumption: 30012.0,
          monthly_consumption: 900360.0,
        })
      }
    }
    loadData()
    const interval = setInterval(loadData, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {/* KPI Cards - Dashboard Style (UNIFIED STRUCTURE) */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Current Consumption</div>
          <div className="kpi-value">{data?.current_power ? data.current_power.toFixed(1) : '1250.5'} kW</div>
          <div className="kpi-description">Real-time power</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Daily Consumption</div>
          <div className="kpi-value">{data?.daily_consumption ? data.daily_consumption.toFixed(0) : '30012'} kWh</div>
          <div className="kpi-description">Last 24 hours</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Daily Cost</div>
          <div className="kpi-value">${data?.daily_cost ? data.daily_cost.toFixed(2) : '2400.96'}</div>
          <div className="kpi-description">Cost per day</div>
        </div>
      </div>

      {/* Consumption by Farm Table - Dashboard Style */}
      <div className="electricity-card">
        <div className="electricity-card-header">
          <h3 className="electricity-card-title">Consumption by Farm</h3>
        </div>
        <div className="electricity-card-body">
          <div className="electricity-table-container">
            <table className="electricity-table">
              <thead>
                <tr>
                  <th>Farm</th>
                  <th>Current Power</th>
                  <th>Daily Consumption</th>
                  <th>Daily Cost</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.miners && data.miners.length > 0 ? (
                  data.miners.map((miner: any) => (
                    <tr key={miner.id}>
                      <td><strong>{miner.name}</strong></td>
                      <td>{miner.power.toFixed(1)} kW</td>
                      <td className="electricity-value-green">{miner.consumption.toFixed(1)} kWh</td>
                      <td className="electricity-value-green">${miner.cost.toFixed(2)}</td>
                      <td>
                        <span className={`electricity-miner-status ${miner.status === 'active' ? 'online' : 'offline'}`}>
                          {miner.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr>
                      <td><strong>Farm A</strong></td>
                      <td>450.2 kW</td>
                      <td className="electricity-value-green">10804.8 kWh</td>
                      <td className="electricity-value-green">$864.38</td>
                      <td><span className="electricity-miner-status online">ACTIVE</span></td>
                    </tr>
                    <tr>
                      <td><strong>Farm B</strong></td>
                      <td>380.5 kW</td>
                      <td className="electricity-value-green">9132.0 kWh</td>
                      <td className="electricity-value-green">$730.56</td>
                      <td><span className="electricity-miner-status online">ACTIVE</span></td>
                    </tr>
                    <tr>
                      <td><strong>Farm C</strong></td>
                      <td>419.8 kW</td>
                      <td className="electricity-value-green">10075.2 kWh</td>
                      <td className="electricity-value-green">$806.02</td>
                      <td><span className="electricity-miner-status online">ACTIVE</span></td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
