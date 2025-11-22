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

// Composants d'icônes premium SVG
const ProviderIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ClientIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const BatchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M9 11L12 14L22 4" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function CockpitOperations() {
  const [selectedView, setSelectedView] = useState<'providers' | 'clients' | 'batches'>('providers')

  // Données pour les KPIs
  const kpiData = {
    totalProviders: 6,
    operationalProviders: 5,
    totalClients: 5,
    totalBatches: 12,
    healthyBatches: 8,
    atRiskBatches: 3,
    criticalBatches: 1,
  }

  // Données pour les graphiques
  const providerHashrateData = {
    labels: ['Enegix', 'GoMining', 'Cryptominer', '50blocks', 'Bitkern', 'Block Forge'],
    hashrate: [5.2, 4.1, 2.8, 3.3, 1.7, 1.3],
    performance: [98.5, 97.8, 96.2, 99.1, 95.5, 98.9],
    uptime: [99.2, 98.5, 97.1, 99.5, 96.8, 99.0],
  }

  const clientHashrateData = {
    labels: ['Royal Group MENA', 'Jason Wilson Family', 'Akt Account 1', 'Akt Account 2', 'Dubai Investments'],
    hashrate: [6.3, 2.9, 2.5, 3.3, 3.8],
    uptime: [99.1, 98.7, 97.8, 98.5, 99.2],
    btc24h: [0.263521, 0.121156, 0.104521, 0.137890, 0.158456],
  }

  // Graphique de hashrate par provider
  const providerHashrateChartData = {
    labels: providerHashrateData.labels,
    datasets: [
      {
        label: 'Hashrate (PH/s)',
        data: providerHashrateData.hashrate,
        backgroundColor: providerHashrateData.hashrate.map((_, i) => {
          const perf = providerHashrateData.performance[i]
          if (perf >= 98) return 'rgba(167, 251, 144, 0.8)'
          if (perf >= 96) return 'rgba(255, 165, 0, 0.8)'
          return 'rgba(255, 77, 77, 0.8)'
        }),
        borderColor: providerHashrateData.hashrate.map((_, i) => {
          const perf = providerHashrateData.performance[i]
          if (perf >= 98) return '#A7FB90'
          if (perf >= 96) return '#ffa500'
          return '#ff4d4d'
        }),
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  // Graphique de performance par provider
  const providerPerformanceChartData = {
    labels: providerHashrateData.labels,
    datasets: [
      {
        label: 'Performance (%)',
        data: providerHashrateData.performance,
        borderColor: '#A7FB90',
        backgroundColor: 'rgba(167, 251, 144, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Uptime (%)',
        data: providerHashrateData.uptime,
        borderColor: '#A7FB90',
        backgroundColor: 'rgba(167, 251, 144, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Graphique de hashrate par client
  const clientHashrateChartData = {
    labels: clientHashrateData.labels,
    datasets: [
      {
        label: 'Hashrate (PH/s)',
        data: clientHashrateData.hashrate,
        backgroundColor: 'rgba(167, 251, 144, 0.8)',
        borderColor: '#A7FB90',
        borderWidth: 2,
        borderRadius: 4,
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

  const hostingProviders = [
    { name: 'Enegix', live: 5.2, perf: 98.5, uptime: 99.2, offline: 2, status: 'operational' },
    { name: 'GoMining', live: 4.1, perf: 97.8, uptime: 98.5, offline: 1, status: 'operational' },
    { name: 'Cryptominer', live: 2.8, perf: 96.2, uptime: 97.1, offline: 3, status: 'maintenance' },
    { name: '50blocks', live: 3.3, perf: 99.1, uptime: 99.5, offline: 0, status: 'operational' },
    { name: 'Bitkern', live: 1.7, perf: 95.5, uptime: 96.8, offline: 1, status: 'maintenance' },
    { name: 'Block Forge', live: 1.3, perf: 98.9, uptime: 99.0, offline: 0, status: 'operational' },
  ]

  const clients = [
    { name: 'Royal Group MENA', live: 6.3, uptime: 99.1, slaTarget: 99.5, btc24h: 0.263521 },
    { name: 'Jason Wilson Family', live: 2.9, uptime: 98.7, slaTarget: 99.0, btc24h: 0.121156 },
    { name: 'Akt Account 1', live: 2.5, uptime: 97.8, slaTarget: 98.2, btc24h: 0.104521 },
    { name: 'Akt Account 2', live: 3.3, uptime: 98.5, slaTarget: 98.8, btc24h: 0.137890 },
    { name: 'Dubai Investments', live: 3.8, uptime: 99.2, slaTarget: 99.3, btc24h: 0.158456 },
  ]

  const batches = [
    { id: 'BATCH_DFO1_2025_01', provider: 'Abu Dhabi Immersion A', perf: 98.5, uptime: 99.2, down: 2, roi: 12.3, status: 'healthy' },
    { id: 'BATCH_HELIOS_02', provider: 'Marseille Harbor B', perf: 87.2, uptime: 92.5, down: 8, roi: 5.8, status: 'at-risk' },
    { id: 'BATCH_STBARTH_01', provider: 'STBARTH alpha', perf: 72.5, uptime: 85.3, down: 15, roi: -2.1, status: 'critical' },
    { id: 'BATCH_DFO2_2025_01', provider: 'Abu Dhabi Immersion B', perf: 97.8, uptime: 98.9, down: 1, roi: 11.5, status: 'healthy' },
    { id: 'BATCH_HELIOS_03', provider: 'Marseille Harbor C', perf: 94.2, uptime: 96.8, down: 3, roi: 8.2, status: 'healthy' },
  ]

  return (
    <div>
      {/* En-tête avec KPIs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
            Opérations
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
            Surveillance du hashrate et gestion des batches
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button variant="outline">Tous les Clients</Button>
          <Button variant="outline">Tous les Hébergeurs</Button>
          <Button variant="outline">Exporter les Données</Button>
        </div>
      </div>

      {/* KPIs Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle style={{ fontSize: 'var(--text-base)' }}>Hébergeurs</CardTitle>
              <ProviderIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {kpiData.totalProviders}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
              {kpiData.operationalProviders} opérationnels
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle style={{ fontSize: 'var(--text-base)' }}>Clients</CardTitle>
              <ClientIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {kpiData.totalClients}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
              Actifs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle style={{ fontSize: 'var(--text-base)' }}>Batches</CardTitle>
              <BatchIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {kpiData.totalBatches}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
              {kpiData.healthyBatches} sains, {kpiData.atRiskBatches} à risque
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation par onglets */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border)', flexWrap: 'wrap' }}>
        <button
          onClick={() => setSelectedView('providers')}
          style={{
            padding: 'var(--space-3) var(--space-4)',
            background: 'transparent',
            border: 'none',
            borderBottom: selectedView === 'providers' ? '2px solid var(--hearst-green)' : '2px solid transparent',
            color: selectedView === 'providers' ? 'var(--hearst-green)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: selectedView === 'providers' ? 600 : 400,
            transition: 'all var(--duration-fast) var(--ease-in-out)',
          }}
        >
          Hébergeurs
        </button>
        <button
          onClick={() => setSelectedView('clients')}
          style={{
            padding: 'var(--space-3) var(--space-4)',
            background: 'transparent',
            border: 'none',
            borderBottom: selectedView === 'clients' ? '2px solid var(--hearst-green)' : '2px solid transparent',
            color: selectedView === 'clients' ? 'var(--hearst-green)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: selectedView === 'clients' ? 600 : 400,
            transition: 'all var(--duration-fast) var(--ease-in-out)',
          }}
        >
          Clients
        </button>
        <button
          onClick={() => setSelectedView('batches')}
          style={{
            padding: 'var(--space-3) var(--space-4)',
            background: 'transparent',
            border: 'none',
            borderBottom: selectedView === 'batches' ? '2px solid var(--hearst-green)' : '2px solid transparent',
            color: selectedView === 'batches' ? 'var(--hearst-green)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: selectedView === 'batches' ? 600 : 400,
            transition: 'all var(--duration-fast) var(--ease-in-out)',
          }}
        >
          Batches
        </button>
      </div>

      {/* Vue Hébergeurs */}
      {selectedView === 'providers' && (
        <>
          {/* Graphiques */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <Card>
              <CardHeader>
                <CardTitle>Hashrate par Hébergeur</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                  <BarChart data={providerHashrateChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance et Uptime</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                  <LineChart data={providerPerformanceChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tableau */}
          <Card>
            <CardHeader>
              <CardTitle>Hashrate par Hébergeur</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Hébergeur</th>
                      <th>Live</th>
                      <th>Performance</th>
                      <th>Uptime 24h</th>
                      <th>Hors ligne</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hostingProviders.map((provider, index) => (
                      <tr key={index}>
                        <td><strong>{provider.name}</strong></td>
                        <td>{provider.live} PH/s</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <span style={{ color: provider.perf >= 98 ? 'var(--hearst-green)' : provider.perf >= 96 ? '#ffa500' : '#ff4d4d' }}>
                              {provider.perf}%
                            </span>
                            <div style={{ width: '60px', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                              <div style={{ 
                                width: `${provider.perf}%`, 
                                height: '100%', 
                                background: provider.perf >= 98 ? 'linear-gradient(90deg, #A7FB90, #A7FB90)' : provider.perf >= 96 ? 'linear-gradient(90deg, #ffa500, #ff8c00)' : 'linear-gradient(90deg, #ff4d4d, #ff3333)',
                                borderRadius: '2px'
                              }}></div>
                            </div>
                          </div>
                        </td>
                        <td>{provider.uptime}%</td>
                        <td>
                          <span style={{ color: provider.offline === 0 ? 'var(--hearst-green)' : provider.offline <= 2 ? '#ffa500' : '#ff4d4d' }}>
                            {provider.offline}
                          </span>
                        </td>
                        <td>
                          <span style={{ 
                            color: provider.status === 'operational' ? 'var(--hearst-green)' : '#ffa500',
                            fontWeight: 600,
                          }}>
                            ● {provider.status === 'operational' ? 'OPÉRATIONNEL' : 'MAINTENANCE'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 'var(--space-4)', textAlign: 'right' }}>
                <Button variant="outline" size="sm">Voir Plus →</Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Vue Clients */}
      {selectedView === 'clients' && (
        <>
          {/* Graphique */}
          <Card style={{ marginBottom: 'var(--space-6)' }}>
            <CardHeader>
              <CardTitle>Hashrate par Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                <BarChart data={clientHashrateChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Tableau */}
          <Card>
            <CardHeader>
              <CardTitle>Hashrate par Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Live</th>
                      <th>Uptime 24h</th>
                      <th>Cible SLA</th>
                      <th>BTC 24h</th>
                      <th>Conformité SLA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, index) => {
                      const slaCompliance = client.uptime >= client.slaTarget
                      return (
                        <tr key={index}>
                          <td><strong>{client.name}</strong></td>
                          <td>{client.live} PH/s</td>
                          <td>{client.uptime}%</td>
                          <td>{client.slaTarget}%</td>
                          <td>{client.btc24h.toFixed(6)} BTC</td>
                          <td>
                            <span style={{ 
                              color: slaCompliance ? 'var(--hearst-green)' : '#ffa500',
                              fontWeight: 600,
                            }}>
                              {slaCompliance ? '✓ CONFORME' : '⚠ NON CONFORME'}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 'var(--space-4)', textAlign: 'right' }}>
                <Button variant="outline" size="sm">Voir Plus →</Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Vue Batches */}
      {selectedView === 'batches' && (
        <Card>
          <CardHeader>
            <CardTitle>Watchlist des Batches</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
              {batches.map((batch, index) => {
                const statusColors = {
                  healthy: { bg: 'rgba(167, 251, 144, 0.1)', color: 'var(--hearst-green)', label: 'Sain' },
                  'at-risk': { bg: 'rgba(255, 165, 0, 0.1)', color: '#ffa500', label: 'À Risque' },
                  critical: { bg: 'rgba(255, 68, 68, 0.1)', color: '#ff4444', label: 'Critique' },
                }
                const statusStyle = statusColors[batch.status as keyof typeof statusColors]

                return (
                  <Card key={index} style={{ border: `1px solid ${statusStyle.color}20` }}>
                    <CardHeader>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CardTitle style={{ fontSize: 'var(--text-base)' }}>{batch.id}</CardTitle>
                        <span
                          style={{
                            padding: 'var(--space-1) var(--space-2)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 600,
                            background: statusStyle.bg,
                            color: statusStyle.color,
                          }}
                        >
                          {statusStyle.label}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
                        <div>
                          <span style={{ color: 'var(--text-secondary)' }}>Hébergeur: </span>
                          <span style={{ color: 'var(--text-primary)' }}>{batch.provider}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Performance: </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <span style={{ color: statusStyle.color, fontWeight: 600 }}>{batch.perf}%</span>
                            <div style={{ width: '80px', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ 
                                width: `${batch.perf}%`, 
                                height: '100%', 
                                background: `linear-gradient(90deg, ${statusStyle.color}, ${statusStyle.color}80)`,
                                borderRadius: '3px'
                              }}></div>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Uptime: </span>
                          <span style={{ color: statusStyle.color, fontWeight: 600 }}>{batch.uptime}%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Hors ligne: </span>
                          <span style={{ color: batch.down > 5 ? '#ff4444' : batch.down > 0 ? '#ffa500' : 'var(--hearst-green)' }}>
                            {batch.down} mineurs
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-2)', background: 'rgba(167, 251, 144, 0.05)', borderRadius: 'var(--radius-sm)' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>ROI: </span>
                          <span style={{ color: batch.roi > 0 ? 'var(--hearst-green)' : '#ff4444', fontWeight: 700, fontSize: 'var(--text-base)' }}>
                            {batch.roi > 0 ? '+' : ''}{batch.roi}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <div style={{ marginTop: 'var(--space-4)', textAlign: 'right' }}>
              <Button variant="outline" size="sm">Voir Plus →</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
