'use client'

import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface KpiBoxProps {
  label: string
  value: string | number | ReactNode
  description?: string
  icon?: ReactNode
  highlight?: boolean
  valueColor?: 'primary' | 'green'
}

/**
 * KpiBox - Composant KPI avec le style exact de la page PROJECTIONS
 * Utilise le composant Card de shadcn/ui comme dans ProjectsOverview
 * Style exact de l'image: valeurs en 2.5rem (40px), labels en var(--text-base) (16px)
 */
export default function KpiBox({
  label,
  value,
  description,
  icon,
  highlight = false,
  valueColor = 'green',
}: KpiBoxProps) {
  return (
    <Card style={{ borderLeft: '3px solid var(--hearst-green)' }}>
      <CardHeader>
        <CardTitle style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: valueColor === 'green' ? 'var(--hearst-green)' : 'var(--text-primary)' }}>
          {value}
        </div>
        {description && (
          <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

