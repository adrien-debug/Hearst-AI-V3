'use client'

import { useEffect, useState } from 'react'
import Dashboard from '@/components/Dashboard'
import { statsAPI } from '@/lib/api'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Composants d'icônes SVG
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

export default function Home() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [btcPrice, setBtcPrice] = useState<number | null>(null)
  const [networkHashrate, setNetworkHashrate] = useState<number | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await statsAPI.getStats()
        setData(response.stats)
        setError(null)
      } catch (err) {
        console.error('Error loading dashboard data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    // Charger les métriques Bitcoin
    const loadBitcoinMetrics = async () => {
      try {
        const response = await fetch('/api/hashprice-lite')
        const metrics = await response.json()
        if (metrics.btcPrice) setBtcPrice(metrics.btcPrice)
        if (metrics.networkHashrate) setNetworkHashrate(metrics.networkHashrate / 1000000) // Convertir en EH/s
      } catch (err) {
        console.error('Error loading Bitcoin metrics:', err)
      }
    }

    loadData()
    loadBitcoinMetrics()
    
    // Refresh every 30 seconds
    const interval = setInterval(() => {
      loadData()
      loadBitcoinMetrics()
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="dashboard-view">
        <div className="dashboard-content">
          <div className="loading-state" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            gap: 'var(--space-4)',
          }}>
            <div className="spinner" style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(165, 255, 156, 0.2)',
              borderTopColor: '#a5ff9c',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}></div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)' }}>Chargement des données...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-view">
        <div className="dashboard-content">
          <div className="error-state" style={{
            padding: 'var(--space-6)',
            textAlign: 'center',
            color: 'var(--text-error)',
          }}>
            <p>Erreur: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* KPI Cards - Même style que ElectricityView */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        {/* BTC Price Card */}
        {btcPrice && (
          <Card>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardTitle>Prix Bitcoin</CardTitle>
                <PowerIcon />
              </div>
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
                ${btcPrice.toLocaleString('fr-FR', { maximumFractionDigits: 0 })}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>Temps réel</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                Prix actuel du marché
              </p>
            </CardContent>
          </Card>
        )}

        {/* Network Hashrate Card */}
        {networkHashrate && (
          <Card>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardTitle>Hashrate Réseau</CardTitle>
                <ChartIcon />
              </div>
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
                {networkHashrate.toFixed(1)} EH/s
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>Temps réel</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                Hashrate total du réseau Bitcoin
              </p>
            </CardContent>
          </Card>
        )}

        {/* Total Projects Card */}
        <Link href="/projects" style={{ textDecoration: 'none' }}>
          <Card>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardTitle>Projets Actifs</CardTitle>
                <TrendIcon />
              </div>
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
                {data?.total_projects || 0}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>Projections disponibles</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                Projets de mining actifs
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Total Jobs Card */}
        <Link href="/cockpit" style={{ textDecoration: 'none' }}>
          <Card>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardTitle>Jobs Totaux</CardTitle>
                <ChartIcon />
              </div>
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
                {data?.total_jobs || 0}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>{data?.jobs_running || 0} en cours</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                Total des jobs exécutés
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Success Rate Card */}
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Taux de Réussite</CardTitle>
              <TrendIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {(data?.jobs_success_rate || 0).toFixed(1)}%
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>Performance globale</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Taux de succès des jobs
            </p>
          </CardContent>
        </Card>

        {/* Storage Card */}
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>Stockage Total</CardTitle>
              <PowerIcon />
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--hearst-green)', marginBottom: 'var(--space-2)' }}>
              {(data?.total_storage_mb || 0).toFixed(1)} MB
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: '#a5ff9c', fontSize: '0.875rem' }}>Données stockées</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Espace de stockage utilisé
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Component avec graphiques BTC Mined */}
      <Dashboard data={data} />
    </div>
  )
}
