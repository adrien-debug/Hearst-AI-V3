'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Composants d'icônes premium SVG
const MinerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const PowerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M13 2L13 12M18.36 6.64C19.6184 7.89879 20.4753 9.50244 20.8223 11.2482C21.1693 12.9939 20.9909 14.8034 20.3076 16.4478C19.6244 18.0921 18.4658 19.4976 16.9998 20.4864C15.5338 21.4752 13.8211 22.0029 12.075 22.0029C10.3289 22.0029 8.61623 21.4752 7.15021 20.4864C5.68418 19.4976 4.52563 18.0921 3.84236 16.4478C3.15909 14.8034 2.98067 12.9939 3.32768 11.2482C3.67468 9.50244 4.53157 7.89879 5.79 6.64" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const HashIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M4 8H20M4 16H20M16 4L14 20M10 4L8 20" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
    <path d="M3 3V21H21M7 16L12 11L16 15L21 10M21 10H16M21 10V15" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.6 }}>
    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Dynamically import Chart.js components
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
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function ElectricityMiners() {
  const [selectedFarm, setSelectedFarm] = useState<string>('all')

  // Données enrichies des mineurs
  const minersData = [
    { id: 'MINER-001', model: 'Antminer S21', power: 3550, hashrate: 98.5, efficiency: 36.0, temp: 68, status: 'active', farm: 'Farm A', location: 'Montréal', uptime: 99.2 },
    { id: 'MINER-002', model: 'Antminer S21', power: 3520, hashrate: 97.2, efficiency: 36.2, temp: 67, status: 'active', farm: 'Farm A', location: 'Montréal', uptime: 98.8 },
    { id: 'MINER-003', model: 'Antminer S19 Pro', power: 3250, hashrate: 110.0, efficiency: 29.5, temp: 65, status: 'active', farm: 'Farm B', location: 'Québec', uptime: 99.5 },
    { id: 'MINER-004', model: 'Antminer S19 Pro', power: 3240, hashrate: 109.5, efficiency: 29.6, temp: 66, status: 'active', farm: 'Farm B', location: 'Québec', uptime: 99.1 },
    { id: 'MINER-005', model: 'Antminer S19', power: 3250, hashrate: 95.0, efficiency: 34.2, temp: 69, status: 'active', farm: 'Farm C', location: 'Toronto', uptime: 97.5 },
    { id: 'MINER-006', model: 'Antminer S19', power: 3200, hashrate: 92.5, efficiency: 34.6, temp: 72, status: 'degraded', farm: 'Farm C', location: 'Toronto', uptime: 85.2 },
    { id: 'MINER-007', model: 'Antminer S21', power: 3480, hashrate: 96.8, efficiency: 35.9, temp: 66, status: 'active', farm: 'Farm D', location: 'Vancouver', uptime: 98.9 },
    { id: 'MINER-008', model: 'Antminer S21', power: 3490, hashrate: 97.1, efficiency: 35.9, temp: 67, status: 'active', farm: 'Farm D', location: 'Vancouver', uptime: 99.0 },
    { id: 'MINER-009', model: 'Antminer S19', power: 0, hashrate: 0, efficiency: 0, temp: 0, status: 'offline', farm: 'Farm A', location: 'Montréal', uptime: 0 },
    { id: 'MINER-010', model: 'Antminer S19 Pro', power: 3260, hashrate: 110.2, efficiency: 29.6, temp: 64, status: 'active', farm: 'Farm B', location: 'Québec', uptime: 99.3 },
  ]

  const filteredMiners = selectedFarm === 'all' 
    ? minersData 
    : minersData.filter(m => m.farm === selectedFarm)

  const farms = ['all', ...Array.from(new Set(minersData.map(m => m.farm)))]

  // Statistiques globales
  const totalMiners = minersData.length
  const activeMiners = minersData.filter(m => m.status === 'active').length
  const totalPower = minersData.reduce((sum, m) => sum + m.power, 0)
  const totalHashrate = minersData.reduce((sum, m) => sum + m.hashrate, 0)
  const avgEfficiency = minersData.filter(m => m.status === 'active').reduce((sum, m) => sum + m.efficiency, 0) / activeMiners

  // Données pour le graphique de puissance par ferme
  const farmPowerData = {
    labels: ['Farm A', 'Farm B', 'Farm C', 'Farm D'],
    datasets: [
      {
        label: 'Puissance Totale (kW)',
        data: [
          minersData.filter(m => m.farm === 'Farm A').reduce((sum, m) => sum + m.power, 0) / 1000,
          minersData.filter(m => m.farm === 'Farm B').reduce((sum, m) => sum + m.power, 0) / 1000,
          minersData.filter(m => m.farm === 'Farm C').reduce((sum, m) => sum + m.power, 0) / 1000,
          minersData.filter(m => m.farm === 'Farm D').reduce((sum, m) => sum + m.power, 0) / 1000,
        ],
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

  const chartOptions = {
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
            return `${context.parsed.y.toFixed(2)} kW`
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
            return value.toFixed(1) + ' kW'
          },
        },
      },
    },
  }

  return (
    <div>
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Total Mineurs</CardTitle>
              <MinerIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {totalMiners}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span style={{ color: 'var(--hearst-green)', fontSize: '0.875rem', fontWeight: 600 }}>
                {activeMiners} actifs
              </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                ({totalMiners - activeMiners} hors ligne)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Puissance Totale</CardTitle>
              <PowerIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {(totalPower / 1000).toFixed(1)} kW
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Tous mineurs confondus
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Hashrate Total</CardTitle>
              <HashIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {totalHashrate.toFixed(1)} TH/s
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Capacité totale
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Efficacité Moyenne</CardTitle>
              <ChartIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {avgEfficiency.toFixed(1)} J/TH
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Mineurs actifs uniquement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Graphique de puissance par ferme */}
      <Card style={{ marginBottom: 'var(--space-6)' }}>
        <CardHeader>
          <CardTitle>Puissance par Ferme</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ position: 'relative', width: '100%', height: '300px' }}>
            <BarChart data={farmPowerData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Filtre par ferme */}
      <Card style={{ marginBottom: 'var(--space-6)' }}>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <CardTitle>Détail des Mineurs</CardTitle>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {farms.map((farm) => (
                <button
                  key={farm}
                  onClick={() => setSelectedFarm(farm)}
                  style={{
                    padding: 'var(--space-2) var(--space-3)',
                    background: selectedFarm === farm ? 'rgba(165, 255, 156, 0.2)' : 'transparent',
                    border: `1px solid ${selectedFarm === farm ? '#a5ff9c' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    color: selectedFarm === farm ? '#a5ff9c' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: 'var(--text-sm)',
                    fontWeight: selectedFarm === farm ? 600 : 400,
                  }}
                >
                  {farm === 'all' ? 'Toutes les fermes' : farm}
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
                  <th>ID Mineur</th>
                  <th>Modèle</th>
                  <th>Ferme</th>
                  <th>Puissance</th>
                  <th>Hashrate</th>
                  <th>Efficacité</th>
                  <th>Température</th>
                  <th>Uptime</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {filteredMiners.map((miner) => (
                  <tr key={miner.id}>
                    <td><strong>{miner.id}</strong></td>
                    <td>{miner.model}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span>{miner.farm}</span>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><LocationIcon /> {miner.location}</span>
                      </div>
                    </td>
                    <td>{miner.power > 0 ? `${(miner.power / 1000).toFixed(2)} kW` : '-'}</td>
                    <td>{miner.hashrate > 0 ? `${miner.hashrate} TH/s` : '-'}</td>
                    <td>{miner.efficiency > 0 ? `${miner.efficiency} J/TH` : '-'}</td>
                    <td>
                      <span style={{ 
                        color: miner.temp > 70 ? '#ffa500' : miner.temp > 0 ? 'var(--hearst-green)' : 'var(--text-secondary)',
                        fontWeight: 600,
                      }}>
                        {miner.temp > 0 ? `${miner.temp}°C` : '-'}
                      </span>
                    </td>
                    <td>
                      <span style={{ color: miner.uptime > 95 ? 'var(--hearst-green)' : miner.uptime > 0 ? '#ffa500' : 'var(--text-secondary)' }}>
                        {miner.uptime > 0 ? `${miner.uptime.toFixed(1)}%` : '-'}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        color: miner.status === 'active' ? 'var(--hearst-green)' : miner.status === 'degraded' ? '#ffa500' : '#ff4d4d',
                        fontWeight: 600,
                      }}>
                        {miner.status === 'active' ? '● ACTIF' : miner.status === 'degraded' ? '◐ DÉGRADÉ' : '○ HORS LIGNE'}
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

