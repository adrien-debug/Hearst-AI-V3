'use client'

import { ReactNode } from 'react'

interface CardWrapperProps {
  children: ReactNode
  className?: string
  highlight?: boolean
}

/**
 * CardWrapper - Composant wrapper pour les cartes avec le style exact de la page HOME
 * Reprend le style des .premium-stat-box et .premium-wallet-box
 */
export default function CardWrapper({ children, className = '', highlight = false }: CardWrapperProps) {
  return (
    <div
      className={`premium-card ${className}`}
      style={{
        position: 'relative',
        background: 'rgba(14, 14, 14, 0.75)',
        border: '0.5px solid rgba(255, 255, 255, 0.04)',
        borderLeft: '3px solid var(--hearst-green)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        boxShadow: `
          0 4px 24px rgba(0, 0, 0, 0.4),
          0 1px 4px rgba(0, 0, 0, 0.2),
          inset 0 0.5px 0 rgba(255, 255, 255, 0.06)
        `,
        transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        overflow: 'hidden',
        ...(highlight && {
          background: 'rgba(14, 14, 14, 0.85)',
        }),
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.borderColor = 'rgba(165, 255, 156, 0.3)'
        e.currentTarget.style.boxShadow = `
          0 12px 48px rgba(0, 0, 0, 0.5),
          0 4px 16px rgba(0, 0, 0, 0.4),
          0 0 0 1px rgba(165, 255, 156, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)'
        e.currentTarget.style.boxShadow = `
          0 4px 24px rgba(0, 0, 0, 0.4),
          0 1px 4px rgba(0, 0, 0, 0.2),
          inset 0 0.5px 0 rgba(255, 255, 255, 0.06)
        `
      }}
    >
      {children}
    </div>
  )
}


