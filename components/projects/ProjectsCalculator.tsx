'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function ProjectsCalculator() {
  const [hashrate, setHashrate] = useState('')
  const [powerConsumption, setPowerConsumption] = useState('')
  const [electricityCost, setElectricityCost] = useState('')
  const [btcPrice, setBtcPrice] = useState('')

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Mining Profitability Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
                Hashrate (TH/s)
              </label>
              <input
                type="number"
                value={hashrate}
                onChange={(e) => setHashrate(e.target.value)}
                placeholder="100"
                style={{
                  width: '100%',
                  padding: 'var(--space-2) var(--space-3)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-sm)',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
                Power Consumption (W)
              </label>
              <input
                type="number"
                value={powerConsumption}
                onChange={(e) => setPowerConsumption(e.target.value)}
                placeholder="3250"
                style={{
                  width: '100%',
                  padding: 'var(--space-2) var(--space-3)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-sm)',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
                Electricity Cost ($/kWh)
              </label>
              <input
                type="number"
                step="0.001"
                value={electricityCost}
                onChange={(e) => setElectricityCost(e.target.value)}
                placeholder="0.05"
                style={{
                  width: '100%',
                  padding: 'var(--space-2) var(--space-3)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-sm)',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
                BTC Price (USD)
              </label>
              <input
                type="number"
                value={btcPrice}
                onChange={(e) => setBtcPrice(e.target.value)}
                placeholder="50000"
                style={{
                  width: '100%',
                  padding: 'var(--space-2) var(--space-3)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-sm)',
                }}
              />
            </div>
          </div>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <Button>Calculate</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

