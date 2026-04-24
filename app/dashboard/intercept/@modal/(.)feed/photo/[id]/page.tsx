// app/feed/(.)photo/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getPhotoById, type Photo } from '@/app/lib/photo'

interface ModalPageProps {
  params: Promise<{ id: string }>
}

export default function PhotoModalPage({ params }: ModalPageProps) {
  const [photo, setPhoto] = useState<Photo | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadPhoto = async () => {
      const { id } = await params
      const data = await getPhotoById(id)
      setPhoto(data || null)
      setLoading(false)
    }
    loadPhoto()
  }, [params])

  const handleClose = () => {
    router.back()
  }

  // 点击遮罩层关闭
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  // 按 ESC 键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-content" style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
          加载中...
        </div>
      </div>
    )
  }

  if (!photo) {
    return (
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content" style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
          <p>照片不存在</p>
          <button onClick={handleClose}>关闭</button>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>
          ✕
        </button>
        <img src={photo.url} alt={photo.title} />
      </div>
    </div>
  )
}