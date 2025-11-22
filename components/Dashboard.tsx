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
  metrics?: {
    btcPrice: number
    networkHashrate: number
    hashpriceTH: number
    hashpricePH: number
  }
}

export default function Dashboard({ data, metrics }: DashboardProps): JSX.Element {
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
        borderColor: '#A7FB90',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 400)
          gradient.addColorStop(0, 'rgba(167, 251, 144, 0.3)')
          gradient.addColorStop(0.5, 'rgba(167, 251, 144, 0.15)')
          gradient.addColorStop(1, 'rgba(167, 251, 144, 0)')
          return gradient
        },
        fill: true,
        tension: 0.5,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#A7FB90',
        pointHoverBorderColor: '#000000',
        pointHoverBorderWidth: 2,
        pointBackgroundColor: '#A7FB90',
        pointBorderColor: '#000000',
        pointBorderWidth: 2,
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
        borderColor: '#A7FB90',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 400)
          gradient.addColorStop(0, 'rgba(167, 251, 144, 0.3)')
          gradient.addColorStop(0.5, 'rgba(167, 251, 144, 0.15)')
          gradient.addColorStop(1, 'rgba(167, 251, 144, 0)')
          return gradient
        },
        fill: true,
        tension: 0.5,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#A7FB90',
        pointHoverBorderColor: '#000000',
        pointHoverBorderWidth: 2,
        pointBackgroundColor: '#A7FB90',
        pointBorderColor: '#000000',
        pointBorderWidth: 2,
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
        borderColor: '#A7FB90',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 400)
          gradient.addColorStop(0, 'rgba(167, 251, 144, 0.3)')
          gradient.addColorStop(0.5, 'rgba(167, 251, 144, 0.15)')
          gradient.addColorStop(1, 'rgba(167, 251, 144, 0)')
          return gradient
        },
        fill: true,
        tension: 0.5,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#A7FB90',
        pointHoverBorderColor: '#000000',
        pointHoverBorderWidth: 2,
        pointBackgroundColor: '#A7FB90',
        pointBorderColor: '#000000',
        pointBorderWidth: 2,
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
    
    // Create premium gradient for each bar
    const maxValue = Math.max(...data)
    
    return {
      labels,
      datasets: [
        {
          label: 'BTC Mined',
          data,
          backgroundColor: (context: any) => {
            const chart = context.chart
            const {ctx, chartArea} = chart
            if (!chartArea) return '#A7FB90'
            
            const value = context.parsed.y
            const percentage = value / maxValue
            const barTop = chartArea.top
            const barBottom = chartArea.bottom
            
            // Create premium multi-stop gradient from bottom to top
            const gradient = ctx.createLinearGradient(0, barBottom, 0, barTop)
            
            // Premium gradient: darker at bottom, lighter at top
            gradient.addColorStop(0, 'rgba(140, 220, 115, 0.8)') // Darker at bottom
            gradient.addColorStop(0.2, 'rgba(140, 220, 115, 0.85)') // Slightly lighter
            gradient.addColorStop(0.4, 'rgba(150, 230, 125, 0.9)') // Mid tone
            gradient.addColorStop(0.6, 'rgba(160, 240, 135, 0.95)') // Lighter
            gradient.addColorStop(0.8, 'rgba(167, 251, 144, 0.98)') // Almost full brightness
            gradient.addColorStop(1, 'rgba(167, 251, 144, 1)') // Full brightness at top
            
            return gradient
          },
          borderColor: '#A7FB90',
          borderWidth: 0,
          borderRadius: {
            topLeft: 16,
            topRight: 16,
            bottomLeft: 0,
            bottomRight: 0,
          },
          barThickness: 'flex' as const,
          maxBarThickness: 80,
          categoryPercentage: 0.7,
          barPercentage: 0.8,
        },
      ],
    }
  }

  const chartData2 = getBarChartData()

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: 'easeOutCubic' as const,
      delay: (context: any) => {
        return context.dataIndex * 50
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    onHover: (event: any, activeElements: any) => {
      const chart = event.chart
      if (activeElements.length > 0) {
        chart.canvas.style.cursor = 'pointer'
        // Add glow effect on hover
        const datasetIndex = activeElements[0].datasetIndex
        const index = activeElements[0].index
        chart.data.datasets[datasetIndex].borderWidth = 2
        chart.data.datasets[datasetIndex].borderColor = '#A7FB90'
        chart.update('none')
      } else {
        chart.canvas.style.cursor = 'default'
        chart.data.datasets.forEach((dataset: any) => {
          dataset.borderWidth = 0
        })
        chart.update('none')
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(14, 15, 15, 0.98)',
        titleColor: '#A7FB90',
        bodyColor: '#ffffff',
        borderColor: '#A7FB90',
        borderWidth: 2,
        padding: 16,
        titleFont: {
          size: 13,
          weight: '700' as const,
          family: 'var(--font-mono), monospace',
        },
        bodyFont: {
          size: 15,
          weight: '600' as const,
          family: 'var(--font-mono), monospace',
        },
        cornerRadius: 12,
        displayColors: false,
        boxPadding: 8,
        callbacks: {
          title: (context: any) => {
            return context[0].label
          },
          label: (context: any) => {
            return `${context.parsed.y.toFixed(6)} BTC`
          },
          labelTextColor: () => {
            return '#A7FB90'
          },
        },
        filter: (tooltipItem: any) => {
          return tooltipItem.datasetIndex === 0
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          font: {
            size: 12,
            weight: '600' as const,
            family: 'var(--font-mono), monospace',
          },
          padding: 16,
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.03)',
          drawBorder: false,
          lineWidth: 1,
          drawTicks: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          font: {
            size: 11,
            weight: '500' as const,
            family: 'var(--font-mono), monospace',
          },
          padding: 16,
          callback: function(value: any) {
            return value.toFixed(2)
          },
        },
      },
    },
  }

  // Fonctions de formatage
  const formatNumber = (num: number, decimals: number = 2) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num)
  }

  const formatHashrate = (hashrate: number) => {
    const eh = hashrate / 1000000 // Convert to EH/s
    return formatNumber(eh, 2)
  }

  // Charger le CSS du calculator
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/css/calculator-charte-exacte.css'
    document.head.appendChild(link)

    return () => {
      const existingLink = document.querySelector('link[href="/css/calculator-charte-exacte.css"]')
      if (existingLink && existingLink.parentNode) {
        existingLink.parentNode.removeChild(existingLink)
      }
    }
  }, [])

  // Valeurs par défaut pour les métriques
  const defaultMetrics = {
    btcPrice: 84519,
    networkHashrate: 600000000,
    hashpriceTH: 0.0634,
    hashpricePH: 63.39
  }

  const displayMetrics = metrics || defaultMetrics

  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        {/* Boxes KPI - Style exact Mining Profitability Calculator */}
        <section className="metrics-section" style={{ marginBottom: '20px' }}>
          <div className="calculator-kpi-grid">
            <div className="calculator-kpi-card">
              <div className="calculator-kpi-label">BTC Price</div>
              <div className="calculator-kpi-value">
                ${formatNumber(displayMetrics.btcPrice, 2)}
              </div>
              <div className="calculator-kpi-description">Real-time price</div>
            </div>
            <div className="calculator-kpi-card">
              <div className="calculator-kpi-label">Network Hashrate</div>
              <div className="calculator-kpi-value">
                {formatHashrate(displayMetrics.networkHashrate)} EH/s
              </div>
              <div className="calculator-kpi-description">Real-time</div>
            </div>
            <div className="calculator-kpi-card">
              <div className="calculator-kpi-label">Hashprice (TH)</div>
              <div className="calculator-kpi-value">
                ${formatNumber(displayMetrics.hashpriceTH, 4)}
              </div>
              <div className="calculator-kpi-description">per TH/day</div>
            </div>
            <div className="calculator-kpi-card">
              <div className="calculator-kpi-label">Hashprice (PH)</div>
              <div className="calculator-kpi-value">
                ${formatNumber(displayMetrics.hashpricePH, 2)}
              </div>
              <div className="calculator-kpi-description">per PH/day</div>
            </div>
          </div>
        </section>

        {/* BTC Mined Section - Charts Only */}
        <div style={{ marginBottom: '10px', marginTop: '0px' }}>
          {/* Charts Container */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 'var(--space-6)', marginBottom: '10px', marginTop: '30px', width: '100%', maxWidth: '100%' }}>
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
                        backgroundColor: selectedPeriod === 'daily' ? '#A7FB90' : 'transparent',
                        color: selectedPeriod === 'daily' ? '#000000' : 'var(--text-secondary)',
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
                        backgroundColor: selectedPeriod === 'monthly' ? '#A7FB90' : 'transparent',
                        color: selectedPeriod === 'monthly' ? '#000000' : 'var(--text-secondary)',
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
                        backgroundColor: selectedPeriod === 'yearly' ? '#A7FB90' : 'transparent',
                        color: selectedPeriod === 'yearly' ? '#000000' : 'var(--text-secondary)',
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
                        backgroundColor: selectedPeriod === 'daily' ? '#A7FB90' : 'transparent',
                        color: selectedPeriod === 'daily' ? '#000000' : 'var(--text-secondary)',
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
                        backgroundColor: selectedPeriod === 'monthly' ? '#A7FB90' : 'transparent',
                        color: selectedPeriod === 'monthly' ? '#000000' : 'var(--text-secondary)',
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
                        backgroundColor: selectedPeriod === 'yearly' ? '#A7FB90' : 'transparent',
                        color: selectedPeriod === 'yearly' ? '#000000' : 'var(--text-secondary)',
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
                <div style={{ 
                  position: 'relative', 
                  width: '100%', 
                  height: '300px',
                  padding: 'var(--space-2)',
                  background: 'linear-gradient(135deg, rgba(167, 251, 144, 0.02) 0%, rgba(167, 251, 144, 0) 100%)',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  <BarChart data={chartData2} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transaction History Section */}
        <div style={{ marginTop: '20px', width: '100%', maxWidth: '100%', gridColumn: '1 / -1' }}>
          <Card style={{ width: '100%', maxWidth: '100%' }}>
            <CardContent style={{ padding: 'var(--space-6)', width: '100%' }}>
              <div className="table-container" style={{ marginTop: '-10px', width: 'calc(100% + 50px)', maxWidth: 'calc(100% + 50px)', marginLeft: '-20px', marginRight: '-30px', overflowX: 'auto' }}>
                <table className="table" style={{ width: '100%', minWidth: '100%', tableLayout: 'auto' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: 'var(--space-6)' }}>
                      <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0 }}>Transaction history</h3>
                    </th>
                    <th>Account</th>
                    <th>Total Reward</th>
                    <th>Hashrate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: 'var(--space-6)' }}>2025-01-18</td>
                    <td>AKT04</td>
                    <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>0.084521 BTC</td>
                    <td>2041.42 TH/s</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 'var(--space-6)' }}>2025-01-17</td>
                    <td>AKT04</td>
                    <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>0.083247 BTC</td>
                    <td>2041.42 TH/s</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 'var(--space-6)' }}>2025-01-16</td>
                    <td>AKT05</td>
                    <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>0.082156 BTC</td>
                    <td>1987.23 TH/s</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 'var(--space-6)' }}>2025-01-15</td>
                    <td>AKT06</td>
                    <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>0.081234 BTC</td>
                    <td>2156.78 TH/s</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 'var(--space-6)' }}>2025-01-14</td>
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
    </div>
  )
}



