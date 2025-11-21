'use client'

import { useEffect } from 'react'

export default function CalculatorPage() {
  useEffect(() => {
    // Charger le HTML depuis l'API Next.js
    window.location.href = '/api/calculator'
  }, [])

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#000000',
      color: '#8afd81',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Chargement de la calculatrice...</div>
      </div>
    </div>
  )
}

