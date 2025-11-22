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

// Composants d'icônes premium SVG
const DailyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M3 17L9 11L13 15L21 7M21 7V11M21 7H17" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const MonthlyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const EfficiencyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12L11 15L16 9" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const YearlyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M3 3V21H21M7 16L12 11L16 15L21 10M21 10H16M21 10V15" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const AverageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function CockpitProduction() {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const [selectedView, setSelectedView] = useState<'overview' | 'comparison' | 'efficiency'>('overview')

  // Données par défaut enrichies
  const productionData = {
    daily: 0.263521,
    weekly: 1.845647,
    monthly: 7.905630,
    yearly: 94.867560,
    efficiency: 98.3,
    targetEfficiency: 96.2,
    btcPrice: 114000,
    averageDaily: 0.263521,
    peakDaily: 0.284521,
    lowDaily: 0.241234,
  }

  // Données pour les graphiques
  const dailyProductionData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}h`),
    data: Array.from({ length: 24 }, (_, i) => {
      // Simulation de production avec pic en journée
      const hour = i
      const base = 0.01
      const variation = Math.sin((hour - 6) * Math.PI / 12) * 0.005
      return base + variation + Math.random() * 0.003
    }),
  }

  const weeklyProductionData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    data: [0.258521, 0.261234, 0.260521, 0.262892, 0.263156, 0.264247, 0.263521],
  }

  const monthlyProductionData = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    data: [1.95, 1.98, 1.97, 2.00],
  }

  const chartData = selectedPeriod === 'daily' ? dailyProductionData : selectedPeriod === 'weekly' ? weeklyProductionData : monthlyProductionData

  const productionLineData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Production BTC',
        data: chartData.data,
        borderColor: '#A7FB90',
        backgroundColor: 'rgba(167, 251, 144, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const productionBarData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Production BTC',
        data: chartData.data,
        backgroundColor: chartData.data.map((_, i) => 
          i % 2 === 0 ? 'rgba(167, 251, 144, 0.8)' : 'rgba(167, 251, 144, 0.8)'
        ),
        borderColor: chartData.data.map((_, i) => 
          i % 2 === 0 ? '#A7FB90' : '#A7FB90'
        ),
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  // Données comparatives mensuelles
  const monthlyComparisonData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    currentYear: [7.2, 7.5, 7.8, 7.6, 7.9, 7.7, 7.905630, 8.0, 8.2, 8.1, 8.3, 8.5],
    lastYear: [6.8, 7.0, 7.2, 7.1, 7.3, 7.2, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9],
  }

  const comparisonChartData = {
    labels: monthlyComparisonData.labels,
    datasets: [
      {
        label: 'Année en cours',
        data: monthlyComparisonData.currentYear,
        borderColor: '#A7FB90',
        backgroundColor: 'rgba(167, 251, 144, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Année précédente',
        data: monthlyComparisonData.lastYear,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        fill: true,
        tension: 0.4,
        borderDash: [5, 5],
      },
    ],
  }

  // Répartition par client
  const clientDistributionData = {
    labels: ['Royal Group MENA', 'Jason Wilson Family', 'Akt Account 1', 'Akt Account 2', 'Dubai Investments'],
    datasets: [
      {
        data: [33.3, 15.3, 13.2, 17.4, 20.8],
        backgroundColor: [
          'rgba(167, 251, 144, 0.8)',
          'rgba(167, 251, 144, 0.8)',
          'rgba(100, 200, 100, 0.8)',
          'rgba(80, 180, 80, 0.8)',
          'rgba(60, 160, 60, 0.8)',
        ],
        borderColor: [
          '#A7FB90',
          '#A7FB90',
          '#64c864',
          '#50b450',
          '#3ca03c',
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
        borderColor: '#A7FB90',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y.toFixed(6)} BTC (≈ $${(context.parsed.y * productionData.btcPrice).toFixed(2)})`
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
            return value.toFixed(4) + ' BTC'
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
        borderColor: '#A7FB90',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const label = context.label || ''
            const value = context.parsed || 0
            return `${label}: ${value.toFixed(1)}%`
          },
        },
      },
    },
  }

  // Données pour le tableau de production détaillé
  const productionDetails = [
    { period: 'Aujourd\'hui', btc: 0.263521, usd: 30041.39, efficiency: 98.5, trend: '+0.8%' },
    { period: 'Hier', btc: 0.261234, usd: 29780.68, efficiency: 98.2, trend: '-0.5%' },
    { period: 'Cette semaine', btc: 1.845647, usd: 210403.76, efficiency: 98.3, trend: '+1.2%' },
    { period: 'Semaine dernière', btc: 1.823456, usd: 207874.18, efficiency: 97.9, trend: '-0.3%' },
    { period: 'Ce mois', btc: 7.905630, usd: 901241.82, efficiency: 98.3, trend: '+5.2%' },
    { period: 'Mois dernier', btc: 7.512345, usd: 856407.93, efficiency: 97.8, trend: '-2.1%' },
    { period: 'Cette année', btc: 94.867560, usd: 10814901.84, efficiency: 98.1, trend: '+8.5%' },
  ]

  return (
    <div>
      {/* KPIs Cards enrichies */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Production Quotidienne</CardTitle>
              <DailyIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {productionData.daily.toFixed(6)} BTC
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#A7FB90', fontSize: '0.875rem' }}>↑ 0.8%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs hier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Dernières 24 heures
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(167, 251, 144, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Valeur USD</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--hearst-green)' }}>
                ≈ ${(productionData.daily * productionData.btcPrice).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Production Mensuelle</CardTitle>
              <MonthlyIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {productionData.monthly.toFixed(6)} BTC
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#A7FB90', fontSize: '0.875rem' }}>↑ 5.2%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs mois dernier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Mois en cours
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(167, 251, 144, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Valeur USD</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--hearst-green)' }}>
                ≈ ${(productionData.monthly * productionData.btcPrice).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Production Annuelle</CardTitle>
              <YearlyIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {productionData.yearly.toFixed(2)} BTC
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#A7FB90', fontSize: '0.875rem' }}>↑ 8.5%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs année dernière</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Projection annuelle
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(167, 251, 144, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Valeur USD</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--hearst-green)' }}>
                ≈ ${(productionData.yearly * productionData.btcPrice).toLocaleString('fr-FR', { maximumFractionDigits: 0 })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Efficacité</CardTitle>
              <EfficiencyIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {productionData.efficiency.toFixed(1)}%
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#A7FB90', fontSize: '0.875rem' }}>↑ 2.1%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs cible ({productionData.targetEfficiency}%)</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Efficacité moyenne
            </p>
            <div style={{ marginTop: 'var(--space-3)', width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${productionData.efficiency}%`, height: '100%', background: 'linear-gradient(90deg, #A7FB90, #A7FB90)', borderRadius: '4px' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Moyenne Quotidienne</CardTitle>
              <AverageIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {productionData.averageDaily.toFixed(6)} BTC
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Pic: {productionData.peakDaily.toFixed(6)}</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Sur 30 jours
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(167, 251, 144, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Minimum</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--hearst-green)' }}>
                {productionData.lowDaily.toFixed(6)} BTC
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation par onglets */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border)', flexWrap: 'wrap' }}>
        <button
          onClick={() => setSelectedView('overview')}
          style={{
            padding: 'var(--space-3) var(--space-4)',
            background: 'transparent',
            border: 'none',
            borderBottom: selectedView === 'overview' ? '2px solid var(--hearst-green)' : '2px solid transparent',
            color: selectedView === 'overview' ? 'var(--hearst-green)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: selectedView === 'overview' ? 600 : 400,
            transition: 'all var(--duration-fast) var(--ease-in-out)',
          }}
        >
          Vue d'ensemble
        </button>
        <button
          onClick={() => setSelectedView('comparison')}
          style={{
            padding: 'var(--space-3) var(--space-4)',
            background: 'transparent',
            border: 'none',
            borderBottom: selectedView === 'comparison' ? '2px solid var(--hearst-green)' : '2px solid transparent',
            color: selectedView === 'comparison' ? 'var(--hearst-green)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: selectedView === 'comparison' ? 600 : 400,
            transition: 'all var(--duration-fast) var(--ease-in-out)',
          }}
        >
          Comparaison
        </button>
        <button
          onClick={() => setSelectedView('efficiency')}
          style={{
            padding: 'var(--space-3) var(--space-4)',
            background: 'transparent',
            border: 'none',
            borderBottom: selectedView === 'efficiency' ? '2px solid var(--hearst-green)' : '2px solid transparent',
            color: selectedView === 'efficiency' ? 'var(--hearst-green)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: selectedView === 'efficiency' ? 600 : 400,
            transition: 'all var(--duration-fast) var(--ease-in-out)',
          }}
        >
          Efficacité
        </button>
      </div>

      {/* Vue d'ensemble */}
      {selectedView === 'overview' && (
        <>
          {/* Graphiques de production */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                  <CardTitle>Historique de Production</CardTitle>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button
                      onClick={() => setSelectedPeriod('daily')}
                      style={{
                        padding: 'var(--space-2) var(--space-3)',
                        background: selectedPeriod === 'daily' ? 'rgba(167, 251, 144, 0.2)' : 'transparent',
                        border: `1px solid ${selectedPeriod === 'daily' ? '#A7FB90' : 'var(--border)'}`,
                        borderRadius: 'var(--radius-sm)',
                        color: selectedPeriod === 'daily' ? '#A7FB90' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: 'var(--text-sm)',
                      }}
                    >
                      Horaire
                    </button>
                    <button
                      onClick={() => setSelectedPeriod('weekly')}
                      style={{
                        padding: 'var(--space-2) var(--space-3)',
                        background: selectedPeriod === 'weekly' ? 'rgba(167, 251, 144, 0.2)' : 'transparent',
                        border: `1px solid ${selectedPeriod === 'weekly' ? '#A7FB90' : 'var(--border)'}`,
                        borderRadius: 'var(--radius-sm)',
                        color: selectedPeriod === 'weekly' ? '#A7FB90' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: 'var(--text-sm)',
                      }}
                    >
                      Quotidien
                    </button>
                    <button
                      onClick={() => setSelectedPeriod('monthly')}
                      style={{
                        padding: 'var(--space-2) var(--space-3)',
                        background: selectedPeriod === 'monthly' ? 'rgba(167, 251, 144, 0.2)' : 'transparent',
                        border: `1px solid ${selectedPeriod === 'monthly' ? '#A7FB90' : 'var(--border)'}`,
                        borderRadius: 'var(--radius-sm)',
                        color: selectedPeriod === 'monthly' ? '#A7FB90' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: 'var(--text-sm)',
                      }}
                    >
                      Hebdomadaire
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                  <LineChart data={productionLineData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Production par Période</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                  <BarChart data={productionBarData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Répartition par client */}
          <Card style={{ marginBottom: 'var(--space-6)' }}>
            <CardHeader>
              <CardTitle>Répartition de la Production par Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                <DoughnutChart data={clientDistributionData} options={doughnutOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Tableau détaillé */}
          <Card>
            <CardHeader>
              <CardTitle>Détail de la Production par Période</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Période</th>
                      <th>Production BTC</th>
                      <th>Valeur USD</th>
                      <th>Efficacité</th>
                      <th>Tendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productionDetails.map((detail, index) => (
                      <tr key={index}>
                        <td><strong>{detail.period}</strong></td>
                        <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{detail.btc.toFixed(6)} BTC</td>
                        <td style={{ color: '#ffa500', fontWeight: 600 }}>${detail.usd.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td>{detail.efficiency}%</td>
                        <td>
                          <span style={{ 
                            color: detail.trend.startsWith('+') ? '#A7FB90' : detail.trend.startsWith('-') ? '#ffa500' : 'var(--text-secondary)',
                            fontWeight: 600,
                          }}>
                            {detail.trend}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Vue Comparaison */}
      {selectedView === 'comparison' && (
        <Card>
          <CardHeader>
            <CardTitle>Comparaison Annuelle de Production</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
              <LineChart data={comparisonChartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vue Efficacité */}
      {selectedView === 'efficiency' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-6)' }}>
          <Card>
            <CardHeader>
              <CardTitle>Évolution de l'Efficacité</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-4)' }}>
                  {productionData.efficiency.toFixed(1)}%
                </div>
                <div style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                  Efficacité moyenne actuelle
                </div>
                <div style={{ width: '100%', height: '12px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '6px', overflow: 'hidden', marginBottom: 'var(--space-4)' }}>
                  <div style={{ width: `${productionData.efficiency}%`, height: '100%', background: 'linear-gradient(90deg, #A7FB90, #A7FB90)', borderRadius: '6px' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  <span>Cible: {productionData.targetEfficiency}%</span>
                  <span style={{ color: '#A7FB90' }}>+{(productionData.efficiency - productionData.targetEfficiency).toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Métriques d'Efficacité</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                <div style={{ padding: 'var(--space-4)', background: 'rgba(167, 251, 144, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(167, 251, 144, 0.1)' }}>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>Efficacité Moyenne</div>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--hearst-green)' }}>
                    {productionData.efficiency.toFixed(1)}%
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden', marginTop: 'var(--space-2)' }}>
                    <div style={{ width: `${productionData.efficiency}%`, height: '100%', background: 'linear-gradient(90deg, #A7FB90, #A7FB90)', borderRadius: '4px' }}></div>
                  </div>
                </div>

                <div style={{ padding: 'var(--space-4)', background: 'rgba(167, 251, 144, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(167, 251, 144, 0.1)' }}>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>Cible d'Efficacité</div>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--hearst-green)' }}>
                    {productionData.targetEfficiency.toFixed(1)}%
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden', marginTop: 'var(--space-2)' }}>
                    <div style={{ width: `${productionData.targetEfficiency}%`, height: '100%', background: 'linear-gradient(90deg, #A7FB90, #64c864)', borderRadius: '4px' }}></div>
                  </div>
                </div>

                <div style={{ padding: 'var(--space-4)', background: 'rgba(167, 251, 144, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(167, 251, 144, 0.1)' }}>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>Amélioration vs Cible</div>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: '#A7FB90' }}>
                    +{(productionData.efficiency - productionData.targetEfficiency).toFixed(1)}%
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
                    Performance supérieure à l'objectif
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
