'use client'

import { useState } from 'react'
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

// Composants d'icônes premium SVG
const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M3 3V21H21M7 16L12 11L16 15L21 10M21 10H16M21 10V15" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const PowerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M13 2L13 12M18.36 6.64C19.6184 7.89879 20.4753 9.50244 20.8223 11.2482C21.1693 12.9939 20.9909 14.8034 20.3076 16.4478C19.6244 18.0921 18.4658 19.4976 16.9998 20.4864C15.5338 21.4752 13.8211 22.0029 12.075 22.0029C10.3289 22.0029 8.61623 21.4752 7.15021 20.4864C5.68418 19.4976 4.52563 18.0921 3.84236 16.4478C3.15909 14.8034 2.98067 12.9939 3.32768 11.2482C3.67468 9.50244 4.53157 7.89879 5.79 6.64" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TrendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M3 17L9 11L13 15L21 7M21 7V11M21 7H17" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const EcoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12L11 15L16 9" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Dynamically import Chart.js components
const LineChart = dynamic(
  () => import('react-chartjs-2').then((mod) => ({ default: mod.Line })),
  { 
    ssr: false,
    loading: () => <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Chargement...</div>
  }
)

const BarChart = dynamic(
  () => import('react-chartjs-2').then((mod) => ({ default: mod.Bar })),
  { 
    ssr: false,
    loading: () => <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Chargement...</div>
  }
)

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

