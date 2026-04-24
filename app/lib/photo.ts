// app/lib/photos.ts
export interface Photo {
    id: string
    title: string
    author: string
    description: string
    url: string
  }
  
  // 模拟照片数据
  const photos: Photo[] = [
    {
      id: '1',
      title: '雪山日出',
      author: '张三',
      description: '清晨的第一缕阳光照在雪山上，金色的光芒与白雪交相辉映。',
      url: 'https://picsum.photos/id/104/800/800',
    },
    {
      id: '2',
      title: '海边日落',
      author: '李四',
      description: '夕阳西下，天空被染成橙红色，海浪轻轻拍打着沙滩。',
      url: 'https://picsum.photos/id/15/800/800',
    },
    {
      id: '3',
      title: '城市夜景',
      author: '王五',
      description: '霓虹灯下的繁华都市，车水马龙，流光溢彩。',
      url: 'https://picsum.photos/id/106/800/800',
    },
    {
      id: '4',
      title: '森林秘境',
      author: '赵六',
      description: '阳光透过树叶洒下斑驳光影，静谧而神秘。',
      url: 'https://picsum.photos/id/96/800/800',
    },
    {
      id: '5',
      title: '瀑布奇观',
      author: '小明',
      description: '瀑布从高处倾泻而下，水雾弥漫，气势磅礴。',
      url: 'https://picsum.photos/id/29/800/800',
    },
    {
      id: '6',
      title: '秋日枫叶',
      author: '小红',
      description: '深秋的枫叶红似火，铺满了整条小径。',
      url: 'https://picsum.photos/id/16/800/800',
    },
  ]
  
  // 获取所有照片
  export async function getAllPhotos(): Promise<Photo[]> {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 300))
    return photos
  }
  
  // 根据 ID 获取单张照片
  export async function getPhotoById(id: string): Promise<Photo | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return photos.find(photo => photo.id === id)
  }