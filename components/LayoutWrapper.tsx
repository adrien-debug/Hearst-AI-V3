'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import IconsLoader from './IconsLoader'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAuthPage = pathname?.startsWith('/auth')

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <>
      <IconsLoader />
      <div className="cockpit-layout">
        <Sidebar />
        <div className="main-content">
          <Header />
          <main className="content-area">{children}</main>
        </div>
      </div>
    </>
  )
}

