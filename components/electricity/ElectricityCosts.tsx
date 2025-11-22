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
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

// Composants d'icônes premium SVG
const CostIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#ffa500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const MoneyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#ffa500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const DollarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#ffa500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

const DoughnutChart = dynamic(
  () => import('react-chartjs-2').then((mod) => ({ default: mod.Doughnut })),
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
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function ElectricityCosts() {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily')

  // Données par défaut
  const costData = {
    daily: 2400.96,
    weekly: 16806.72,
    monthly: 72028.8,
    yearly: 864345.6,
    costPerKwh: 0.08,
  }

  // Données pour les graphiques
  const dailyCosts = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    costs: [2350.50, 2400.96, 2380.25, 2420.15, 2395.80, 2370.45, 2400.96],
  }

  const weeklyCosts = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    costs: [16800, 17050, 16806.72, 16950],
  }

  const monthlyCosts = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    costs: [68000, 69500, 71000, 70500, 71500, 72000, 72028.8, 72500, 73000, 73500, 74000, 74500],
  }

  const currentData = selectedPeriod === 'daily' ? dailyCosts : selectedPeriod === 'weekly' ? weeklyCosts : monthlyCosts

  // Graphique de coûts (ligne)
  const costLineData = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'Coût (USD)',
        data: currentData.costs,
        borderColor: '#ffa500',
        backgroundColor: 'rgba(255, 165, 0, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Graphique de coûts (barres)
  const costBarData = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'Coût (USD)',
        data: currentData.costs,
        backgroundColor: currentData.costs.map((_, i) => 
          i % 2 === 0 ? 'rgba(255, 165, 0, 0.8)' : 'rgba(255, 200, 0, 0.8)'
        ),
        borderColor: currentData.costs.map((_, i) => 
          i % 2 === 0 ? '#ffa500' : '#ffc800'
        ),
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  // Répartition des coûts par ferme
  const farmCostDistribution = {
    labels: ['Farm A', 'Farm B', 'Farm C', 'Farm D'],
    datasets: [
      {
        data: [864.38, 730.56, 806.02, 547.78],
        backgroundColor: [
          'rgba(255, 165, 0, 0.8)',
          'rgba(255, 200, 0, 0.8)',
          'rgba(255, 180, 0, 0.8)',
          'rgba(255, 160, 0, 0.8)',
        ],
        borderColor: [
          '#ffa500',
          '#ffc800',
          '#ffb400',
          '#ffa000',
        ],
        borderWidth: 2,
      },
    ],
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
        borderColor: '#ffa500',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `$${context.parsed.y.toFixed(2)}`
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
            return '$' + value.toFixed(0)
          },
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#ffa500',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const label = context.label || ''
            const value = context.parsed || 0
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: $${value.toFixed(2)} (${percentage}%)`
          },
        },
      },
    },
  }

  const costBreakdown = [
    { period: 'Aujourd\'hui', consumption: 30012, cost: 2400.96, rate: 0.08, trend: '+0.8%' },
    { period: 'Hier', consumption: 29850, cost: 2388.00, rate: 0.08, trend: '-0.5%' },
    { period: 'Cette semaine', consumption: 210084, cost: 16806.72, rate: 0.08, trend: '+1.2%' },
    { period: 'Semaine dernière', consumption: 207500, cost: 16600.00, rate: 0.08, trend: '-0.3%' },
    { period: 'Ce mois', consumption: 900360, cost: 72028.8, rate: 0.08, trend: '+5.8%' },
    { period: 'Mois dernier', consumption: 851200, cost: 68096.00, rate: 0.08, trend: '-2.1%' },
    { period: 'Cette année', consumption: 10804320, cost: 864345.6, rate: 0.08, trend: '+8.5%' },
  ]

  return (
    <div>
      {/* KPI Cards enrichies */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Coût Quotidien</CardTitle>
              <CostIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffa500', marginBottom: 'var(--space-2)' }}>
              ${costData.daily.toFixed(2)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#ffa500', fontSize: '0.875rem' }}>↑ 0.8%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs hier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Dernières 24 heures
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(255, 165, 0, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Coût horaire moyen</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#ffa500' }}>
                ${(costData.daily / 24).toFixed(2)}/h
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Coût Mensuel</CardTitle>
              <MoneyIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffa500', marginBottom: 'var(--space-2)' }}>
              ${costData.monthly.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#ffa500', fontSize: '0.875rem' }}>↑ 5.8%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs mois dernier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Mois en cours
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(255, 165, 0, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Coût quotidien moyen</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#ffa500' }}>
                ${(costData.monthly / 30).toFixed(2)}/jour
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Coût Annuel</CardTitle>
              <span style={{ fontSize: '1.5rem' }}>💸</span>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffa500', marginBottom: 'var(--space-2)' }}>
              ${(costData.yearly / 1000).toFixed(1)}k
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#ffa500', fontSize: '0.875rem' }}>↑ 8.5%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs année dernière</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Projection annuelle
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(255, 165, 0, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Coût mensuel moyen</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#ffa500' }}>
                ${(costData.yearly / 12).toFixed(2)}/mois
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Prix par kWh</CardTitle>
              <DollarIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffa500', marginBottom: 'var(--space-2)' }}>
              ${costData.costPerKwh.toFixed(3)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>→ Stable</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs moyenne</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Taux moyen
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(255, 165, 0, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Économies potentielles</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#a5ff9c' }}>
                ${(costData.monthly * 0.05).toFixed(2)}/mois
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques de coûts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              <CardTitle>Évolution des Coûts</CardTitle>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <button
                  onClick={() => setSelectedPeriod('daily')}
                  style={{
                    padding: 'var(--space-2) var(--space-3)',
                    background: selectedPeriod === 'daily' ? 'rgba(255, 165, 0, 0.2)' : 'transparent',
                    border: `1px solid ${selectedPeriod === 'daily' ? '#ffa500' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    color: selectedPeriod === 'daily' ? '#ffa500' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  Quotidien
                </button>
                <button
                  onClick={() => setSelectedPeriod('weekly')}
                  style={{
                    padding: 'var(--space-2) var(--space-3)',
                    background: selectedPeriod === 'weekly' ? 'rgba(255, 165, 0, 0.2)' : 'transparent',
                    border: `1px solid ${selectedPeriod === 'weekly' ? '#ffa500' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    color: selectedPeriod === 'weekly' ? '#ffa500' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  Hebdomadaire
                </button>
                <button
                  onClick={() => setSelectedPeriod('monthly')}
                  style={{
                    padding: 'var(--space-2) var(--space-3)',
                    background: selectedPeriod === 'monthly' ? 'rgba(255, 165, 0, 0.2)' : 'transparent',
                    border: `1px solid ${selectedPeriod === 'monthly' ? '#ffa500' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    color: selectedPeriod === 'monthly' ? '#ffa500' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  Mensuel
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
              <LineChart data={costLineData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition des Coûts par Ferme</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
              <DoughnutChart data={farmCostDistribution} options={doughnutOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphique en barres */}
      <Card style={{ marginBottom: 'var(--space-6)' }}>
        <CardHeader>
          <CardTitle>Analyse Comparative des Coûts</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ position: 'relative', width: '100%', height: '300px' }}>
            <BarChart data={costBarData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Tableau détaillé des coûts */}
      <Card>
        <CardHeader>
          <CardTitle>Détail des Coûts par Période</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Période</th>
                  <th>Consommation (kWh)</th>
                  <th>Coût (USD)</th>
                  <th>Taux (USD/kWh)</th>
                  <th>Tendance</th>
                </tr>
              </thead>
              <tbody>
                {costBreakdown.map((item, index) => (
                  <tr key={index}>
                    <td><strong>{item.period}</strong></td>
                    <td>{item.consumption.toLocaleString('fr-FR')} kWh</td>
                    <td style={{ color: '#ffa500', fontWeight: 600 }}>${item.cost.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>${item.rate.toFixed(3)}</td>
                    <td>
                      <span style={{ 
                        color: item.trend.startsWith('+') ? '#ffa500' : item.trend.startsWith('-') ? '#a5ff9c' : 'var(--text-secondary)',
                        fontWeight: 600,
                      }}>
                        {item.trend}
                      </span>
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

