'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const DocumentsVault = dynamic(() => import('@/components/DocumentsVault'), {
  ssr: false
})

export default function DocumentsVaultPage() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/css/documents-vault-desktop.css'
    document.head.appendChild(link)
    return () => {
      const existingLink = document.querySelector('link[href="/css/documents-vault-desktop.css"]')
      if (existingLink && existingLink.parentNode) {
        existingLink.parentNode.removeChild(existingLink)
      }
    }
  }, [])

  return <DocumentsVault />
}

