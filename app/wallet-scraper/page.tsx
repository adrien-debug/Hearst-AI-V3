'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

// Import dynamique pour éviter les erreurs SSR
const WalletScraper = dynamic(() => import('@/components/WalletScraper'), { ssr: false })

export default function WalletScraperPage() {
  useEffect(() => {
    // Charger le CSS du wallet scraper
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/css/wallet-scraper-desktop.css'
    document.head.appendChild(link)

    // Charger le CSS avec charte exacte PROJECTIONS
    const charteLink = document.createElement('link')
    charteLink.rel = 'stylesheet'
    charteLink.href = '/css/wallet-scraper-charte-exacte.css'
    document.head.appendChild(charteLink)

    return () => {
      const existingLink = document.querySelector('link[href="/css/wallet-scraper-desktop.css"]')
      if (existingLink && existingLink.parentNode) {
        existingLink.parentNode.removeChild(existingLink)
      }
      const existingCharteLink = document.querySelector('link[href="/css/wallet-scraper-charte-exacte.css"]')
      if (existingCharteLink && existingCharteLink.parentNode) {
        existingCharteLink.parentNode.removeChild(existingCharteLink)
      }
    }
  }, [])

  return (
    <>
      <div className="dashboard-view">
        <div className="dashboard-content scraper-container wallet-scraper-page-container">
          {/* Navigation horizontale - Style exact PROJECTIONS */}
          <nav className="wallet-scraper-nav-tabs">
            <button className="wallet-scraper-nav-tab active">Overview</button>
            <button className="wallet-scraper-nav-tab">Calculator</button>
            <button className="wallet-scraper-nav-tab">Results</button>
            <button className="wallet-scraper-nav-tab">Charts</button>
            <button className="wallet-scraper-nav-tab">Monte Carlo</button>
            <button className="wallet-scraper-nav-tab">Projects</button>
            <button className="wallet-scraper-nav-tab">Hardware</button>
            <button className="wallet-scraper-nav-tab">Energy</button>
            <button className="wallet-scraper-nav-tab">Infrastructure</button>
          </nav>

          <WalletScraper />
        </div>
      </div>
    </>
  )
}