export default function ElectricityAnalytics() {
  const [selectedMetric, setSelectedMetric] = useState<'efficiency' | 'consumption' | 'cost'>('efficiency')

  // Données pour les graphiques
  const efficiencyData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    data: [37.5, 37.2, 36.8, 36.5, 36.3, 36.1, 36.0, 36.2, 36.0, 35.9, 35.8, 36.2],
  }

  const consumptionTrendData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    data: [850000, 870000, 880000, 875000, 890000, 900000, 900360, 910000, 920000, 930000, 940000, 950000],
  }

  const costAnalysisData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    costs: [68000, 69600, 70400, 70000, 71200, 72000, 72028.8, 72800, 73600, 74400, 75200, 76000],
    savings: [0, 400, 600, 500, 800, 1000, 1200, 1100, 1300, 1400, 1500, 1600],
  }

  const getChartData = () => {
    switch (selectedMetric) {
      case 'efficiency':
        return {
          labels: efficiencyData.labels,
          datasets: [
            {
              label: 'Efficacité (J/TH)',
              data: efficiencyData.data,
              borderColor: '#a5ff9c',
              backgroundColor: 'rgba(165, 255, 156, 0.1)',
              fill: true,
              tension: 0.4,
            },
          ],
        }
      case 'consumption':
        return {
          labels: consumptionTrendData.labels,
          datasets: [
            {
              label: 'Consommation (kWh)',
              data: consumptionTrendData.data,
              borderColor: '#a5ff9c',
              backgroundColor: 'rgba(165, 255, 156, 0.1)',
              fill: true,
              tension: 0.4,
            },
          ],
        }
      case 'cost':
        return {
          labels: costAnalysisData.labels,
          datasets: [
            {
              label: 'Coût (USD)',
              data: costAnalysisData.costs,
              borderColor: '#ffa500',
              backgroundColor: 'rgba(255, 165, 0, 0.1)',
              fill: true,
              tension: 0.4,
            },
            {
              label: 'Économies (USD)',
              data: costAnalysisData.savings,
              borderColor: '#a5ff9c',
              backgroundColor: 'rgba(165, 255, 156, 0.1)',
              fill: true,
              tension: 0.4,
            },
          ],
        }
      default:
        return { labels: [], datasets: [] }
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
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

  // Données pour le graphique comparatif d'efficacité par ferme
  const farmEfficiencyData = {
    labels: ['Farm A', 'Farm B', 'Farm C', 'Farm D'],
    datasets: [
      {
        label: 'Efficacité (J/TH)',
        data: [36.1, 29.6, 34.4, 35.9],
        backgroundColor: [
          'rgba(165, 255, 156, 0.8)',
          'rgba(138, 253, 129, 0.8)',
          'rgba(100, 200, 100, 0.8)',
          'rgba(80, 180, 80, 0.8)',
        ],
        borderColor: [
          '#a5ff9c',
          '#8afd81',
          '#64c864',
          '#50b450',
        ],
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#a5ff9c',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y.toFixed(1)} J/TH`
          },
        },
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
          callback: function(value: any) {
            return value.toFixed(1) + ' J/TH'
          },
        },
      },
    },
  }

  return (
    <div>
      {/* Métriques d'efficacité enrichies */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Efficacité Moyenne</CardTitle>
              <ChartIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {efficiencyData.data[efficiencyData.data.length - 1].toFixed(1)} J/TH
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>↓ 3.5%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs début d'année</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Amélioration continue
            </p>
            <div style={{ marginTop: 'var(--space-3)', width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, #a5ff9c, #8afd81)', borderRadius: '4px' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Facteur de Puissance</CardTitle>
              <PowerIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              0.95
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>→ Optimal</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs cible 0.95</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Qualité de l'alimentation
            </p>
            <div style={{ marginTop: 'var(--space-3)', width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '95%', height: '100%', background: 'linear-gradient(90deg, #a5ff9c, #8afd81)', borderRadius: '4px' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Pic de Demande</CardTitle>
              <TrendIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              1350.8 kW
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#ffa500', fontSize: '0.875rem' }}>↑ 2.1%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs moyenne</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Ce mois-ci
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(255, 165, 0, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Moyenne mensuelle</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#ffa500' }}>
                1250.5 kW
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Empreinte Carbone</CardTitle>
              <EcoIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              45.2 t CO₂
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>↓ 5.2%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs mois dernier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Mois en cours
            </p>
            <div style={{ marginTop: 'var(--space-3)', width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '75%', height: '100%', background: 'linear-gradient(90deg, #a5ff9c, #8afd81)', borderRadius: '4px' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques d'analyse */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              <CardTitle>Tendances d'Analyse</CardTitle>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <button
                  onClick={() => setSelectedMetric('efficiency')}
                  style={{
                    padding: 'var(--space-2) var(--space-3)',
                    background: selectedMetric === 'efficiency' ? 'rgba(165, 255, 156, 0.2)' : 'transparent',
                    border: `1px solid ${selectedMetric === 'efficiency' ? '#a5ff9c' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    color: selectedMetric === 'efficiency' ? '#a5ff9c' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  Efficacité
                </button>
                <button
                  onClick={() => setSelectedMetric('consumption')}
                  style={{
                    padding: 'var(--space-2) var(--space-3)',
                    background: selectedMetric === 'consumption' ? 'rgba(165, 255, 156, 0.2)' : 'transparent',
                    border: `1px solid ${selectedMetric === 'consumption' ? '#a5ff9c' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    color: selectedMetric === 'consumption' ? '#a5ff9c' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  Consommation
                </button>
                <button
                  onClick={() => setSelectedMetric('cost')}
                  style={{
                    padding: 'var(--space-2) var(--space-3)',
                    background: selectedMetric === 'cost' ? 'rgba(255, 165, 0, 0.2)' : 'transparent',
                    border: `1px solid ${selectedMetric === 'cost' ? '#ffa500' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    color: selectedMetric === 'cost' ? '#ffa500' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  Coûts
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
              <LineChart data={getChartData()} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Efficacité par Ferme</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
              <BarChart data={farmEfficiencyData} options={barChartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau d'analyse détaillée */}
      <Card>
        <CardHeader>
          <CardTitle>Analyse Comparative Mensuelle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Mois</th>
                  <th>Consommation (kWh)</th>
                  <th>Coût (USD)</th>
                  <th>Efficacité (J/TH)</th>
                  <th>Pic (kW)</th>
                  <th>Économies (USD)</th>
                </tr>
              </thead>
              <tbody>
                {efficiencyData.labels.map((month, index) => (
                  <tr key={index}>
                    <td><strong>{month}</strong></td>
                    <td>{consumptionTrendData.data[index].toLocaleString('fr-FR')} kWh</td>
                    <td style={{ color: '#ffa500', fontWeight: 600 }}>
                      ${costAnalysisData.costs[index].toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>
                      {efficiencyData.data[index].toFixed(1)} J/TH
                    </td>
                    <td>{index === 6 ? '1350.8' : (1300 + Math.random() * 100).toFixed(1)} kW</td>
                    <td style={{ color: '#a5ff9c', fontWeight: 600 }}>
                      ${costAnalysisData.savings[index].toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

