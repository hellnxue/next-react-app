// app/layout.tsx
'use client'

import './globals.css'
// import type { Metadata } from 'next'
import Link from 'next/link'

// export const metadata: Metadata = {
//   title: '照片墙',
//   description: '展示照片的 Next.js 应用',
// }

export default function InterceptLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <nav className="navbar">
          <Link href="/dashboard/intercept/feed" className="logo">
            📸 照片墙
          </Link>
        </nav>
        {children}
        {modal}
      </body>
    </html>
  )
}