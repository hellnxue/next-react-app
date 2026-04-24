// app/photo/[id]/page.tsx
'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPhotoById } from '@/app/lib/photo'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PhotoDetailPage({ params }: PageProps) {
  const { id } = await params
  const photo = await getPhotoById(id)

  if (!photo) {
    notFound()
  }

  return (
    <div className="detail-page">
      <Link href="/dashboard/intercept/feed" className="back-button">
        ← 返回照片墙
      </Link>
      
      <img src={photo.url} alt={photo.title} className="detail-image" />
      
      <h1 className="detail-title">{photo.title}</h1>
      <p className="detail-author">📷 作者：{photo.author}</p>
      <p className="detail-description">{photo.description}</p>
    </div>
  )
}