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
const WorkersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const OnDutyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6V12L16 14" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TeamIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ActivityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M22 12H18L15 21L9 3L6 12H2" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function CockpitWorkers() {
  const [selectedView, setSelectedView] = useState<'overview' | 'teams' | 'activity'>('overview')
  const [selectedTeam, setSelectedTeam] = useState<string>('all')

  // Données enrichies
  const workersData = {
    total: 42,
    onDuty: 38,
    onBreak: 3,
    offDuty: 1,
    dutyRate: 90.5,
    teams: ['Team Alpha', 'Team Beta', 'Team Gamma'],
  }

  // Données des workers
  const workers = [
    { id: 'Worker-001', name: 'Jean Dupont', role: 'Mining Operator', team: 'Team Alpha', status: 'active', hoursWorked: 168, efficiency: 98.5, tasksCompleted: 45 },
    { id: 'Worker-002', name: 'Marie Martin', role: 'Maintenance Tech', team: 'Team Beta', status: 'active', hoursWorked: 165, efficiency: 97.2, tasksCompleted: 38 },
    { id: 'Worker-003', name: 'Pierre Durand', role: 'Mining Operator', team: 'Team Alpha', status: 'active', hoursWorked: 170, efficiency: 99.1, tasksCompleted: 52 },
    { id: 'Worker-004', name: 'Sophie Bernard', role: 'System Admin', team: 'Team Gamma', status: 'on-break', hoursWorked: 160, efficiency: 96.8, tasksCompleted: 42 },
    { id: 'Worker-005', name: 'Luc Moreau', role: 'Mining Operator', team: 'Team Beta', status: 'active', hoursWorked: 172, efficiency: 98.9, tasksCompleted: 48 },
    { id: 'Worker-006', name: 'Emma Petit', role: 'Maintenance Tech', team: 'Team Alpha', status: 'active', hoursWorked: 158, efficiency: 97.5, tasksCompleted: 35 },
    { id: 'Worker-007', name: 'Thomas Roux', role: 'Mining Operator', team: 'Team Gamma', status: 'active', hoursWorked: 166, efficiency: 98.2, tasksCompleted: 44 },
    { id: 'Worker-008', name: 'Julie Blanc', role: 'System Admin', team: 'Team Beta', status: 'on-break', hoursWorked: 155, efficiency: 96.5, tasksCompleted: 40 },
    { id: 'Worker-009', name: 'Antoine Noir', role: 'Mining Operator', team: 'Team Alpha', status: 'active', hoursWorked: 169, efficiency: 99.3, tasksCompleted: 50 },
    { id: 'Worker-010', name: 'Camille Vert', role: 'Maintenance Tech', team: 'Team Gamma', status: 'off-duty', hoursWorked: 0, efficiency: 0, tasksCompleted: 0 },
  ]

  const filteredWorkers = selectedTeam === 'all' 
    ? workers 
    : workers.filter(w => w.team === selectedTeam)

  // Données pour les graphiques
  const workersByTeamData = {
    labels: workersData.teams,
    active: [
      workers.filter(w => w.team === 'Team Alpha' && w.status === 'active').length,
      workers.filter(w => w.team === 'Team Beta' && w.status === 'active').length,
      workers.filter(w => w.team === 'Team Gamma' && w.status === 'active').length,
    ],
    total: [
      workers.filter(w => w.team === 'Team Alpha').length,
      workers.filter(w => w.team === 'Team Beta').length,
      workers.filter(w => w.team === 'Team Gamma').length,
    ],
  }

  const workersByRoleData = {
    labels: ['Mining Operator', 'Maintenance Tech', 'System Admin'],
    data: [
      workers.filter(w => w.role === 'Mining Operator').length,
      workers.filter(w => w.role === 'Maintenance Tech').length,
      workers.filter(w => w.role === 'System Admin').length,
    ],
  }

  const workersStatusData = {
    labels: ['Actif', 'En Pause', 'Hors Service'],
    datasets: [
      {
        data: [workersData.onDuty, workersData.onBreak, workersData.offDuty],
        backgroundColor: [
          'rgba(165, 255, 156, 0.8)',
          'rgba(255, 165, 0, 0.8)',
          'rgba(255, 77, 77, 0.8)',
        ],
        borderColor: [
          '#a5ff9c',
          '#ffa500',
          '#ff4d4d',
        ],
        borderWidth: 2,
      },
    ],
  }

  // Graphique de workers par équipe
  const workersByTeamChartData = {
    labels: workersByTeamData.labels,
    datasets: [
      {
        label: 'Workers Actifs',
        data: workersByTeamData.active,
        backgroundColor: 'rgba(165, 255, 156, 0.8)',
        borderColor: '#a5ff9c',
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: 'Total Workers',
        data: workersByTeamData.total,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  // Graphique de workers par rôle
  const workersByRoleChartData = {
    labels: workersByRoleData.labels,
    datasets: [
      {
        label: 'Nombre de Workers',
        data: workersByRoleData.data,
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
        borderRadius: 4,
      },
    ],
  }

  // Graphique d'activité (heures travaillées)
  const activityData = {
    labels: workers.slice(0, 10).map(w => w.name.split(' ')[0]),
    hoursWorked: workers.slice(0, 10).map(w => w.hoursWorked),
    efficiency: workers.slice(0, 10).map(w => w.efficiency),
  }

  const activityChartData = {
    labels: activityData.labels,
    datasets: [
      {
        label: 'Heures Travaillées (7j)',
        data: activityData.hoursWorked,
        backgroundColor: 'rgba(165, 255, 156, 0.8)',
        borderColor: '#a5ff9c',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  const efficiencyChartData = {
    labels: activityData.labels,
    datasets: [
      {
        label: 'Efficacité (%)',
        data: activityData.efficiency,
        borderColor: '#a5ff9c',
        backgroundColor: 'rgba(165, 255, 156, 0.1)',
        fill: true,
        tension: 0.4,
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
            Activité des Mineurs
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
            Gestion et suivi des workers
          </p>
        </div>
        <Button>+ Ajouter un Worker</Button>
      </div>

      {/* KPIs Cards enrichies */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Total Workers</CardTitle>
              <WorkersIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {workersData.total}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: 'var(--hearst-green)', fontSize: '0.875rem', fontWeight: 600 }}>
                {workersData.onDuty} en service
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Workers actifs
            </p>
            <div style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-xs)' }}>
              <span style={{ color: '#ffa500' }}>● {workersData.onBreak} en pause</span>
              <span style={{ color: '#ff4d4d' }}>● {workersData.offDuty} hors service</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>En Service</CardTitle>
              <OnDutyIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {workersData.onDuty}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>→ Stable</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs moyenne</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Actuellement au travail
            </p>
            <div style={{ marginTop: 'var(--space-3)', width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${workersData.dutyRate}%`, height: '100%', background: 'linear-gradient(90deg, #a5ff9c, #8afd81)', borderRadius: '3px' }}></div>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
              {workersData.dutyRate}% en service
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Équipes</CardTitle>
              <TeamIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {workersData.teams.length}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Équipes actives
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Organisation
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Moyenne par équipe</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--hearst-green)' }}>
                {Math.round(workersData.total / workersData.teams.length)} workers
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Taux d'Activité</CardTitle>
              <ActivityIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {workersData.dutyRate}%
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>↑ 2.5%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs semaine dernière</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Workers en service
            </p>
            <div style={{ marginTop: 'var(--space-3)', width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${workersData.dutyRate}%`, height: '100%', background: 'linear-gradient(90deg, #a5ff9c, #8afd81)', borderRadius: '3px' }}></div>
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
          onClick={() => setSelectedView('teams')}
          style={{
            padding: 'var(--space-3) var(--space-4)',
            background: 'transparent',
            border: 'none',
            borderBottom: selectedView === 'teams' ? '2px solid var(--hearst-green)' : '2px solid transparent',
            color: selectedView === 'teams' ? 'var(--hearst-green)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: selectedView === 'teams' ? 600 : 400,
            transition: 'all var(--duration-fast) var(--ease-in-out)',
          }}
        >
          Par Équipe
        </button>
        <button
          onClick={() => setSelectedView('activity')}
          style={{
            padding: 'var(--space-3) var(--space-4)',
            background: 'transparent',
            border: 'none',
            borderBottom: selectedView === 'activity' ? '2px solid var(--hearst-green)' : '2px solid transparent',
            color: selectedView === 'activity' ? 'var(--hearst-green)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: selectedView === 'activity' ? 600 : 400,
            transition: 'all var(--duration-fast) var(--ease-in-out)',
          }}
        >
          Activité
        </button>
      </div>

      {/* Vue d'ensemble */}
      {selectedView === 'overview' && (
        <>
          {/* Graphiques */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <Card>
              <CardHeader>
                <CardTitle>Workers par Équipe</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                  <BarChart data={workersByTeamChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition par Rôle</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                  <BarChart data={workersByRoleChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Graphique en donut */}
          <Card style={{ marginBottom: 'var(--space-6)' }}>
            <CardHeader>
              <CardTitle>Statut des Workers</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                <DoughnutChart data={workersStatusData} options={doughnutOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Filtres et tableau */}
          <Card>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                <CardTitle>Liste des Workers</CardTitle>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setSelectedTeam('all')}
                    style={{
                      padding: 'var(--space-2) var(--space-3)',
                      background: selectedTeam === 'all' ? 'rgba(165, 255, 156, 0.2)' : 'transparent',
                      border: `1px solid ${selectedTeam === 'all' ? '#a5ff9c' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-sm)',
                      color: selectedTeam === 'all' ? '#a5ff9c' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: 'var(--text-sm)',
                    }}
                  >
                    Toutes
                  </button>
                  {workersData.teams.map((team) => (
                    <button
                      key={team}
                      onClick={() => setSelectedTeam(team)}
                      style={{
                        padding: 'var(--space-2) var(--space-3)',
                        background: selectedTeam === team ? 'rgba(165, 255, 156, 0.2)' : 'transparent',
                        border: `1px solid ${selectedTeam === team ? '#a5ff9c' : 'var(--border)'}`,
                        borderRadius: 'var(--radius-sm)',
                        color: selectedTeam === team ? '#a5ff9c' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: 'var(--text-sm)',
                      }}
                    >
                      {team}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Rôle</th>
                      <th>Équipe</th>
                      <th>Heures (7j)</th>
                      <th>Efficacité</th>
                      <th>Tâches</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWorkers.map((worker) => (
                      <tr key={worker.id}>
                        <td><strong>{worker.name}</strong></td>
                        <td>{worker.role}</td>
                        <td>
                          <span style={{ 
                            padding: 'var(--space-1) var(--space-2)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: 'var(--text-xs)',
                            background: 'rgba(165, 255, 156, 0.1)',
                            color: 'var(--hearst-green)',
                            fontWeight: 600,
                          }}>
                            {worker.team}
                          </span>
                        </td>
                        <td>
                          <span style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>
                            {worker.hoursWorked}h
                          </span>
                        </td>
                        <td>
                          {worker.efficiency > 0 ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                              <span style={{ 
                                color: worker.efficiency >= 98 ? 'var(--hearst-green)' : worker.efficiency >= 96 ? '#ffa500' : '#ff4444',
                                fontWeight: 600,
                              }}>
                                {worker.efficiency}%
                              </span>
                              <div style={{ width: '60px', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ 
                                  width: `${worker.efficiency}%`, 
                                  height: '100%', 
                                  background: worker.efficiency >= 98 ? 'linear-gradient(90deg, #a5ff9c, #8afd81)' : worker.efficiency >= 96 ? 'linear-gradient(90deg, #ffa500, #ff8c00)' : 'linear-gradient(90deg, #ff4d4d, #ff3333)',
                                  borderRadius: '2px'
                                }}></div>
                              </div>
                            </div>
                          ) : (
                            <span style={{ color: 'var(--text-secondary)' }}>-</span>
                          )}
                        </td>
                        <td>
                          <span style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>
                            {worker.tasksCompleted}
                          </span>
                        </td>
                        <td>
                          <span style={{ 
                            color: worker.status === 'active' ? 'var(--hearst-green)' : worker.status === 'on-break' ? '#ffa500' : '#ff4d4d',
                            fontWeight: 600,
                          }}>
                            {worker.status === 'active' ? '● ACTIF' : worker.status === 'on-break' ? '◐ EN PAUSE' : '○ HORS SERVICE'}
                          </span>
                        </td>
                        <td>
                          <Button variant="outline" size="sm">Voir</Button>
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

      {/* Vue Par Équipe */}
      {selectedView === 'teams' && (
        <>
          <Card style={{ marginBottom: 'var(--space-6)' }}>
            <CardHeader>
              <CardTitle>Workers par Équipe</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                <BarChart data={workersByTeamChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--space-6)' }}>
            {workersData.teams.map((team) => {
              const teamWorkers = workers.filter(w => w.team === team)
              const activeWorkers = teamWorkers.filter(w => w.status === 'active').length
              const avgEfficiency = teamWorkers.filter(w => w.efficiency > 0).reduce((sum, w) => sum + w.efficiency, 0) / teamWorkers.filter(w => w.efficiency > 0).length
              const totalHours = teamWorkers.reduce((sum, w) => sum + w.hoursWorked, 0)
              const totalTasks = teamWorkers.reduce((sum, w) => sum + w.tasksCompleted, 0)

              return (
                <Card key={team}>
                  <CardHeader>
                    <CardTitle>{team}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                      <div style={{ padding: 'var(--space-4)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(165, 255, 156, 0.1)' }}>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>Workers</div>
                        <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--hearst-green)' }}>
                          {teamWorkers.length}
                        </div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
                          {activeWorkers} actifs
                        </div>
                      </div>

                      <div style={{ padding: 'var(--space-4)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(165, 255, 156, 0.1)' }}>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>Efficacité Moyenne</div>
                        <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--hearst-green)' }}>
                          {avgEfficiency.toFixed(1)}%
                        </div>
                        <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden', marginTop: 'var(--space-2)' }}>
                          <div style={{ width: `${avgEfficiency}%`, height: '100%', background: 'linear-gradient(90deg, #a5ff9c, #8afd81)', borderRadius: '4px' }}></div>
                        </div>
                      </div>

                      <div style={{ padding: 'var(--space-4)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(165, 255, 156, 0.1)' }}>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>Heures Travaillées (7j)</div>
                        <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--hearst-green)' }}>
                          {totalHours}h
                        </div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
                          Moyenne: {Math.round(totalHours / teamWorkers.length)}h/worker
                        </div>
                      </div>

                      <div style={{ padding: 'var(--space-4)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(165, 255, 156, 0.1)' }}>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>Tâches Complétées</div>
                        <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--hearst-green)' }}>
                          {totalTasks}
                        </div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
                          Moyenne: {Math.round(totalTasks / teamWorkers.length)}/worker
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </>
      )}

      {/* Vue Activité */}
      {selectedView === 'activity' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <Card>
              <CardHeader>
                <CardTitle>Heures Travaillées (7 jours)</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                  <BarChart data={activityChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Efficacité par Worker</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                  <LineChart data={efficiencyChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Détail de l'Activité</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Worker</th>
                      <th>Rôle</th>
                      <th>Équipe</th>
                      <th>Heures (7j)</th>
                      <th>Efficacité</th>
                      <th>Tâches Complétées</th>
                      <th>Taux de Complétion</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workers.map((worker) => {
                      const completionRate = worker.tasksCompleted > 0 ? Math.min((worker.tasksCompleted / 50) * 100, 100) : 0
                      return (
                        <tr key={worker.id}>
                          <td><strong>{worker.name}</strong></td>
                          <td>{worker.role}</td>
                          <td>
                            <span style={{ 
                              padding: 'var(--space-1) var(--space-2)',
                              borderRadius: 'var(--radius-sm)',
                              fontSize: 'var(--text-xs)',
                              background: 'rgba(165, 255, 156, 0.1)',
                              color: 'var(--hearst-green)',
                              fontWeight: 600,
                            }}>
                              {worker.team}
                            </span>
                          </td>
                          <td>
                            <span style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>
                              {worker.hoursWorked}h
                            </span>
                          </td>
                          <td>
                            {worker.efficiency > 0 ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                <span style={{ 
                                  color: worker.efficiency >= 98 ? 'var(--hearst-green)' : worker.efficiency >= 96 ? '#ffa500' : '#ff4444',
                                  fontWeight: 600,
                                }}>
                                  {worker.efficiency}%
                                </span>
                                <div style={{ width: '60px', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                  <div style={{ 
                                    width: `${worker.efficiency}%`, 
                                    height: '100%', 
                                    background: worker.efficiency >= 98 ? 'linear-gradient(90deg, #a5ff9c, #8afd81)' : worker.efficiency >= 96 ? 'linear-gradient(90deg, #ffa500, #ff8c00)' : 'linear-gradient(90deg, #ff4d4d, #ff3333)',
                                    borderRadius: '2px'
                                  }}></div>
                                </div>
                              </div>
                            ) : (
                              <span style={{ color: 'var(--text-secondary)' }}>-</span>
                            )}
                          </td>
                          <td>
                            <span style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>
                              {worker.tasksCompleted}
                            </span>
                          </td>
                          <td>
                            {completionRate > 0 ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                <span style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>
                                  {completionRate.toFixed(0)}%
                                </span>
                                <div style={{ width: '60px', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                  <div style={{ 
                                    width: `${completionRate}%`, 
                                    height: '100%', 
                                    background: 'linear-gradient(90deg, #a5ff9c, #8afd81)',
                                    borderRadius: '2px'
                                  }}></div>
                                </div>
                              </div>
                            ) : (
                              <span style={{ color: 'var(--text-secondary)' }}>-</span>
                            )}
                          </td>
                          <td>
                            <span style={{ 
                              color: worker.status === 'active' ? 'var(--hearst-green)' : worker.status === 'on-break' ? '#ffa500' : '#ff4d4d',
                              fontWeight: 600,
                            }}>
                              {worker.status === 'active' ? '● ACTIF' : worker.status === 'on-break' ? '◐ EN PAUSE' : '○ HORS SERVICE'}
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
    </div>
  )
}
