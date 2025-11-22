'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

// Import dynamique pour éviter les erreurs SSR
const ProfitabilityIndex = dynamic(() => import('@/components/ProfitabilityIndex'), { ssr: false })

export default function ProfitabilityIndexPage() {
  useEffect(() => {
    // Charger le CSS du profitability index
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/css/profitability-desktop.css'
    document.head.appendChild(link)

    return () => {
      const existingLink = document.querySelector('link[href="/css/profitability-desktop.css"]')
      if (existingLink && existingLink.parentNode) {
        existingLink.parentNode.removeChild(existingLink)
      }
    }
  }, [])

  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        <ProfitabilityIndex />
      </div>
    </div>
  )
}

