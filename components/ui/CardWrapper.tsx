/**
 * CardWrapper - Composant wrapper réutilisable
 * Reprend le style exact des cards de la page HOME
 * Basé sur l'analyse de components/Dashboard.tsx
 */

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './card'
import { cn } from '@/lib/utils'

interface CardWrapperProps {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
  headerClassName?: string
  contentClassName?: string
}

export function CardWrapper({
  children,
  title,
  description,
  className,
  headerClassName,
  contentClassName
}: CardWrapperProps) {
  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader className={headerClassName}>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={contentClassName}>
        {children}
      </CardContent>
    </Card>
  )
}
