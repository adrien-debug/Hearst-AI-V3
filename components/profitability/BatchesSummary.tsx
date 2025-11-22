'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Batch {
  id: string
  batchNumber: string
  model: string
  quantity: number
  totalHashrate: number
  totalPower: number
  dailyRevenue: number
  dailyCost: number
  dailyProfit: number
  profitabilityPercent: number
  roiDays: number
  status: 'excellent' | 'good' | 'marginal' | 'breakeven' | 'unprofitable'
  hoster: string
  location: string
  updatedAt?: string
}

interface BatchesSummaryProps {
  batches?: Batch[]
  loading?: boolean
}

export default function BatchesSummary({ batches = [], loading = false }: BatchesSummaryProps) {
  const [displayBatches, setDisplayBatches] = useState<Batch[]>(batches)

  useEffect(() => {
    const loadBatches = async () => {
      try {
        const response = await fetch('/api/profitability/batches')
        if (response.ok) {
          const data = await response.json()
          setDisplayBatches(data.batches || [])
        } else {
          // Fallback to mock data
          setDisplayBatches([
            {
              id: '1',
              batchNumber: 'BATCH-001',
              model: 'Antminer S21',
              quantity: 50,
              totalHashrate: 5.2,
              totalPower: 12.5,
              dailyRevenue: 260.50,
              dailyCost: 150.00,
              dailyProfit: 110.50,
              profitabilityPercent: 73.6,
              roiDays: 180,
              status: 'excellent',
              hoster: 'Enegix',
              location: 'Abu Dhabi',
            },
            {
              id: '2',
              batchNumber: 'BATCH-002',
              model: 'Antminer S19 XP',
              quantity: 30,
              totalHashrate: 3.6,
              totalPower: 9.0,
              dailyRevenue: 180.25,
              dailyCost: 108.00,
              dailyProfit: 72.25,
              profitabilityPercent: 66.9,
              roiDays: 220,
              status: 'good',
              hoster: 'GoMining',
              location: 'Marseille',
            },
            {
              id: '3',
              batchNumber: 'BATCH-003',
              model: 'Antminer S19 Pro',
              quantity: 40,
              totalHashrate: 4.0,
              totalPower: 11.2,
              dailyRevenue: 200.00,
              dailyCost: 134.40,
              dailyProfit: 65.60,
              profitabilityPercent: 48.8,
              roiDays: 280,
              status: 'marginal',
              hoster: 'Cryptominer',
              location: 'Paris',
            },
          ])
        }
      } catch (err) {
        console.error('Error loading batches:', err)
        // Keep mock data
      }
    }

    if (batches.length === 0) {
      loadBatches()
    } else {
      setDisplayBatches(batches)
    }
  }, [batches])

  const getStatusColor = (status: string) => {
    const statusUpper = status.toUpperCase()
    if (statusUpper === 'EXCELLENT') return '#a5ff9c'
    if (statusUpper === 'GOOD') return '#4CAF50'
    if (statusUpper === 'MARGINAL') return '#FFA500'
    if (statusUpper === 'BREAKEVEN') return '#FF9800'
    if (statusUpper === 'UNPROFITABLE') return '#ff4d4d'
    return '#888'
  }

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`
  }

  const formatHashrate = (value: number) => {
    return `${value.toFixed(2)} PH/s`
  }

  return (
    <div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
          <div className="spinner" style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(165, 255, 156, 0.2)',
            borderTopColor: '#a5ff9c',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto var(--space-4)',
          }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading batches...</p>
        </div>
      ) : displayBatches.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No batches yet.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Batch Number</th>
                <th>Model</th>
                <th>Quantity</th>
                <th>Hashrate</th>
                <th>Daily Revenue</th>
                <th>Daily Cost</th>
                <th>Daily Profit</th>
                <th>Profitability</th>
                <th>ROI Days</th>
                <th>Status</th>
                <th>Hoster</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayBatches.map((batch) => (
                <tr key={batch.id}>
                  <td><strong>{batch.batchNumber}</strong></td>
                  <td>{batch.model}</td>
                  <td>{batch.quantity}</td>
                  <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>
                    {formatHashrate(batch.totalHashrate || 0)}
                  </td>
                  <td style={{ color: 'var(--hearst-green)', fontWeight: 600 }}>
                    {formatCurrency(batch.dailyRevenue || 0)}
                  </td>
                  <td style={{ color: '#ffa500' }}>
                    {formatCurrency(batch.dailyCost || 0)}
                  </td>
                  <td style={{ 
                    color: (batch.dailyProfit || 0) >= 0 ? 'var(--hearst-green)' : '#ff4d4d',
                    fontWeight: 600 
                  }}>
                    {formatCurrency(batch.dailyProfit || 0)}
                  </td>
                  <td style={{ 
                    color: (batch.profitabilityPercent || 0) >= 70 ? 'var(--hearst-green)' : 
                           (batch.profitabilityPercent || 0) >= 50 ? '#FFA500' : '#ff4d4d',
                    fontWeight: 600 
                  }}>
                    {(batch.profitabilityPercent || 0).toFixed(1)}%
                  </td>
                  <td>{Math.round(batch.roiDays || 0)} days</td>
                  <td>
                    <span style={{ color: getStatusColor(batch.status) }}>
                      {batch.status.toUpperCase()}
                    </span>
                  </td>
                  <td>{batch.hoster}</td>
                  <td>
                    <Button variant="outline" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

