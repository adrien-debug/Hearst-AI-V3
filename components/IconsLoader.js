'use client'

import { useEffect } from 'react'

export default function IconsLoader() {
  useEffect(() => {
    // Load icons script dynamically
    const loadIcons = async () => {
      try {
        // Load icons from public/js/icons.js via script tag
        if (typeof window !== 'undefined' && !window.Icons) {
          const script = document.createElement('script')
          script.type = 'module'
          script.src = '/js/icons.js'
          script.onload = () => {
            if (window.Icons) {
              // Inject icons into all data-icon elements
              document.querySelectorAll('[data-icon]').forEach(el => {
                const iconName = el.getAttribute('data-icon')
                if (window.Icons[iconName]) {
                  el.innerHTML = window.Icons[iconName]
                }
              })
            }
          }
          document.head.appendChild(script)
        } else if (window.Icons) {
          // Icons already loaded, inject them
          document.querySelectorAll('[data-icon]').forEach(el => {
            const iconName = el.getAttribute('data-icon')
            if (window.Icons[iconName]) {
              el.innerHTML = window.Icons[iconName]
            }
          })
        }
      } catch (error) {
        console.warn('Icons not loaded:', error)
      }
    }

    loadIcons()
  }, [])

  return null
}

