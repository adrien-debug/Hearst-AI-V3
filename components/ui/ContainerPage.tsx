/**
 * ContainerPage - Composant container de page réutilisable
 * Reprend le style exact du container de la page HOME
 * Basé sur l'analyse de styles/dashboard.css
 */

import React from 'react'
import { cn } from '@/lib/utils'

interface ContainerPageProps {
  children: React.ReactNode
  className?: string
  maxWidth?: string
}

export function ContainerPage({
  children,
  className,
  maxWidth = '1600px'
}: ContainerPageProps) {
  return (
    <div
      className={cn('dashboard-view', className)}
      style={{
        padding: 'var(--space-8) var(--space-10)',
        paddingTop: 0,
        width: '100%',
        margin: '0 auto',
        maxWidth,
        minHeight: '100%',
        overflowY: 'visible',
        overflowX: 'hidden',
        boxSizing: 'border-box',
        position: 'relative',
        flex: 1
      }}
    >
      <div
        className="dashboard-content"
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          minHeight: '100%',
          overflowY: 'visible',
          overflowX: 'hidden'
        }}
      >
        {children}
      </div>
    </div>
  )
}

