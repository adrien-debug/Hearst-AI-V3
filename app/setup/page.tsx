'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import dynamic from 'next/dynamic'

// Import dynamique pour éviter les erreurs SSR
const SetupManager = dynamic(() => import('@/components/SetupManager'), { ssr: false })

export default function SetupPage() {
  useEffect(() => {
    // Charger le CSS du setup
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/css/setup-desktop.css'
    document.head.appendChild(link)

    return () => {
      const existingLink = document.querySelector('link[href="/css/setup-desktop.css"]')
      if (existingLink && existingLink.parentNode) {
        existingLink.parentNode.removeChild(existingLink)
      }
    }
  }, [])

  return (
    <>
      <div className="dashboard-view">
        <div className="dashboard-content setup-container">
          <SetupManager />
        </div>
      </div>
    </>
  )
}

