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
const OpenIncidentsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ffa500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ResolvedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12L11 15L16 9" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ResolutionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 19.07L16.24 16.24M19.07 4.93L16.24 7.76M4.93 19.07L7.76 16.24M4.93 4.93L7.76 7.76" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const SLAIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M9 11L12 14L22 4" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function CockpitIncidents() {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const [selectedSeverity, setSelectedSeverity] = useState<'all' | 'critical' | 'major' | 'minor'>('all')

  // Données enrichies
  const incidentsData = {
    open: 3,
    resolved24h: 7,
    resolved7d: 42,
    resolved30d: 185,
    averageResolution: 2.5,
    slaCompliance: 96.5,
    criticalOpen: 1,
    majorOpen: 2,
    minorOpen: 0,
  }

  // Données pour les graphiques
  const incidentsByDay = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    open: [2, 3, 2, 4, 3, 2, 3],
    resolved: [5, 7, 6, 8, 7, 6, 7],
  }

  const incidentsByType = {
    labels: ['Hashrate Drop', 'Temperature High', 'Miners Offline', 'Uptime Below', 'Power Issue'],
    data: [12, 8, 15, 6, 4],
  }

  const incidentsBySeverity = {
    labels: ['Critique', 'Majeur', 'Mineur'],
    datasets: [
      {
        data: [incidentsData.criticalOpen, incidentsData.majorOpen, incidentsData.minorOpen],
        backgroundColor: [
          'rgba(255, 68, 68, 0.8)',
          'rgba(255, 165, 0, 0.8)',
          'rgba(255, 200, 0, 0.8)',
        ],
        borderColor: [
          '#ff4444',
          '#ffa500',
          '#ffc800',
        ],
        borderWidth: 2,
      },
    ],
  }

  // Graphique d'évolution des incidents
  const incidentsTrendData = {
    labels: incidentsByDay.labels,
    datasets: [
      {
        label: 'Incidents Ouverts',
        data: incidentsByDay.open,
        borderColor: '#ffa500',
        backgroundColor: 'rgba(255, 165, 0, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Incidents Résolus',
        data: incidentsByDay.resolved,
        borderColor: '#A7FB90',
        backgroundColor: 'rgba(167, 251, 144, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Graphique par type
  const incidentsByTypeChartData = {
    labels: incidentsByType.labels,
    datasets: [
      {
        label: 'Nombre d\'incidents',
        data: incidentsByType.data,
        backgroundColor: [
          'rgba(255, 68, 68, 0.8)',
          'rgba(255, 165, 0, 0.8)',
          'rgba(255, 200, 0, 0.8)',
          'rgba(167, 251, 144, 0.8)',
          'rgba(167, 251, 144, 0.8)',
        ],
        borderColor: [
          '#ff4444',
          '#ffa500',
          '#ffc800',
          '#A7FB90',
          '#A7FB90',
        ],
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
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          stepSize: 1,
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
      },
    },
  }

  // Liste des incidents enrichie
  const incidents = [
    { id: 'INC-2025-001', type: 'Hashrate Drop', severity: 'critical', status: 'open', created: '2025-01-15 14:23', resolved: null, affected: 'Farm A - 12 miners', resolution: null },
    { id: 'INC-2025-002', type: 'Temperature High', severity: 'major', status: 'open', created: '2025-01-15 16:45', resolved: null, affected: 'Farm B - Rack 2', resolution: null },
    { id: 'INC-2025-003', type: 'Miners Offline', severity: 'major', status: 'open', created: '2025-01-15 18:12', resolved: null, affected: 'Farm C - 8 miners', resolution: null },
    { id: 'INC-2025-004', type: 'Uptime Below', severity: 'minor', status: 'resolved', created: '2025-01-14 09:30', resolved: '2025-01-14 11:45', affected: 'Farm D', resolution: '2.25h' },
    { id: 'INC-2025-005', type: 'Power Consumption', severity: 'minor', status: 'resolved', created: '2025-01-14 12:15', resolved: '2025-01-14 13:20', affected: 'Farm A', resolution: '1.08h' },
    { id: 'INC-2025-006', type: 'Hashrate Drop', severity: 'major', status: 'resolved', created: '2025-01-13 10:00', resolved: '2025-01-13 12:30', affected: 'Farm B', resolution: '2.5h' },
    { id: 'INC-2025-007', type: 'Temperature High', severity: 'minor', status: 'resolved', created: '2025-01-13 14:20', resolved: '2025-01-13 15:45', affected: 'Farm C', resolution: '1.42h' },
  ]

  const filteredIncidents = selectedSeverity === 'all' 
    ? incidents 
    : incidents.filter(inc => inc.severity === selectedSeverity)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ff4444'
      case 'major': return '#ffa500'
      case 'minor': return '#ffc800'
      default: return 'var(--text-secondary)'
    }
  }

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'critical': return 'CRITIQUE'
      case 'major': return 'MAJEUR'
      case 'minor': return 'MINEUR'
      default: return severity.toUpperCase()
    }
  }

  return (
    <div>
      {/* KPIs Cards enrichies */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Incidents Ouverts</CardTitle>
              <OpenIncidentsIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffa500', marginBottom: 'var(--space-2)' }}>
              {incidentsData.open}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#ffa500', fontSize: '0.875rem' }}>→ Stable</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs moyenne</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Incidents actifs
            </p>
            <div style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-xs)' }}>
              <span style={{ color: '#ff4444' }}>● {incidentsData.criticalOpen} Critique</span>
              <span style={{ color: '#ffa500' }}>● {incidentsData.majorOpen} Majeur</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Résolus (24h)</CardTitle>
              <ResolvedIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {incidentsData.resolved24h}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#A7FB90', fontSize: '0.875rem' }}>↑ 12.5%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs hier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Dernières 24 heures
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(167, 251, 144, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Résolus (7j)</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--hearst-green)' }}>
                {incidentsData.resolved7d} incidents
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Temps de Résolution</CardTitle>
              <ResolutionIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {incidentsData.averageResolution}h
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#A7FB90', fontSize: '0.875rem' }}>↓ 15%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs moyenne</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Temps moyen de résolution
            </p>
            <div style={{ marginTop: 'var(--space-3)', width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #A7FB90, #A7FB90)', borderRadius: '3px' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Conformité SLA</CardTitle>
              <SLAIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {incidentsData.slaCompliance}%
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#A7FB90', fontSize: '0.875rem' }}>↑ 2.3%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs mois dernier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Taux de conformité
            </p>
            <div style={{ marginTop: 'var(--space-3)', width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${incidentsData.slaCompliance}%`, height: '100%', background: 'linear-gradient(90deg, #A7FB90, #A7FB90)', borderRadius: '3px' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>Évolution des Incidents (7 jours)</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
              <LineChart data={incidentsTrendData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Incidents par Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
              <BarChart data={incidentsByTypeChartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphique en donut et filtres */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Sévérité</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
              <DoughnutChart data={incidentsBySeverity} options={doughnutOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques de Résolution</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
              <div style={{ padding: 'var(--space-4)', background: 'rgba(167, 251, 144, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(167, 251, 144, 0.1)' }}>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>Résolus (30 jours)</div>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--hearst-green)' }}>
                  {incidentsData.resolved30d}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
                  Moyenne: {(incidentsData.resolved30d / 30).toFixed(1)}/jour
                </div>
              </div>

              <div style={{ padding: 'var(--space-4)', background: 'rgba(167, 251, 144, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(167, 251, 144, 0.1)' }}>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>Taux de Résolution</div>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--hearst-green)' }}>
                  {((incidentsData.resolved24h / (incidentsData.resolved24h + incidentsData.open)) * 100).toFixed(1)}%
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
                  Sur 24 heures
                </div>
              </div>

              <div style={{ padding: 'var(--space-4)', background: 'rgba(255, 165, 0, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 165, 0, 0.1)' }}>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>Temps de Résolution Moyen</div>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: '#ffa500' }}>
                  {incidentsData.averageResolution}h
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
                  Objectif: &lt; 4h
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et tableau */}
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <CardTitle>Incidents Récents</CardTitle>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedSeverity('all')}
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  background: selectedSeverity === 'all' ? 'rgba(167, 251, 144, 0.2)' : 'transparent',
                  border: `1px solid ${selectedSeverity === 'all' ? '#A7FB90' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-sm)',
                  color: selectedSeverity === 'all' ? '#A7FB90' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Tous
              </button>
              <button
                onClick={() => setSelectedSeverity('critical')}
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  background: selectedSeverity === 'critical' ? 'rgba(255, 68, 68, 0.2)' : 'transparent',
                  border: `1px solid ${selectedSeverity === 'critical' ? '#ff4444' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-sm)',
                  color: selectedSeverity === 'critical' ? '#ff4444' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Critique
              </button>
              <button
                onClick={() => setSelectedSeverity('major')}
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  background: selectedSeverity === 'major' ? 'rgba(255, 165, 0, 0.2)' : 'transparent',
                  border: `1px solid ${selectedSeverity === 'major' ? '#ffa500' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-sm)',
                  color: selectedSeverity === 'major' ? '#ffa500' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Majeur
              </button>
              <button
                onClick={() => setSelectedSeverity('minor')}
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  background: selectedSeverity === 'minor' ? 'rgba(255, 200, 0, 0.2)' : 'transparent',
                  border: `1px solid ${selectedSeverity === 'minor' ? '#ffc800' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-sm)',
                  color: selectedSeverity === 'minor' ? '#ffc800' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Mineur
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Sévérité</th>
                  <th>Statut</th>
                  <th>Affecté</th>
                  <th>Créé</th>
                  <th>Résolu</th>
                  <th>Temps</th>
                </tr>
              </thead>
              <tbody>
                {filteredIncidents.map((incident) => (
                  <tr key={incident.id}>
                    <td><strong>{incident.id}</strong></td>
                    <td>{incident.type}</td>
                    <td>
                      <span style={{ 
                        color: getSeverityColor(incident.severity),
                        fontWeight: 600,
                      }}>
                        ● {getSeverityLabel(incident.severity)}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        color: incident.status === 'open' ? '#ffa500' : 'var(--hearst-green)',
                        fontWeight: 600,
                      }}>
                        {incident.status === 'open' ? '● OUVERT' : '✓ RÉSOLU'}
                      </span>
                    </td>
                    <td style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{incident.affected}</td>
                    <td>{incident.created}</td>
                    <td>{incident.resolved || '-'}</td>
                    <td>
                      {incident.resolution ? (
                        <span style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>{incident.resolution}</span>
                      ) : (
                        <span style={{ color: '#ffa500' }}>En cours...</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 'var(--space-4)', textAlign: 'right' }}>
            <Button variant="outline" size="sm">Voir Tous les Incidents →</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
