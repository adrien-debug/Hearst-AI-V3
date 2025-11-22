'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { transactionsAPI } from '@/lib/api'

export default function Sidebar() {
  const pathname = usePathname()
  const [pendingTransactionsCount, setPendingTransactionsCount] = useState(0)

  useEffect(() => {
    // Charger le nombre de transactions pending depuis l'API
    const loadPendingCount = async () => {
      try {
        const count = await transactionsAPI.getPendingCount()
        setPendingTransactionsCount(count)
      } catch (error) {
        console.error('Error loading pending transactions count:', error)
        // Fallback sur un nombre par défaut en cas d'erreur
        setPendingTransactionsCount(0)
      }
    }

    loadPendingCount()
    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(loadPendingCount, 30000)
    return () => clearInterval(interval)
  }, [])

  const navItems = [
    { href: '/', label: 'Home', icon: 'home', view: 'dashboard' },
    { href: '/hearst-ai', label: 'My Hearst AI', icon: 'search', view: 'hearst-ai' },
    { href: '/cockpit', label: 'Cockpit', icon: 'dashboard', view: 'cockpit' },
    { href: '/projects', label: 'Projections', icon: 'document', view: 'projects' },
    { href: '/electricity', label: 'Électricité', icon: 'energy', view: 'electricity' },
    { href: '/collateral', label: 'Collateral', icon: 'document', view: 'collateral' },
    { href: '/calculator', label: 'Calculator', icon: 'calculator', view: 'calculator' },
    { href: '/setup', label: 'Setup', icon: 'setup', view: 'setup' },
    { href: '/transactions', label: 'Transactions', icon: 'transactions', view: 'transactions' },
    { href: '/wallet-scraper', label: 'Wallet Scraper', icon: 'scraper', view: 'wallet-scraper' },
    { href: '/profitability-index', label: 'Profitability Index', icon: 'profitability', view: 'profitability-index' },
    { href: '/documents-vault', label: 'Documents Vault', icon: 'documents', view: 'documents-vault' },
  ]

  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">
          <Image 
            src="/logo.svg" 
            alt="HearstAI" 
            className="logo-img"
            width={180}
            height={40}
            priority
          />
        </h1>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
            data-view={item.view}
          >
            <span className="nav-icon" data-icon={item.icon}>
              {/* Icons will be injected by JS */}
            </span>
            <span className="nav-label">{item.label}</span>
            {item.href === '/transactions' && pendingTransactionsCount > 0 && (
              <span className="nav-badge" style={{
                marginLeft: 'auto',
                background: 'var(--hearst-green)',
                color: '#000000',
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 8px',
                borderRadius: '12px',
                minWidth: '20px',
                textAlign: 'center'
              }}>
                {pendingTransactionsCount}
              </span>
            )}
          </Link>
        ))}
      </nav>
      
      <div className="sidebar-version">
        <Link
          href="/admin"
          className="nav-item"
          data-view="admin-panel"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            padding: 'var(--space-3)',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            color: 'var(--text-secondary)',
            transition: 'all var(--duration-fast) var(--ease-in-out)',
          }}
        >
          <span className="nav-icon" data-icon="admin"></span>
          <span className="nav-label">Admin</span>
        </Link>
        <div style={{
          marginTop: 'var(--space-2)',
          paddingTop: 'var(--space-2)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          HearstAI Version 1.0
        </div>
      </div>
    </aside>
  )
}

