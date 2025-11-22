'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

export default function Dashboard({ data }: DashboardProps): JSX.Element {
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

  const chartOptions: any = {
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
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>
            Hearst Corporation
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-4)',
          }}>
            <Card>
              <CardHeader>
                <CardTitle>Active Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
                  1,247
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  Clients actifs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Number of batches</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
                  3,892
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  Batches total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Number of miners</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
                  15,648
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  Mineurs actifs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hearst Total Hashrate</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
                  2,847.5 PH/s
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  Hashrate total Hearst
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* BTC Mined Section */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>
            BTC Mined
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-6)',
          }}>
            <Card>
              <CardHeader>
                <CardTitle>Daily</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
                  0.084521 BTC
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  $9,642.89 USD
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
                  0.591647 BTC
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  $67,500.23 USD
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
                  2.536588 BTC
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  $289,286.25 USD
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Since beginning</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
                  30.439056 BTC
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  $3,471,435.00 USD
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Container */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                  <CardTitle>BTC Mined Performance</CardTitle>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button
                      onClick={() => setSelectedPeriod('daily')}
                      style={{
                        padding: 'var(--space-2) var(--space-3)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid',
                        borderColor: selectedPeriod === 'daily' ? 'var(--hearst-green)' : 'rgba(255, 255, 255, 0.2)',
                        backgroundColor: selectedPeriod === 'daily' ? 'rgba(165, 255, 156, 0.2)' : 'transparent',
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
                        padding: 'var(--space-2) var(--space-3)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid',
                        borderColor: selectedPeriod === 'monthly' ? 'var(--hearst-green)' : 'rgba(255, 255, 255, 0.2)',
                        backgroundColor: selectedPeriod === 'monthly' ? 'rgba(165, 255, 156, 0.2)' : 'transparent',
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
                        padding: 'var(--space-2) var(--space-3)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid',
                        borderColor: selectedPeriod === 'yearly' ? 'var(--hearst-green)' : 'rgba(255, 255, 255, 0.2)',
                        backgroundColor: selectedPeriod === 'yearly' ? 'rgba(165, 255, 156, 0.2)' : 'transparent',
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
              </CardHeader>
              <CardContent>
                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                  <LineChart data={chartData1} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                  <CardTitle>BTC Mined Statistics</CardTitle>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button
                      onClick={() => setSelectedPeriod('daily')}
                      style={{
                        padding: 'var(--space-2) var(--space-3)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid',
                        borderColor: selectedPeriod === 'daily' ? 'var(--hearst-green)' : 'rgba(255, 255, 255, 0.2)',
                        backgroundColor: selectedPeriod === 'daily' ? 'rgba(165, 255, 156, 0.2)' : 'transparent',
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
                        padding: 'var(--space-2) var(--space-3)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid',
                        borderColor: selectedPeriod === 'monthly' ? 'var(--hearst-green)' : 'rgba(255, 255, 255, 0.2)',
                        backgroundColor: selectedPeriod === 'monthly' ? 'rgba(165, 255, 156, 0.2)' : 'transparent',
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
                        padding: 'var(--space-2) var(--space-3)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid',
                        borderColor: selectedPeriod === 'yearly' ? 'var(--hearst-green)' : 'rgba(255, 255, 255, 0.2)',
                        backgroundColor: selectedPeriod === 'yearly' ? 'rgba(165, 255, 156, 0.2)' : 'transparent',
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
              </CardHeader>
              <CardContent>
                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                  <BarChart data={chartData2} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transaction History Section */}
        <Card style={{ marginTop: 'var(--space-6)' }}>
          <CardHeader>
            <CardTitle>Transaction history</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="table-container">
              <table className="table">
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}



