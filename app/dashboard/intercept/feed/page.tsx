// app/feed/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAllPhotos, type Photo } from '@/app/lib/photo'

export default function FeedPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getAllPhotos().then(data => {
      setPhotos(data)
      setLoading(false)
    })
  }, [])

  // 点击照片时，导航到拦截路由的 URL
  // 这会触发 (.)photo/[id]/page.tsx 渲染模态框
  const handlePhotoClick = (photoId: string) => {
    router.push(`/dashboard/intercept/feed/photo/${photoId}`, { scroll: false })
  }

  if (loading) {
    return (
      <div className="photo-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="photo-card" style={{ height: 300, background: '#e0e0e0' }} />
        ))}
      </div>
    )
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>最新照片</h1>
      <div className="photo-grid">
        {photos.map(photo => (
          <div
            key={photo.id}
            className="photo-card"
            onClick={() => handlePhotoClick(photo.id)}
          >
            <img src={photo.url} alt={photo.title} />
            <div className="photo-info">
              <div className="photo-title">{photo.title}</div>
              <div className="photo-author">📷 {photo.author}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}