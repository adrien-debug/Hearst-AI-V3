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

// Dynamically import Chart.js components to avoid SSR issues
const LineChart = dynamic(
  () => import('react-chartjs-2').then((mod) => ({ default: mod.Line })),
  { 
    ssr: false,
    loading: () => <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Chargement du graphique...</div>
  }
)

const BarChart = dynamic(
  () => import('react-chartjs-2').then((mod) => ({ default: mod.Bar })),
  { 
    ssr: false,
    loading: () => <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Chargement du graphique...</div>
  }
)

const DoughnutChart = dynamic(
  () => import('react-chartjs-2').then((mod) => ({ default: mod.Doughnut })),
  { 
    ssr: false,
    loading: () => <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Chargement du graphique...</div>
  }
)

// Register Chart.js components
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

interface ElectricityData {
  current_power?: number
  daily_consumption?: number
  monthly_consumption?: number
  daily_cost?: number
  monthly_cost?: number
  cost_per_kwh?: number
  miners?: Array<{
    name: string
    status: string
    hashrate: string
    power: number
    temp: number
  }>
  timestamp?: string
}

interface ElectricityViewProps {
  data?: ElectricityData | null
}

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

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.6 }}>
    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function ElectricityView({ data }: ElectricityViewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  
  const refreshData = () => {
    window.location.reload()
  }

  // Données par défaut si aucune donnée n'est fournie
  const defaultData = {
    current_power: 1250.5,
    daily_consumption: 30012.0,
    monthly_consumption: 900360.0,
    daily_cost: 2400.96,
    monthly_cost: 72028.8,
    cost_per_kwh: 0.08,
    efficiency: 36.2,
    powerFactor: 0.95,
    peakDemand: 1350.8,
    carbonFootprint: 45.2,
  }

  // Fusion des données avec les valeurs par défaut pour éviter les undefined
  const displayData = { ...defaultData, ...(data || {}) }

  // Données pour le graphique de consommation
  const consumptionData = {
    daily: {
      labels: ['00h', '04h', '08h', '12h', '16h', '20h', '24h'],
      data: [1150, 1200, 1250, 1300, 1280, 1250, 1200],
    },
    weekly: {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      data: [29500, 30120, 29850, 30500, 30200, 29800, 30012],
    },
    monthly: {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
      data: [220000, 225000, 230000, 225360],
    },
  }

  const currentConsumptionData = consumptionData[selectedPeriod]

  // Données pour le graphique de coûts
  const costData = {
    labels: currentConsumptionData.labels,
    datasets: [
      {
        label: 'Coût (USD)',
        data: currentConsumptionData.data.map(consumption => consumption * (displayData.cost_per_kwh || 0.08)),
        backgroundColor: 'rgba(165, 255, 156, 0.6)',
        borderColor: '#a5ff9c',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  // Données pour le graphique de consommation (ligne)
  const consumptionLineData = {
    labels: currentConsumptionData.labels,
    datasets: [
      {
        label: 'Consommation (kWh)',
        data: currentConsumptionData.data,
        borderColor: '#a5ff9c',
        backgroundColor: 'rgba(165, 255, 156, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Données pour le graphique en donut (répartition par ferme)
  const farmDistributionData = {
    labels: ['Farm A', 'Farm B', 'Farm C', 'Farm D'],
    datasets: [
      {
        data: [35, 28, 22, 15],
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
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#a5ff9c',
        borderWidth: 1,
        padding: 12,
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

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
          },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#a5ff9c',
        borderWidth: 1,
        padding: 12,
      },
    },
  }

  return (
    <div>
      {/* KPI Cards - Enrichies avec icônes et tendances */}
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
              {(displayData.current_power || 0).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} kW
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>↑ 2.3%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs hier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Consommation en temps réel
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Pic de demande</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--hearst-green)' }}>
                {(displayData.peakDemand || 1350.8).toFixed(1)} kW
              </div>
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
              {(displayData.daily_consumption || 0).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} kWh
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>↓ 1.2%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs moyenne</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Dernières 24 heures
            </p>
            <div style={{ marginTop: 'var(--space-3)', width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #a5ff9c, #8afd81)', borderRadius: '2px' }}></div>
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
              {((displayData.monthly_consumption || 0) / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} MWh
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>↑ 5.8%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs mois dernier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Mois en cours
            </p>
            <div style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)' }}>
              <div style={{ flex: 1, padding: 'var(--space-2)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Moyenne/jour</div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--hearst-green)' }}>
                  {((displayData.monthly_consumption || 0) / 30).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} kWh
                </div>
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
              ${(displayData.daily_cost || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                ${((displayData.daily_cost || 0) / 24).toFixed(2)}/h
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
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              ${(displayData.monthly_cost || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#ffa500', fontSize: '0.875rem' }}>↑ 5.8%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs mois dernier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Mois en cours
            </p>
            <div style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)' }}>
              <div style={{ flex: 1, padding: 'var(--space-2)', background: 'rgba(255, 165, 0, 0.05)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Projection annuelle</div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#ffa500' }}>
                  ${((displayData.monthly_cost || 0) * 12).toLocaleString('fr-FR', { maximumFractionDigits: 0 })}
                </div>
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
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              ${(displayData.cost_per_kwh || 0).toFixed(3)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>→ Stable</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs moyenne</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Taux moyen
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Efficacité énergétique</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--hearst-green)' }}>
                {(displayData.efficiency || 36.2).toFixed(1)} J/TH
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques visuels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        {/* Graphique de consommation */}
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              <CardTitle>Évolution de la Consommation</CardTitle>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
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
                  Journalier
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
                <button
                  onClick={() => setSelectedPeriod('monthly')}
                  style={{
                    padding: 'var(--space-2) var(--space-3)',
                    background: selectedPeriod === 'monthly' ? 'rgba(165, 255, 156, 0.2)' : 'transparent',
                    border: `1px solid ${selectedPeriod === 'monthly' ? '#a5ff9c' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    color: selectedPeriod === 'monthly' ? '#a5ff9c' : 'var(--text-secondary)',
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
              <LineChart data={consumptionLineData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Graphique de coûts */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution des Coûts</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
              <BarChart data={costData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Répartition par ferme et métriques supplémentaires */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        {/* Graphique en donut - Répartition par ferme */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Ferme</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
              <DoughnutChart data={farmDistributionData} options={doughnutOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Métriques d'efficacité */}
        <Card>
          <CardHeader>
            <CardTitle>Métriques d'Efficacité</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
              <div style={{ padding: 'var(--space-4)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(165, 255, 156, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Efficacité Moyenne</span>
                  <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--hearst-green)' }}>
                    {(displayData.efficiency || 36.2).toFixed(1)} J/TH
                  </span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, #a5ff9c, #8afd81)', borderRadius: '4px' }}></div>
                </div>
              </div>

              <div style={{ padding: 'var(--space-4)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(165, 255, 156, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Facteur de Puissance</span>
                  <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--hearst-green)' }}>
                    {(displayData.powerFactor || 0.95).toFixed(2)}
                  </span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '95%', height: '100%', background: 'linear-gradient(90deg, #a5ff9c, #8afd81)', borderRadius: '4px' }}></div>
                </div>
              </div>

              <div style={{ padding: 'var(--space-4)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(165, 255, 156, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Empreinte Carbone</span>
                  <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--hearst-green)' }}>
                    {(displayData.carbonFootprint || 45.2).toFixed(1)} t CO₂
                  </span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '75%', height: '100%', background: 'linear-gradient(90deg, #a5ff9c, #8afd81)', borderRadius: '4px' }}></div>
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
                  Mois en cours
                </div>
              </div>

              <div style={{ padding: 'var(--space-4)', background: 'rgba(255, 165, 0, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 165, 0, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Coût par TH/s</div>
                    <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: '#ffa500' }}>
                      ${(((displayData.daily_cost || 0) / 24) / 1000).toFixed(4)}
                    </div>
                  </div>
                  <PowerIcon />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Miners Section - Enrichie */}
      <Card style={{ marginBottom: 'var(--space-6)' }}>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <CardTitle>Mineurs Actifs</CardTitle>
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                {((data?.miners && data.miners.length > 0) ? data.miners.length : 12)} actifs
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
            {((data?.miners && data.miners.length > 0) ? data.miners : [
              { name: 'Farm A - Rack 1', status: 'online', hashrate: '98.5 TH/s', power: 3550, temp: 68, efficiency: 36.0, location: 'Montréal' },
              { name: 'Farm A - Rack 2', status: 'online', hashrate: '97.2 TH/s', power: 3520, temp: 67, efficiency: 36.2, location: 'Montréal' },
              { name: 'Farm B - Rack 1', status: 'online', hashrate: '110.0 TH/s', power: 3250, temp: 65, efficiency: 29.5, location: 'Québec' },
              { name: 'Farm B - Rack 2', status: 'online', hashrate: '109.5 TH/s', power: 3240, temp: 66, efficiency: 29.6, location: 'Québec' },
              { name: 'Farm C - Rack 1', status: 'online', hashrate: '95.0 TH/s', power: 3250, temp: 69, efficiency: 34.2, location: 'Toronto' },
              { name: 'Farm C - Rack 2', status: 'degraded', hashrate: '92.5 TH/s', power: 3200, temp: 72, efficiency: 34.6, location: 'Toronto' },
              { name: 'Farm D - Rack 1', status: 'online', hashrate: '96.8 TH/s', power: 3480, temp: 66, efficiency: 35.9, location: 'Vancouver' },
              { name: 'Farm D - Rack 2', status: 'online', hashrate: '97.1 TH/s', power: 3490, temp: 67, efficiency: 35.9, location: 'Vancouver' },
            ]).map((miner: any, index: number) => (
              <div
                key={index}
                style={{
                  padding: 'var(--space-4)',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${miner.status === 'online' ? 'rgba(165, 255, 156, 0.2)' : miner.status === 'degraded' ? 'rgba(255, 165, 0, 0.2)' : 'rgba(255, 77, 77, 0.2)'}`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(165, 255, 156, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                  <div>
                    <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-1)' }}>
                      {miner.name}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><LocationIcon /> {miner.location || 'Non spécifié'}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: 'var(--space-1) var(--space-2)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      background: miner.status === 'online' ? 'rgba(165, 255, 156, 0.2)' : miner.status === 'degraded' ? 'rgba(255, 165, 0, 0.2)' : 'rgba(255, 77, 77, 0.2)',
                      color: miner.status === 'online' ? 'var(--hearst-green)' : miner.status === 'degraded' ? '#ffa500' : '#ff4d4d',
                    }}
                  >
                    {miner.status === 'online' ? '● ACTIF' : miner.status === 'degraded' ? '◐ DÉGRADÉ' : '○ HORS LIGNE'}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                  <div style={{ padding: 'var(--space-2)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
                      Hashrate
                    </div>
                    <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--hearst-green)' }}>
                      {miner.hashrate}
                    </div>
                  </div>
                  <div style={{ padding: 'var(--space-2)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
                      Puissance
                    </div>
                    <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--hearst-green)' }}>
                      {(miner.power / 1000).toFixed(2)} kW
                    </div>
                  </div>
                  <div style={{ padding: 'var(--space-2)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
                      Température
                    </div>
                    <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: miner.temp > 70 ? '#ffa500' : 'var(--hearst-green)' }}>
                      {miner.temp}°C
                    </div>
                  </div>
                  <div style={{ padding: 'var(--space-2)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
                      Efficacité
                    </div>
                    <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--hearst-green)' }}>
                      {miner.efficiency || 36.0} J/TH
                    </div>
                  </div>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      width: `${Math.min((miner.temp / 80) * 100, 100)}%`, 
                      height: '100%', 
                      background: miner.temp > 70 ? 'linear-gradient(90deg, #ffa500, #ff8c00)' : 'linear-gradient(90deg, #a5ff9c, #8afd81)', 
                      borderRadius: '2px' 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Refresh Button and Last Update */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-6)', padding: 'var(--space-4)', background: 'rgba(165, 255, 156, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(165, 255, 156, 0.1)' }}>
        <div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
            Dernière mise à jour
          </div>
          <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)' }}>
            {data?.timestamp ? new Date(data.timestamp).toLocaleString('fr-FR') : new Date().toLocaleString('fr-FR')}
          </div>
        </div>
        <Button onClick={refreshData} style={{ background: 'var(--hearst-green)', color: '#000', fontWeight: 600 }}>
          🔄 Actualiser les Données
        </Button>
      </div>
    </div>
  )
}



