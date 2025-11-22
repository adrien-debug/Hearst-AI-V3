'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getElectricity } from '@/lib/api'
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
const PowerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M13 2L13 12M18.36 6.64C19.6184 7.89879 20.4753 9.50244 20.8223 11.2482C21.1693 12.9939 20.9909 14.8034 20.3076 16.4478C19.6244 18.0921 18.4658 19.4976 16.9998 20.4864C15.5338 21.4752 13.8211 22.0029 12.075 22.0029C10.3289 22.0029 8.61623 21.4752 7.15021 20.4864C5.68418 19.4976 4.52563 18.0921 3.84236 16.4478C3.15909 14.8034 2.98067 12.9939 3.32768 11.2482C3.67468 9.50244 4.53157 7.89879 5.79 6.64" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M3 3V21H21M7 16L12 11L16 15L21 10M21 10H16M21 10V15" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TrendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M3 17L9 11L13 15L21 7M21 7V11M21 7H17" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CostIcon = () => (
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

export default function ElectricityConsumption() {
  const [data, setData] = useState<any>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<'hourly' | 'daily' | 'weekly'>('hourly')

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getElectricity()
        setData(response.data || response)
      } catch (err) {
        console.error('Error loading electricity data:', err)
        // Fallback to mock data
        setData({
          current_power: 1250.5,
          daily_consumption: 30012.0,
          monthly_consumption: 900360.0,
          daily_cost: 2400.96,
        })
      }
    }
    loadData()
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
  }, [])

  // Fusion des données avec les valeurs par défaut pour éviter les undefined
  const defaultData = {
    current_power: 1250.5,
    daily_consumption: 30012.0,
    monthly_consumption: 900360.0,
    daily_cost: 2400.96,
  }
  
  const displayData = { ...defaultData, ...(data || {}) }

  // Données pour les graphiques
  const hourlyData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}h`),
    data: Array.from({ length: 24 }, () => Math.random() * 200 + 1100),
  }

  const dailyData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    data: [29500, 30120, 29850, 30500, 30200, 29800, 30012],
  }

  const weeklyData = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    data: [220000, 225000, 230000, 225360],
  }

  const chartData = selectedPeriod === 'hourly' ? hourlyData : selectedPeriod === 'daily' ? dailyData : weeklyData

  const consumptionLineData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Consommation (kWh)',
        data: chartData.data,
        borderColor: '#a5ff9c',
        backgroundColor: 'rgba(165, 255, 156, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const consumptionBarData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Consommation (kWh)',
        data: chartData.data,
        backgroundColor: chartData.data.map((_, i) => 
          i % 2 === 0 ? 'rgba(165, 255, 156, 0.8)' : 'rgba(138, 253, 129, 0.8)'
        ),
        borderColor: chartData.data.map((_, i) => 
          i % 2 === 0 ? '#a5ff9c' : '#8afd81'
        ),
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

  const farmsData = [
    { name: 'Farm A - Montréal', power: 450.2, consumption: 10804.8, cost: 864.38, status: 'active', miners: 128, efficiency: 35.8 },
    { name: 'Farm B - Québec', power: 380.5, consumption: 9132.0, cost: 730.56, status: 'active', miners: 108, efficiency: 36.2 },
    { name: 'Farm C - Toronto', power: 419.8, consumption: 10075.2, cost: 806.02, status: 'active', miners: 120, efficiency: 34.5 },
    { name: 'Farm D - Vancouver', power: 285.3, consumption: 6847.2, cost: 547.78, status: 'active', miners: 82, efficiency: 37.1 },
  ]

  return (
    <div>
      {/* KPI Cards enrichies */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Puissance Actuelle</CardTitle>
              <PowerIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {(displayData.current_power ?? 0).toFixed(1)} kW
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>↑ 2.3%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs hier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Temps réel
            </p>
            <div style={{ marginTop: 'var(--space-3)', width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '78%', height: '100%', background: 'linear-gradient(90deg, #a5ff9c, #8afd81)', borderRadius: '3px' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Consommation Quotidienne</CardTitle>
              <ChartIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {(displayData.daily_consumption ?? 0).toFixed(0)} kWh
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>↓ 1.2%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs moyenne</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Dernières 24 heures
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Moyenne horaire</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--hearst-green)' }}>
                {((displayData.daily_consumption ?? 0) / 24).toFixed(0)} kWh/h
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Consommation Mensuelle</CardTitle>
              <TrendIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {((displayData.monthly_consumption ?? 0) / 1000).toFixed(1)} MWh
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>↑ 5.8%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs mois dernier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Mois en cours
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Moyenne quotidienne</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--hearst-green)' }}>
                {((displayData.monthly_consumption ?? 0) / 30).toFixed(0)} kWh/jour
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Coût Quotidien</CardTitle>
              <CostIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              ${(displayData.daily_cost ?? 0).toFixed(2)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#ffa500', fontSize: '0.875rem' }}>↑ 0.8%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs hier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Dernières 24 heures
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(255, 165, 0, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Coût horaire moyen</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#ffa500' }}>
                ${((displayData.daily_cost ?? 0) / 24).toFixed(2)}/h
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques de consommation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              <CardTitle>Évolution de la Consommation</CardTitle>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <button
                  onClick={() => setSelectedPeriod('hourly')}
                  style={{
                    padding: 'var(--space-2) var(--space-3)',
                    background: selectedPeriod === 'hourly' ? 'rgba(165, 255, 156, 0.2)' : 'transparent',
                    border: `1px solid ${selectedPeriod === 'hourly' ? '#a5ff9c' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    color: selectedPeriod === 'hourly' ? '#a5ff9c' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  Horaire
                </button>
                <button
                  onClick={() => setSelectedPeriod('daily')}
                  style={{
                    padding: 'var(--space-2) var(--space-3)',
                    background: selectedPeriod === 'daily' ? 'rgba(165, 255, 156, 0.2)' : 'transparent',
                    border: `1px solid ${selectedPeriod === 'daily' ? '#a5ff9c' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    color: selectedPeriod === 'daily' ? '#a5ff9c' : 'var(--text-secondary)',
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
                    background: selectedPeriod === 'weekly' ? 'rgba(165, 255, 156, 0.2)' : 'transparent',
                    border: `1px solid ${selectedPeriod === 'weekly' ? '#a5ff9c' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    color: selectedPeriod === 'weekly' ? '#a5ff9c' : 'var(--text-secondary)',
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
              <LineChart data={consumptionLineData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consommation par Période</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
              <BarChart data={consumptionBarData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau des fermes enrichi */}
      <Card>
        <CardHeader>
          <CardTitle>Consommation par Ferme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Ferme</th>
                  <th>Puissance Actuelle</th>
                  <th>Consommation Quotidienne</th>
                  <th>Coût Quotidien</th>
                  <th>Mineurs</th>
                  <th>Efficacité</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {farmsData.map((farm, index) => (
                  <tr key={index}>
                    <td><strong>{farm.name}</strong></td>
                    <td>{farm.power.toFixed(1)} kW</td>
                    <td>{farm.consumption.toFixed(1)} kWh</td>
                    <td>${farm.cost.toFixed(2)}</td>
                    <td>{farm.miners}</td>
                    <td>{farm.efficiency} J/TH</td>
                    <td>
                      <span style={{ 
                        color: farm.status === 'active' ? 'var(--hearst-green)' : '#ff4d4d',
                        fontWeight: 600,
                      }}>
                        ● {farm.status === 'active' ? 'ACTIF' : 'INACTIF'}
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

