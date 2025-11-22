'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

// Import dynamique pour éviter les erreurs SSR
const WalletsConfig = dynamic(() => import('@/components/WalletsConfig'), { ssr: false })

export default function WalletsPage() {
  useEffect(() => {
    // Charger le CSS des transactions (même fichier)
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/css/transactions-desktop.css'
    document.head.appendChild(link)

    return () => {
      const existingLink = document.querySelector('link[href="/css/transactions-desktop.css"]')
      if (existingLink && existingLink.parentNode) {
        existingLink.parentNode.removeChild(existingLink)
      }
    }
  }, [])

  return (
    <>
      <div className="dashboard-view">
        <div className="dashboard-content tx-container">
          <WalletsConfig />
        </div>
      </div>
    </>
  )
}

