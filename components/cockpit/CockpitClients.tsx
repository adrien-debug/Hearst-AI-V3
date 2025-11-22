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
const ClientsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ContractsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const RevenueIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#ffa500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const GrowthIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M3 17L9 11L13 15L21 7M21 7V11M21 7H17" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function CockpitClients() {
  const [selectedView, setSelectedView] = useState<'overview' | 'revenue' | 'performance'>('overview')

  // Données enrichies
  const clientsData = {
    total: 5,
    active: 5,
    contracts: 12,
    totalRevenue: 10814901.84,
    monthlyRevenue: 901241.82,
    growthRate: 8.5,
    averageContractValue: 901241.82,
  }

  // Données des clients
  const clients = [
    { 
      name: 'Royal Group MENA', 
      contact: 'contact@royalgroup.ae', 
      status: 'active', 
      contracts: 4, 
      hashrate: 6.3,
      btc24h: 0.263521,
      revenue: 4325960.74,
      uptime: 99.1,
      sla: 99.5,
    },
    { 
      name: 'Jason Wilson Family', 
      contact: 'j.wilson@familyoffice.com', 
      status: 'active', 
      contracts: 3, 
      hashrate: 2.9,
      btc24h: 0.121156,
      revenue: 1985184.00,
      uptime: 98.7,
      sla: 99.0,
    },
    { 
      name: 'Akt Account 1', 
      contact: 'admin@aktaccount1.com', 
      status: 'active', 
      contracts: 2, 
      hashrate: 2.5,
      btc24h: 0.104521,
      revenue: 1711539.40,
      uptime: 97.8,
      sla: 98.2,
    },
    { 
      name: 'Akt Account 2', 
      contact: 'admin@aktaccount2.com', 
      status: 'active', 
      contracts: 2, 
      hashrate: 3.3,
      btc24h: 0.137890,
      revenue: 2258194.60,
      uptime: 98.5,
      sla: 98.8,
    },
    { 
      name: 'Dubai Investments', 
      contact: 'mining@dubaiinvestments.ae', 
      status: 'active', 
      contracts: 1, 
      hashrate: 3.8,
      btc24h: 0.158456,
      revenue: 2594023.10,
      uptime: 99.2,
      sla: 99.3,
    },
  ]

  // Données pour les graphiques
  const clientRevenueData = {
    labels: clients.map(c => c.name.split(' ')[0] + '...'),
    revenue: clients.map(c => c.revenue / 1000000), // En millions
  }

  const clientHashrateData = {
    labels: clients.map(c => c.name.split(' ')[0] + '...'),
    hashrate: clients.map(c => c.hashrate),
  }

  const clientUptimeData = {
    labels: clients.map(c => c.name.split(' ')[0] + '...'),
    uptime: clients.map(c => c.uptime),
    sla: clients.map(c => c.sla),
  }

  // Graphique de revenus
  const revenueChartData = {
    labels: clientRevenueData.labels,
    datasets: [
      {
        label: 'Revenus (M USD)',
        data: clientRevenueData.revenue,
        backgroundColor: 'rgba(255, 165, 0, 0.8)',
        borderColor: '#ffa500',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  // Graphique de hashrate
  const hashrateChartData = {
    labels: clientHashrateData.labels,
    datasets: [
      {
        label: 'Hashrate (PH/s)',
        data: clientHashrateData.hashrate,
        backgroundColor: 'rgba(165, 255, 156, 0.8)',
        borderColor: '#a5ff9c',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  // Graphique d'uptime vs SLA
  const uptimeChartData = {
    labels: clientUptimeData.labels,
    datasets: [
      {
        label: 'Uptime (%)',
        data: clientUptimeData.uptime,
        borderColor: '#a5ff9c',
        backgroundColor: 'rgba(165, 255, 156, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Cible SLA (%)',
        data: clientUptimeData.sla,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        fill: true,
        tension: 0.4,
        borderDash: [5, 5],
      },
    ],
  }

  // Répartition des revenus
  const revenueDistributionData = {
    labels: clients.map(c => c.name.split(' ')[0] + '...'),
    datasets: [
      {
        data: clients.map(c => (c.revenue / clientsData.totalRevenue) * 100),
        backgroundColor: [
          'rgba(255, 165, 0, 0.8)',
          'rgba(255, 200, 0, 0.8)',
          'rgba(255, 180, 0, 0.8)',
          'rgba(255, 160, 0, 0.8)',
          'rgba(255, 140, 0, 0.8)',
        ],
        borderColor: [
          '#ffa500',
          '#ffc800',
          '#ffb400',
          '#ffa000',
          '#ff8c00',
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
        borderColor: '#ffa500',
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

  return (
    <div>
      {/* En-tête */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
            Clients
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
            Gestion des clients et contrats
          </p>
        </div>
        <Button>+ Nouveau Client</Button>
      </div>

      {/* KPIs Cards enrichies */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Total Clients</CardTitle>
              <ClientsIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {clientsData.total}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: 'var(--hearst-green)', fontSize: '0.875rem', fontWeight: 600 }}>
                {clientsData.active} actifs
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Clients actifs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Contrats Actifs</CardTitle>
              <ContractsIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {clientsData.contracts}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>↑ 2</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs mois dernier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Contrats en cours
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Moyenne par client</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--hearst-green)' }}>
                {(clientsData.contracts / clientsData.total).toFixed(1)} contrats
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Revenus Mensuels</CardTitle>
              <RevenueIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffa500', marginBottom: 'var(--space-2)' }}>
              ${(clientsData.monthlyRevenue / 1000).toFixed(0)}k
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#ffa500', fontSize: '0.875rem' }}>↑ 5.2%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs mois dernier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Mois en cours
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(255, 165, 0, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Revenus annuels</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#ffa500' }}>
                ${(clientsData.totalRevenue / 1000000).toFixed(1)}M
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Taux de Croissance</CardTitle>
              <GrowthIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              +{clientsData.growthRate}%
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>↑ {clientsData.growthRate}%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs année dernière</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Croissance annuelle
            </p>
            <div style={{ marginTop: 'var(--space-3)', width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(clientsData.growthRate * 10, 100)}%`, height: '100%', background: 'linear-gradient(90deg, #a5ff9c, #8afd81)', borderRadius: '3px' }}></div>
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
          onClick={() => setSelectedView('revenue')}
          style={{
            padding: 'var(--space-3) var(--space-4)',
            background: 'transparent',
            border: 'none',
            borderBottom: selectedView === 'revenue' ? '2px solid var(--hearst-green)' : '2px solid transparent',
            color: selectedView === 'revenue' ? 'var(--hearst-green)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: selectedView === 'revenue' ? 600 : 400,
            transition: 'all var(--duration-fast) var(--ease-in-out)',
          }}
        >
          Revenus
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
      </div>

      {/* Vue d'ensemble */}
      {selectedView === 'overview' && (
        <>
          {/* Graphiques */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <Card>
              <CardHeader>
                <CardTitle>Hashrate par Client</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                  <BarChart data={hashrateChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition des Revenus</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                  <DoughnutChart data={revenueDistributionData} options={doughnutOptions} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tableau */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nom du Client</th>
                      <th>Contact</th>
                      <th>Hashrate</th>
                      <th>BTC 24h</th>
                      <th>Revenus</th>
                      <th>Uptime</th>
                      <th>Contrats</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, index) => {
                      const slaCompliance = client.uptime >= client.sla
                      return (
                        <tr key={index}>
                          <td><strong>{client.name}</strong></td>
                          <td style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{client.contact}</td>
                          <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{client.hashrate} PH/s</td>
                          <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{client.btc24h.toFixed(6)} BTC</td>
                          <td style={{ color: '#ffa500', fontWeight: 600 }}>${(client.revenue / 1000).toFixed(0)}k</td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                              <span style={{ color: slaCompliance ? 'var(--hearst-green)' : '#ffa500', fontWeight: 600 }}>
                                {client.uptime}%
                              </span>
                              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                                (SLA: {client.sla}%)
                              </span>
                            </div>
                          </td>
                          <td>{client.contracts}</td>
                          <td>
                            <span style={{ 
                              color: client.status === 'active' ? 'var(--hearst-green)' : '#ff4d4d',
                              fontWeight: 600,
                            }}>
                              ● {client.status === 'active' ? 'ACTIF' : 'INACTIF'}
                            </span>
                          </td>
                          <td>
                            <Button variant="outline" size="sm">Voir</Button>
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

      {/* Vue Revenus */}
      {selectedView === 'revenue' && (
        <>
          <Card style={{ marginBottom: 'var(--space-6)' }}>
            <CardHeader>
              <CardTitle>Revenus par Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                <BarChart data={revenueChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Détail des Revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Revenus Mensuels</th>
                      <th>Revenus Annuels</th>
                      <th>Part du Total</th>
                      <th>Tendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, index) => {
                      const percentage = (client.revenue / clientsData.totalRevenue) * 100
                      return (
                        <tr key={index}>
                          <td><strong>{client.name}</strong></td>
                          <td style={{ color: '#ffa500', fontWeight: 600 }}>
                            ${((client.revenue / 12) / 1000).toFixed(0)}k
                          </td>
                          <td style={{ color: '#ffa500', fontWeight: 600 }}>
                            ${(client.revenue / 1000000).toFixed(2)}M
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                              <span style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{percentage.toFixed(1)}%</span>
                              <div style={{ width: '100px', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ 
                                  width: `${percentage}%`, 
                                  height: '100%', 
                                  background: 'linear-gradient(90deg, #ffa500, #ff8c00)',
                                  borderRadius: '3px'
                                }}></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span style={{ color: '#a5ff9c', fontWeight: 600 }}>↑ +5.2%</span>
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

      {/* Vue Performance */}
      {selectedView === 'performance' && (
        <>
          <Card style={{ marginBottom: 'var(--space-6)' }}>
            <CardHeader>
              <CardTitle>Uptime vs Cible SLA</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                <LineChart data={uptimeChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance par Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Hashrate</th>
                      <th>Uptime</th>
                      <th>Cible SLA</th>
                      <th>Conformité</th>
                      <th>BTC 24h</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, index) => {
                      const slaCompliance = client.uptime >= client.sla
                      const complianceGap = client.uptime - client.sla
                      return (
                        <tr key={index}>
                          <td><strong>{client.name}</strong></td>
                          <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{client.hashrate} PH/s</td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                              <span style={{ color: slaCompliance ? 'var(--hearst-green)' : '#ffa500', fontWeight: 600 }}>
                                {client.uptime}%
                              </span>
                              <div style={{ width: '80px', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ 
                                  width: `${client.uptime}%`, 
                                  height: '100%', 
                                  background: slaCompliance ? 'linear-gradient(90deg, #a5ff9c, #8afd81)' : 'linear-gradient(90deg, #ffa500, #ff8c00)',
                                  borderRadius: '3px'
                                }}></div>
                              </div>
                            </div>
                          </td>
                          <td>{client.sla}%</td>
                          <td>
                            <span style={{ 
                              color: slaCompliance ? 'var(--hearst-green)' : '#ffa500',
                              fontWeight: 600,
                            }}>
                              {slaCompliance ? '✓ CONFORME' : '⚠ NON CONFORME'}
                            </span>
                            {!slaCompliance && (
                              <div style={{ fontSize: 'var(--text-xs)', color: '#ffa500', marginTop: '2px' }}>
                                -{Math.abs(complianceGap).toFixed(1)}%
                              </div>
                            )}
                          </td>
                          <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{client.btc24h.toFixed(6)} BTC</td>
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
    </div>
  )
}
