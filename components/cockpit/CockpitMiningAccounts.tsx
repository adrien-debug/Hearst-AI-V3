'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
const BarChart = dynamic(
  () => import('react-chartjs-2').then((mod) => ({ default: mod.Bar })),
  { 
    ssr: false,
    loading: () => <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Chargement...</div>
  }
)

const LineChart = dynamic(
  () => import('react-chartjs-2').then((mod) => ({ default: mod.Line })),
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
const AccountIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const HashrateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M4 8H20M4 16H20M16 4L14 20M10 4L8 20" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const MinerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const PerformanceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M3 17L9 11L13 15L21 7M21 7V11M21 7H17" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function CockpitMiningAccounts() {
  const [selectedView, setSelectedView] = useState<'overview' | 'performance' | 'distribution'>('overview')

  // Données enrichies
  const accountsData = {
    total: 6,
    active: 5,
    degraded: 1,
    totalHashrate: 11.21,
    totalMiners: 615,
    averageEfficiency: 97.8,
  }

  // Données des comptes de minage
  const miningAccounts = [
    { 
      account: 'AKT04', 
      minerType: 'Antminer S21 Pro', 
      realtimeHashrate: 2.04, 
      last24h: 2.12, 
      activeMiners: 124,
      totalMiners: 128,
      efficiency: 98.5,
      uptime: 99.2,
      btc24h: 0.084521,
      status: 'active',
      client: 'Akt Account',
    },
    { 
      account: 'AKT05', 
      minerType: 'Antminer S21', 
      realtimeHashrate: 1.99, 
      last24h: 2.05, 
      activeMiners: 118,
      totalMiners: 120,
      efficiency: 97.8,
      uptime: 98.5,
      btc24h: 0.082156,
      status: 'active',
      client: 'Akt Account',
    },
    { 
      account: 'AKT06', 
      minerType: 'Antminer S21 Pro', 
      realtimeHashrate: 2.16, 
      last24h: 2.18, 
      activeMiners: 132,
      totalMiners: 135,
      efficiency: 98.9,
      uptime: 99.5,
      btc24h: 0.089234,
      status: 'active',
      client: 'Akt Account',
    },
    { 
      account: 'RG-MENA-01', 
      minerType: 'Antminer S19 XP', 
      realtimeHashrate: 1.85, 
      last24h: 1.92, 
      activeMiners: 98,
      totalMiners: 100,
      efficiency: 97.2,
      uptime: 98.8,
      btc24h: 0.075234,
      status: 'active',
      client: 'Royal Group MENA',
    },
    { 
      account: 'RG-MENA-02', 
      minerType: 'Antminer S21', 
      realtimeHashrate: 1.72, 
      last24h: 1.78, 
      activeMiners: 87,
      totalMiners: 92,
      efficiency: 92.5,
      uptime: 94.2,
      btc24h: 0.068456,
      status: 'degraded',
      client: 'Royal Group MENA',
    },
    { 
      account: 'JWF-001', 
      minerType: 'Antminer S21 Pro', 
      realtimeHashrate: 1.45, 
      last24h: 1.52, 
      activeMiners: 76,
      totalMiners: 80,
      efficiency: 96.8,
      uptime: 97.5,
      btc24h: 0.058234,
      status: 'active',
      client: 'Jason Wilson Family',
    },
  ]

  // Données pour les graphiques
  const hashrateByAccountData = {
    labels: miningAccounts.map(a => a.account),
    realtime: miningAccounts.map(a => a.realtimeHashrate),
    last24h: miningAccounts.map(a => a.last24h),
  }

  const minersByAccountData = {
    labels: miningAccounts.map(a => a.account),
    active: miningAccounts.map(a => a.activeMiners),
    total: miningAccounts.map(a => a.totalMiners),
  }

  const efficiencyByAccountData = {
    labels: miningAccounts.map(a => a.account),
    efficiency: miningAccounts.map(a => a.efficiency),
  }

  // Graphique de hashrate
  const hashrateChartData = {
    labels: hashrateByAccountData.labels,
    datasets: [
      {
        label: 'Hashrate Temps Réel (PH/s)',
        data: hashrateByAccountData.realtime,
        backgroundColor: 'rgba(165, 255, 156, 0.8)',
        borderColor: '#a5ff9c',
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: 'Hashrate 24h (PH/s)',
        data: hashrateByAccountData.last24h,
        backgroundColor: 'rgba(138, 253, 129, 0.8)',
        borderColor: '#8afd81',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  // Graphique de mineurs
  const minersChartData = {
    labels: minersByAccountData.labels,
    datasets: [
      {
        label: 'Mineurs Actifs',
        data: minersByAccountData.active,
        backgroundColor: 'rgba(165, 255, 156, 0.8)',
        borderColor: '#a5ff9c',
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: 'Total Mineurs',
        data: minersByAccountData.total,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  // Graphique d'efficacité
  const efficiencyChartData = {
    labels: efficiencyByAccountData.labels,
    datasets: [
      {
        label: 'Efficacité (%)',
        data: efficiencyByAccountData.efficiency,
        borderColor: '#a5ff9c',
        backgroundColor: 'rgba(165, 255, 156, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Répartition par client
  const clientDistributionData = {
    labels: ['Akt Account', 'Royal Group MENA', 'Jason Wilson Family'],
    datasets: [
      {
        data: [
          miningAccounts.filter(a => a.client === 'Akt Account').length,
          miningAccounts.filter(a => a.client === 'Royal Group MENA').length,
          miningAccounts.filter(a => a.client === 'Jason Wilson Family').length,
        ],
        backgroundColor: [
          'rgba(165, 255, 156, 0.8)',
          'rgba(138, 253, 129, 0.8)',
          'rgba(100, 200, 100, 0.8)',
        ],
        borderColor: [
          '#a5ff9c',
          '#8afd81',
          '#64c864',
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
          maxRotation: 45,
          minRotation: 45,
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
        borderColor: '#a5ff9c',
        borderWidth: 1,
      },
    },
  }

  return (
    <div>
      {/* En-tête */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
            Customer Batch
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
            Gestion des comptes de minage par client
          </p>
        </div>
        <Button>+ Nouveau Compte</Button>
      </div>

      {/* KPIs Cards enrichies */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Total Comptes</CardTitle>
              <AccountIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {accountsData.total}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: 'var(--hearst-green)', fontSize: '0.875rem', fontWeight: 600 }}>
                {accountsData.active} actifs
              </span>
              <span style={{ color: '#ffa500', fontSize: '0.875rem' }}>
                {accountsData.degraded} dégradés
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Comptes de minage
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Hashrate Total</CardTitle>
              <HashrateIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {accountsData.totalHashrate.toFixed(2)} PH/s
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>↑ 2.1%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs hier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Capacité totale
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Moyenne par compte</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--hearst-green)' }}>
                {(accountsData.totalHashrate / accountsData.total).toFixed(2)} PH/s
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Total Mineurs</CardTitle>
              <MinerIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {accountsData.totalMiners}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>→ Stable</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs moyenne</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Tous comptes confondus
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Moyenne par compte</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--hearst-green)' }}>
                {Math.round(accountsData.totalMiners / accountsData.total)} mineurs
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Efficacité Moyenne</CardTitle>
              <PerformanceIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {accountsData.averageEfficiency.toFixed(1)}%
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>↑ 1.2%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs moyenne</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Performance globale
            </p>
            <div style={{ marginTop: 'var(--space-3)', width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${accountsData.averageEfficiency}%`, height: '100%', background: 'linear-gradient(90deg, #a5ff9c, #8afd81)', borderRadius: '3px' }}></div>
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
          onClick={() => setSelectedView('performance')}
          style={{
            padding: 'var(--space-3) var(--space-4)',
            background: 'transparent',
            border: 'none',
            borderBottom: selectedView === 'performance' ? '2px solid var(--hearst-green)' : '2px solid transparent',
            color: selectedView === 'performance' ? 'var(--hearst-green)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: selectedView === 'performance' ? 600 : 400,
            transition: 'all var(--duration-fast) var(--ease-in-out)',
          }}
        >
          Performance
        </button>
        <button
          onClick={() => setSelectedView('distribution')}
          style={{
            padding: 'var(--space-3) var(--space-4)',
            background: 'transparent',
            border: 'none',
            borderBottom: selectedView === 'distribution' ? '2px solid var(--hearst-green)' : '2px solid transparent',
            color: selectedView === 'distribution' ? 'var(--hearst-green)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: selectedView === 'distribution' ? 600 : 400,
            transition: 'all var(--duration-fast) var(--ease-in-out)',
          }}
        >
          Répartition
        </button>
      </div>

      {/* Vue d'ensemble */}
      {selectedView === 'overview' && (
        <>
          {/* Graphiques */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <Card>
              <CardHeader>
                <CardTitle>Hashrate par Compte</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                  <BarChart data={hashrateChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mineurs par Compte</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                  <BarChart data={minersChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tableau */}
          <Card>
            <CardHeader>
              <CardTitle>Résumé des Comptes de Minage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Compte</th>
                      <th>Client</th>
                      <th>Type de Mineur</th>
                      <th>Hashrate Temps Réel</th>
                      <th>Hashrate 24h</th>
                      <th>Mineurs Actifs</th>
                      <th>Efficacité</th>
                      <th>Uptime</th>
                      <th>BTC 24h</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {miningAccounts.map((account, index) => (
                      <tr key={index}>
                        <td><strong>{account.account}</strong></td>
                        <td style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{account.client}</td>
                        <td>{account.minerType}</td>
                        <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{account.realtimeHashrate} PH/s</td>
                        <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{account.last24h} PH/s</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <span style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{account.activeMiners}</span>
                            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                              / {account.totalMiners}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <span style={{ 
                              color: account.efficiency >= 97 ? 'var(--hearst-green)' : account.efficiency >= 95 ? '#ffa500' : '#ff4444',
                              fontWeight: 600,
                            }}>
                              {account.efficiency}%
                            </span>
                            <div style={{ width: '60px', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                              <div style={{ 
                                width: `${account.efficiency}%`, 
                                height: '100%', 
                                background: account.efficiency >= 97 ? 'linear-gradient(90deg, #a5ff9c, #8afd81)' : account.efficiency >= 95 ? 'linear-gradient(90deg, #ffa500, #ff8c00)' : 'linear-gradient(90deg, #ff4d4d, #ff3333)',
                                borderRadius: '2px'
                              }}></div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{ 
                            color: account.uptime >= 98 ? 'var(--hearst-green)' : account.uptime >= 95 ? '#ffa500' : '#ff4444',
                            fontWeight: 600,
                          }}>
                            {account.uptime}%
                          </span>
                        </td>
                        <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{account.btc24h.toFixed(6)} BTC</td>
                        <td>
                          <span style={{ 
                            color: account.status === 'active' ? 'var(--hearst-green)' : '#ffa500',
                            fontWeight: 600,
                          }}>
                            {account.status === 'active' ? '● ACTIF' : '◐ DÉGRADÉ'}
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

      {/* Vue Performance */}
      {selectedView === 'performance' && (
        <>
          <Card style={{ marginBottom: 'var(--space-6)' }}>
            <CardHeader>
              <CardTitle>Évolution de l'Efficacité</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                <LineChart data={efficiencyChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Métriques de Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Compte</th>
                      <th>Efficacité</th>
                      <th>Uptime</th>
                      <th>Taux d'Activation</th>
                      <th>Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {miningAccounts.map((account, index) => {
                      const activationRate = (account.activeMiners / account.totalMiners) * 100
                      return (
                        <tr key={index}>
                          <td><strong>{account.account}</strong></td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                              <span style={{ 
                                color: account.efficiency >= 97 ? 'var(--hearst-green)' : account.efficiency >= 95 ? '#ffa500' : '#ff4444',
                                fontWeight: 600,
                              }}>
                                {account.efficiency}%
                              </span>
                              <div style={{ width: '100px', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ 
                                  width: `${account.efficiency}%`, 
                                  height: '100%', 
                                  background: account.efficiency >= 97 ? 'linear-gradient(90deg, #a5ff9c, #8afd81)' : account.efficiency >= 95 ? 'linear-gradient(90deg, #ffa500, #ff8c00)' : 'linear-gradient(90deg, #ff4d4d, #ff3333)',
                                  borderRadius: '3px'
                                }}></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span style={{ 
                              color: account.uptime >= 98 ? 'var(--hearst-green)' : account.uptime >= 95 ? '#ffa500' : '#ff4444',
                              fontWeight: 600,
                            }}>
                              {account.uptime}%
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                              <span style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{activationRate.toFixed(1)}%</span>
                              <div style={{ width: '80px', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ 
                                  width: `${activationRate}%`, 
                                  height: '100%', 
                                  background: 'linear-gradient(90deg, #a5ff9c, #8afd81)',
                                  borderRadius: '3px'
                                }}></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span style={{ 
                              color: account.efficiency >= 97 && account.uptime >= 98 ? 'var(--hearst-green)' : '#ffa500',
                              fontWeight: 600,
                            }}>
                              {account.efficiency >= 97 && account.uptime >= 98 ? '✓ EXCELLENT' : account.efficiency >= 95 && account.uptime >= 95 ? '◐ BON' : '⚠ À AMÉLIORER'}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Vue Répartition */}
      {selectedView === 'distribution' && (
        <>
          <Card style={{ marginBottom: 'var(--space-6)' }}>
            <CardHeader>
              <CardTitle>Répartition par Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                <DoughnutChart data={clientDistributionData} options={doughnutOptions} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Répartition Détaillée</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
                {['Akt Account', 'Royal Group MENA', 'Jason Wilson Family'].map((clientName) => {
                  const clientAccounts = miningAccounts.filter(a => a.client === clientName)
                  const totalHashrate = clientAccounts.reduce((sum, a) => sum + a.realtimeHashrate, 0)
                  const totalMiners = clientAccounts.reduce((sum, a) => sum + a.activeMiners, 0)
                  const avgEfficiency = clientAccounts.reduce((sum, a) => sum + a.efficiency, 0) / clientAccounts.length
                  
                  return (
                    <Card key={clientName}>
                      <CardHeader>
                        <CardTitle style={{ fontSize: 'var(--text-base)' }}>{clientName}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
                          <div>
                            <span style={{ color: 'var(--text-secondary)' }}>Comptes: </span>
                            <span style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{clientAccounts.length}</span>
                          </div>
                          <div>
                            <span style={{ color: 'var(--text-secondary)' }}>Hashrate Total: </span>
                            <span style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{totalHashrate.toFixed(2)} PH/s</span>
                          </div>
                          <div>
                            <span style={{ color: 'var(--text-secondary)' }}>Mineurs Actifs: </span>
                            <span style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{totalMiners}</span>
                          </div>
                          <div>
                            <span style={{ color: 'var(--text-secondary)' }}>Efficacité Moyenne: </span>
                            <span style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{avgEfficiency.toFixed(1)}%</span>
                          </div>
                          <div style={{ marginTop: 'var(--space-2)', padding: 'var(--space-2)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-sm)' }}>
                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Production BTC 24h</div>
                            <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--hearst-green)' }}>
                              {clientAccounts.reduce((sum, a) => sum + a.btc24h, 0).toFixed(6)} BTC
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
