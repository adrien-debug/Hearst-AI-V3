'use client'

import { ReactNode } from 'react'
import CardWrapper from './CardWrapper'

interface KpiBoxProps {
  label: string
  value: string | number | ReactNode
  description?: string
  icon?: ReactNode
  highlight?: boolean
  valueColor?: 'primary' | 'green'
}

/**
 * KpiBox - Composant KPI avec le style exact des .premium-stat-box de la page HOME
 */
export default function KpiBox({
  label,
  value,
  description,
  icon,
  highlight = false,
  valueColor = 'primary',
}: KpiBoxProps) {
  return (
    <CardWrapper highlight={highlight}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-4)',
        }}
      >
        {icon && (
          <div
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(165, 255, 156, 0.1)',
              border: '1px solid rgba(165, 255, 156, 0.2)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--hearst-green)',
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        )}
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            lineHeight: 1.4,
          }}
        >
          {label}
        </div>
      </div>
      <div
        style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: valueColor === 'green' ? 'var(--hearst-green)' : 'var(--text-primary)',
          lineHeight: 1.2,
          marginBottom: 'var(--space-2)',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </div>
      {description && (
        <div
          style={{
            paddingTop: 'var(--space-3)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              fontWeight: 500,
            }}
          >
            {description}
          </span>
        </div>
      )}
    </CardWrapper>
  )
}

