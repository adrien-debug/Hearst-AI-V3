import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-md)',
      fontWeight: 500,
      transition: 'all var(--duration-fast) var(--ease-in-out)',
      cursor: 'pointer',
      border: 'none',
      outline: 'none',
    }

    const variantStyles = {
      default: {
        background: 'var(--hearst-green)',
        color: '#000000',
      },
      outline: {
        background: 'transparent',
        color: 'var(--text-primary)',
        border: '1px solid var(--border)',
      },
      ghost: {
        background: 'transparent',
        color: 'var(--text-primary)',
      },
      link: {
        background: 'transparent',
        color: 'var(--hearst-green)',
        textDecoration: 'underline',
      },
    }

    const sizeStyles = {
      default: {
        padding: 'var(--space-2) var(--space-4)',
        fontSize: 'var(--text-sm)',
        height: '36px',
      },
      sm: {
        padding: 'var(--space-1) var(--space-3)',
        fontSize: 'var(--text-xs)',
        height: '28px',
      },
      lg: {
        padding: 'var(--space-3) var(--space-6)',
        fontSize: 'var(--text-base)',
        height: '44px',
      },
      icon: {
        padding: 'var(--space-2)',
        width: '36px',
        height: '36px',
      },
    }

    return (
      <button
        className={cn('', className)}
        ref={ref}
        style={{
          ...baseStyles,
          ...variantStyles[variant],
          ...sizeStyles[size],
        }}
        onMouseEnter={(e) => {
          if (variant === 'default') {
            e.currentTarget.style.opacity = '0.9'
          } else if (variant === 'outline') {
            e.currentTarget.style.background = 'var(--bg-tertiary)'
          } else if (variant === 'ghost') {
            e.currentTarget.style.background = 'var(--bg-tertiary)'
          }
        }}
        onMouseLeave={(e) => {
          if (variant === 'default') {
            e.currentTarget.style.opacity = '1'
          } else {
            e.currentTarget.style.background = variantStyles[variant].background as string
          }
        }}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
