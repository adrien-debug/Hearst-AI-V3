/**
 * KpiBoxLayout - Composant KPI Box réutilisable
 * Reprend le style exact des KPI boxes de la page HOME
 * Basé sur l'analyse de components/Dashboard.tsx
 */

import React from 'react'
import { CardWrapper } from './CardWrapper'
import { cn } from '@/lib/utils'

interface KpiBoxLayoutProps {
  title: string
  value: string | number
  description?: string
  valueColor?: 'green' | 'primary' | 'secondary'
  className?: string
  formatValue?: (value: string | number) => string
}

export function KpiBoxLayout({
  title,
  value,
  description,
  valueColor = 'green',
  className,
  formatValue
}: KpiBoxLayoutProps) {
  const getValueColor = () => {
    switch (valueColor) {
      case 'green':
        return '#A7FB90' // --hearst-green
      case 'primary':
        return 'var(--text-primary)'
      case 'secondary':
        return 'var(--text-secondary)'
      default:
        return '#A7FB90'
    }
  }

  const formattedValue = formatValue ? formatValue(value) : String(value)

  return (
    <CardWrapper title={title} className={className}>
      <div style={{
        fontSize: '2rem', // 32px
        fontWeight: 700,
        color: getValueColor(),
        marginBottom: 'var(--space-2)',
        fontFamily: 'var(--font-mono), monospace',
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-0.02em',
        lineHeight: 1.2
      }}>
        {formattedValue}
      </div>
      {description && (
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: 'var(--text-sm)'
        }}>
          {description}
        </p>
      )}
    </CardWrapper>
  )
}

