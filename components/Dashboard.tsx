'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

// Dynamically import Chart.js components to avoid SSR issues
const LineChart = dynamic(
  () => import('react-chartjs-2').then((mod) => ({ default: mod.Line })),
  { 
    ssr: false,
    loading: () => <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Loading chart...</div>
  }
)

const BarChart = dynamic(
  () => import('react-chartjs-2').then((mod) => ({ default: mod.Bar })),
  { 
    ssr: false,
    loading: () => <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Loading chart...</div>
  }
)

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface DashboardProps {
  data?: {
    total_projects?: number
    total_versions?: number
    total_jobs?: number
    jobs_running?: number
    jobs_success_rate?: number
    last_7_days_jobs?: number
    total_storage_mb?: number
  }
}

export default function Dashboard({ data }: DashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'monthly' | 'yearly'>('daily')

  useEffect(() => {
    // Load icons
    const loadIcons = () => {
      if (typeof window !== 'undefined' && (window as any).Icons) {
        document.querySelectorAll('[data-icon]').forEach(el => {
          const iconName = el.getAttribute('data-icon')
          if (iconName) {
            const iconSvg = (window as any).Icons[iconName]
            if (iconSvg) {
              el.innerHTML = iconSvg
            }
          }
        })
      }
    }
    
    loadIcons()
    // Retry after a short delay in case icons aren't loaded yet
    const timeout = setTimeout(loadIcons, 500)
    return () => clearTimeout(timeout)
  }, [])

  // Daily data (last 7 days)
  const dailyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'BTC Mined',
        data: [0.082156, 0.081234, 0.080521, 0.081892, 0.082156, 0.083247, 0.084521],
        borderColor: '#a5ff9c',
        backgroundColor: 'rgba(165, 255, 156, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Monthly data (last 12 months)
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'BTC Mined',
        data: [2.1, 2.3, 2.2, 2.4, 2.5, 2.3, 2.6, 2.4, 2.5, 2.6, 2.5, 2.536588],
        borderColor: '#a5ff9c',
        backgroundColor: 'rgba(165, 255, 156, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Yearly data (last 5 years)
  const yearlyData = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'BTC Mined',
        data: [25.2, 27.8, 28.5, 29.1, 30.439056],
        borderColor: '#a5ff9c',
        backgroundColor: 'rgba(165, 255, 156, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const chartData1 = selectedPeriod === 'daily' ? dailyData : selectedPeriod === 'monthly' ? monthlyData : yearlyData

  const getBarChartData = () => {
    const labels = selectedPeriod === 'daily' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : selectedPeriod === 'monthly'
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      : ['2020', '2021', '2022', '2023', '2024']
    
    const data = selectedPeriod === 'daily'
      ? [0.082156, 0.081234, 0.080521, 0.081892, 0.082156, 0.083247, 0.084521]
      : selectedPeriod === 'monthly'
      ? [2.1, 2.3, 2.2, 2.4, 2.5, 2.3, 2.6, 2.4, 2.5, 2.6, 2.5, 2.536588]
      : [25.2, 27.8, 28.5, 29.1, 30.439056]
    
    const backgroundColor = data.map((_, index) => 
      index % 2 === 0 ? 'rgba(165, 255, 156, 0.8)' : 'rgba(138, 253, 129, 0.8)'
    )
    
    const borderColor = data.map((_, index) => 
      index % 2 === 0 ? '#a5ff9c' : '#8afd81'
    )
    
    return {
      labels,
      datasets: [
        {
          label: 'BTC Mined',
          data,
          backgroundColor,
          borderColor,
          borderWidth: 2,
          borderRadius: 4,
        },
      ],
    }
  }

  const chartData2 = getBarChartData()

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(26, 26, 26, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#a5ff9c',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
    },
  }

  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        {/* Hearst Corporation Section */}
        <div className="premium-wallet-section">
          <div className="premium-wallet-box" style={{ width: '100%' }}>
            <div className="premium-wallet-header">
              <h3 className="premium-wallet-title">Hearst Corporation</h3>
            </div>
            
            {/* Hearst Corporation Stats - 4 boxes */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-4)',
            }}>
              {/* Active Customers */}
              <div style={{
                padding: 'var(--space-4)',
                backgroundColor: 'rgba(165, 255, 156, 0.05)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(165, 255, 156, 0.1)',
              }}>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 500,
                }}>
                  Active Customers
                </div>
                <div style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--hearst-green)',
                }}>
                  1,247
                </div>
              </div>

              {/* Number of batches */}
              <div style={{
                padding: 'var(--space-4)',
                backgroundColor: 'rgba(165, 255, 156, 0.05)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(165, 255, 156, 0.1)',
              }}>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 500,
                }}>
                  Number of batches
                </div>
                <div style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--hearst-green)',
                }}>
                  3,892
                </div>
              </div>

              {/* Number of miners */}
              <div style={{
                padding: 'var(--space-4)',
                backgroundColor: 'rgba(165, 255, 156, 0.05)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(165, 255, 156, 0.1)',
              }}>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 500,
                }}>
                  Number of miners
                </div>
                <div style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--hearst-green)',
                }}>
                  15,648
                </div>
              </div>

              {/* Hearst Total Hashrate */}
              <div style={{
                padding: 'var(--space-4)',
                backgroundColor: 'rgba(165, 255, 156, 0.05)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(165, 255, 156, 0.1)',
              }}>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 500,
                }}>
                  Hearst Total Hashrate
                </div>
                <div style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--hearst-green)',
                }}>
                  2,847.5 PH/s
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BTC Mined Section with Charts */}
        <div className="premium-wallet-section">
          <div className="premium-wallet-box" style={{ width: '100%' }}>
            <div className="premium-wallet-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(165, 255, 156, 0.1)',
                  border: '1px solid rgba(165, 255, 156, 0.2)',
                }}>
                  <svg className="icon" width="40" height="40" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M43 0C19.254 0 0 19.254 0 43C0 66.746 19.254 86 43 86C66.746 86 86 66.746 86 43C86 19.254 66.746 0 43 0Z" fill="#a5ff9c"/>
                    <path d="M57.2 28.6L52.9 26.5L51.3 32.3L46.5 30.1V23.4L43 21.5L39.5 23.4V30.1L34.7 32.3L33.1 26.5L28.8 28.6L30.4 34.4L26.1 36.5L27.7 42.3L23.4 44.4L25 50.2L29.3 48.1L30.9 53.9L35.7 56.1V62.8L39.2 64.7L42.7 62.8V56.1L47.5 53.9L49.1 48.1L53.4 50.2L51.8 44.4L56.1 42.3L54.5 36.5L58.8 34.4L57.2 28.6ZM43 50.2C38.03 50.2 34 46.17 34 41.2C34 36.23 38.03 32.2 43 32.2C47.97 32.2 52 36.23 52 41.2C52 46.17 47.97 50.2 43 50.2Z" fill="#0a0a0a"/>
                  </svg>
                </div>
                <h3 className="premium-wallet-title">BTC Mined</h3>
              </div>
            </div>
            
            {/* BTC Mined Values - All Periods Side by Side */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-3)',
              marginBottom: 'var(--space-8)',
            }}>
              {/* Daily */}
              <div style={{
                padding: 'var(--space-4)',
                backgroundColor: 'rgba(165, 255, 156, 0.05)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(165, 255, 156, 0.1)',
              }}>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 500,
                }}>
                  Daily
                </div>
                <div style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--hearst-green)',
                  marginBottom: 'var(--space-1)',
                }}>
                  0.084521 BTC
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                }}>
                  $9,642.89 USD
                </div>
              </div>

              {/* Weekly */}
              <div style={{
                padding: 'var(--space-4)',
                backgroundColor: 'rgba(165, 255, 156, 0.05)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(165, 255, 156, 0.1)',
              }}>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 500,
                }}>
                  Weekly
                </div>
                <div style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--hearst-green)',
                  marginBottom: 'var(--space-1)',
                }}>
                  0.591647 BTC
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                }}>
                  $67,500.23 USD
                </div>
              </div>

              {/* Monthly */}
              <div style={{
                padding: 'var(--space-4)',
                backgroundColor: 'rgba(165, 255, 156, 0.05)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(165, 255, 156, 0.1)',
              }}>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 500,
                }}>
                  Monthly
                </div>
                <div style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--hearst-green)',
                  marginBottom: 'var(--space-1)',
                }}>
                  2.536588 BTC
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                }}>
                  $289,286.25 USD
                </div>
              </div>

              {/* Yearly */}
              <div style={{
                padding: 'var(--space-4)',
                backgroundColor: 'rgba(165, 255, 156, 0.05)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(165, 255, 156, 0.1)',
              }}>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 500,
                }}>
                  Since beginning
                </div>
                <div style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--hearst-green)',
                  marginBottom: 'var(--space-1)',
                }}>
                  30.439056 BTC
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                }}>
                  $3,471,435.00 USD
                </div>
              </div>
            </div>

            {/* Charts Container */}
            <div className="wallet-charts-container">
              <div className="wallet-chart-section">
                <div className="chart-header">
              <h2 className="chart-title">BTC Mined Performance</h2>
              <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                <button
                  onClick={() => setSelectedPeriod('daily')}
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid',
                    borderColor: selectedPeriod === 'daily' ? 'var(--hearst-green)' : 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: selectedPeriod === 'daily' ? 'rgba(165, 255, 156, 0.1)' : 'transparent',
                    color: selectedPeriod === 'daily' ? 'var(--hearst-green)' : 'var(--text-secondary)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: selectedPeriod === 'daily' ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Daily
                </button>
                <button
                  onClick={() => setSelectedPeriod('monthly')}
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid',
                    borderColor: selectedPeriod === 'monthly' ? 'var(--hearst-green)' : 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: selectedPeriod === 'monthly' ? 'rgba(165, 255, 156, 0.1)' : 'transparent',
                    color: selectedPeriod === 'monthly' ? 'var(--hearst-green)' : 'var(--text-secondary)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: selectedPeriod === 'monthly' ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setSelectedPeriod('yearly')}
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid',
                    borderColor: selectedPeriod === 'yearly' ? 'var(--hearst-green)' : 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: selectedPeriod === 'yearly' ? 'rgba(165, 255, 156, 0.1)' : 'transparent',
                    color: selectedPeriod === 'yearly' ? 'var(--hearst-green)' : 'var(--text-secondary)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: selectedPeriod === 'yearly' ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Yearly
                </button>
              </div>
              <div className="chart-legend" style={{ marginTop: 'var(--space-3)' }}>
                <div className="legend-item">
                  <span className="legend-dot green"></span>
                  <span>BTC Mined</span>
                </div>
              </div>
            </div>
            <div className="chart-container" style={{ position: 'relative', width: '100%', height: '90px' }}>
              <LineChart data={chartData1} options={chartOptions} />
              </div>
              </div>

              <div className="wallet-chart-section">
            <div className="chart-header">
              <h2 className="chart-title">BTC Mined Statistics</h2>
              <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                <button
                  onClick={() => setSelectedPeriod('daily')}
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid',
                    borderColor: selectedPeriod === 'daily' ? 'var(--hearst-green)' : 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: selectedPeriod === 'daily' ? 'rgba(165, 255, 156, 0.1)' : 'transparent',
                    color: selectedPeriod === 'daily' ? 'var(--hearst-green)' : 'var(--text-secondary)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: selectedPeriod === 'daily' ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Daily
                </button>
                <button
                  onClick={() => setSelectedPeriod('monthly')}
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid',
                    borderColor: selectedPeriod === 'monthly' ? 'var(--hearst-green)' : 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: selectedPeriod === 'monthly' ? 'rgba(165, 255, 156, 0.1)' : 'transparent',
                    color: selectedPeriod === 'monthly' ? 'var(--hearst-green)' : 'var(--text-secondary)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: selectedPeriod === 'monthly' ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setSelectedPeriod('yearly')}
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid',
                    borderColor: selectedPeriod === 'yearly' ? 'var(--hearst-green)' : 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: selectedPeriod === 'yearly' ? 'rgba(165, 255, 156, 0.1)' : 'transparent',
                    color: selectedPeriod === 'yearly' ? 'var(--hearst-green)' : 'var(--text-secondary)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: selectedPeriod === 'yearly' ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Yearly
                </button>
              </div>
            </div>
              <div className="chart-container" style={{ position: 'relative', width: '100%', height: '90px' }}>
                <BarChart data={chartData2} options={chartOptions} />
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="premium-transaction-section" style={{ marginTop: 'var(--space-4)' }}>
          <div className="premium-section-header">
            <h3 className="premium-section-title">Transaction history</h3>
          </div>
          <div className="premium-transaction-placeholder" style={{ padding: 0, textAlign: 'left' }}>
            <div className="table-container" style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
              <table className="table" style={{ background: 'transparent' }}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Account</th>
                    <th>Total Reward</th>
                    <th>Hashrate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2025-01-18</td>
                    <td>AKT04</td>
                    <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>0.084521 BTC</td>
                    <td>2041.42 TH/s</td>
                  </tr>
                  <tr>
                    <td>2025-01-17</td>
                    <td>AKT04</td>
                    <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>0.083247 BTC</td>
                    <td>2041.42 TH/s</td>
                  </tr>
                  <tr>
                    <td>2025-01-16</td>
                    <td>AKT05</td>
                    <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>0.082156 BTC</td>
                    <td>1987.23 TH/s</td>
                  </tr>
                  <tr>
                    <td>2025-01-15</td>
                    <td>AKT06</td>
                    <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>0.081234 BTC</td>
                    <td>2156.78 TH/s</td>
                  </tr>
                  <tr>
                    <td>2025-01-14</td>
                    <td>AKT04</td>
                    <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>0.080521 BTC</td>
                    <td>2041.42 TH/s</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-6)', padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '16px', fontWeight: 600 }}>
                <strong>Total: <span style={{ color: 'var(--hearst-green)', marginLeft: 'var(--space-2)' }}>0.491902 BTC</span></strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



