'use client'

import { ReactNode } from 'react'

interface SectionTitleProps {
  children: ReactNode
  level?: 1 | 2 | 3
  className?: string
}

/**
 * SectionTitle - Titre de section avec le style exact de la page HOME
 */
export default function SectionTitle({ children, level = 2, className = '' }: SectionTitleProps) {
  const styles = {
    1: {
      fontSize: 'var(--text-2xl)',
      fontWeight: 700,
      marginBottom: 'var(--space-4)',
      letterSpacing: '-0.02em',
    },
    2: {
      fontSize: 'var(--text-lg)',
      fontWeight: 600,
      marginBottom: 'var(--space-4)',
      letterSpacing: '-0.01em',
    },
    3: {
      fontSize: 'var(--text-base)',
      fontWeight: 600,
      marginBottom: 'var(--space-2)',
      letterSpacing: '-0.01em',
    },
  }

  const Tag = level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3'

  return (
    <Tag
      className={`section-title ${className}`}
      style={{
        ...styles[level],
        color: 'var(--text-primary)',
        margin: 0,
        lineHeight: 1.4,
      }}
    >
      {children}
    </Tag>
  )
}


