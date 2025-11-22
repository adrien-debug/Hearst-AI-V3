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

    return () => {
      const existingLink = document.querySelector('link[href="/css/wallet-scraper-desktop.css"]')
      if (existingLink && existingLink.parentNode) {
        existingLink.parentNode.removeChild(existingLink)
      }
    }
  }, [])

  return (
    <>
      <div className="dashboard-view">
        <div className="dashboard-content scraper-container">
          <WalletScraper />
        </div>
      </div>
    </>
  )
}

