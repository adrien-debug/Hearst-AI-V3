'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cockpitAPI } from '@/lib/api'
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
const HashrateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 1 }}>
    <path d="M4 8H20M4 16H20M16 4L14 20M10 4L8 20" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const BitcoinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 1 }}>
    <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const MinerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 1 }}>
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const OnlineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 1 }}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12L11 15L16 9" stroke="var(--hearst-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function CockpitDashboard() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await cockpitAPI.getData()
        setData(response.data)
      } catch (err) {
        console.error('Error loading cockpit data:', err)
        // Fallback to mock data
        setData({
          globalHashrate: 245.8,
          theoreticalHashrate: 250.0,
          btcProduction24h: 0.084521,
          totalMiners: 124,
          onlineMiners: 118,
          miningAccounts: [
            { id: '1', name: 'AKT04', hashrate: 2041.42, btc24h: 0.084521, status: 'active' },
            { id: '2', name: 'AKT05', hashrate: 1987.23, btc24h: 0.082156, status: 'active' },
            { id: '3', name: 'AKT06', hashrate: 2156.78, btc24h: 0.089234, status: 'active' },
          ],
        })
      }
    }
    loadData()
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
  }, [])

  const displayData = data || {
    globalHashrate: 245.8,
    theoreticalHashrate: 250.0,
    btcProduction24h: 0.084521,
    totalMiners: 124,
    onlineMiners: 118,
    miningAccounts: [],
  }

  const onlinePercentage = Math.round((displayData.onlineMiners / displayData.totalMiners) * 100)
  const efficiency = Math.round((displayData.globalHashrate / displayData.theoreticalHashrate) * 100)

  // Données pour les graphiques
  const hashrateHistoryData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Hashrate (PH/s)',
        data: [240.5, 242.8, 245.2, 244.1, 245.8, 246.2, 245.8],
        borderColor: '#A7FB90', // #A7FB90 - pas de transparence
        backgroundColor: '#A7FB90', // #A7FB90 - pas de transparence
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const btcProductionData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'BTC Production',
        data: [0.082156, 0.081234, 0.080521, 0.081892, 0.082156, 0.083247, 0.084521],
        backgroundColor: '#A7FB90', // #A7FB90 - pas de transparence
        borderColor: '#A7FB90', // #A7FB90 - pas de transparence
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  }

  const minersStatusData = {
    labels: ['Online', 'Offline'],
    datasets: [
      {
        data: [displayData.onlineMiners, displayData.totalMiners - displayData.onlineMiners],
        backgroundColor: [
          '#A7FB90', // #A7FB90 - pas de transparence
          '#ff4d4d', // Rouge - pas de transparence
        ],
        borderColor: [
          '#A7FB90', // #A7FB90 - pas de transparence
          '#ff4d4d', // Rouge - pas de transparence
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
        borderColor: '#A7FB90', // var(--hearst-green)
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
        borderColor: '#A7FB90', // var(--hearst-green)
        borderWidth: 1,
      },
    },
  }

  return (
    <div>
      {/* KPI Cards enrichies */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)', marginBottom: '10px' }}>
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Hashrate Global</CardTitle>
              <HashrateIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 700, 
              color: '#A7FB90', 
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-mono), monospace',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              {displayData.globalHashrate.toFixed(1)} PH/s
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: 'var(--hearst-green)', fontSize: '0.875rem' }}>↑ 2.1%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs hier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Théorique: {displayData.theoreticalHashrate.toFixed(1)} PH/s
            </p>
            <div style={{ marginTop: 'var(--space-3)', width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${efficiency}%`, height: '100%', background: '#A7FB90', borderRadius: 'var(--radius-sm)' }}></div>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
              Efficacité: {efficiency}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Production BTC (24h)</CardTitle>
              <BitcoinIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 700, 
              color: '#A7FB90', 
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-mono), monospace',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              {displayData.btcProduction24h.toFixed(6)} BTC
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: 'var(--hearst-green)', fontSize: '0.875rem' }}>↑ 0.8%</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs hier</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              ≈ ${(displayData.btcProduction24h * 114000).toFixed(2)} USD
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: '#A7FB90', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Projection mensuelle</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--hearst-green)' }}>
                {(displayData.btcProduction24h * 30).toFixed(4)} BTC
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
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 700, 
              color: '#A7FB90', 
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-mono), monospace',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              {displayData.totalMiners}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: 'var(--hearst-green)', fontSize: '0.875rem', fontWeight: 600 }}>
                {displayData.onlineMiners} en ligne
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Capacité totale de la flotte
            </p>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-2)', background: '#A7FB90', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>Mineurs hors ligne</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#ff4d4d' }}>
                {displayData.totalMiners - displayData.onlineMiners}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Mineurs En Ligne</CardTitle>
              <OnlineIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 700, 
              color: '#A7FB90', 
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-mono), monospace',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              {displayData.onlineMiners}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: 'var(--hearst-green)', fontSize: '0.875rem' }}>→ Stable</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>vs moyenne</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              {onlinePercentage}% de la flotte
            </p>
            <div style={{ marginTop: 'var(--space-3)', width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${onlinePercentage}%`, height: '100%', background: 'linear-gradient(90deg, var(--hearst-green), var(--hearst-green-dark))', borderRadius: 'var(--radius-sm)' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques visuels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 'var(--space-6)', marginBottom: '10px' }}>
        <Card>
          <CardHeader>
            <CardTitle>Évolution du Hashrate (7 jours)</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
              <LineChart data={hashrateHistoryData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Production BTC (7 jours)</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
              <BarChart data={btcProductionData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphique en donut et tableau */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-6)', marginBottom: '10px' }}>
        <Card>
          <CardHeader>
            <CardTitle>Statut des Mineurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
              <DoughnutChart data={minersStatusData} options={doughnutOptions} />
            </div>
          </CardContent>
        </Card>

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
                    <th>Hashrate</th>
                    <th>BTC (24h)</th>
                    <th>USD (24h)</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData.miningAccounts && displayData.miningAccounts.length > 0 ? (
                    displayData.miningAccounts.map((account: any) => (
                      <tr key={account.id}>
                        <td><strong>{account.name}</strong></td>
                        <td>{(account.hashrate / 1000).toFixed(2)} PH/s</td>
                        <td>{account.btc24h.toFixed(6)} BTC</td>
                        <td>${(account.btc24h * 114000).toFixed(2)}</td>
                        <td>
                          <span style={{ 
                            color: account.status === 'active' ? 'var(--hearst-green)' : '#ff4d4d',
                            fontWeight: 600,
                          }}>
                            ● {account.status === 'active' ? 'ACTIF' : 'INACTIF'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                        Aucun compte de minage disponible
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

