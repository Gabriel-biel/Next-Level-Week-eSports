import { Link } from 'react-router-dom'

interface IGamerBannerProps {
  bannerUrl?: string,
  title: string,
  adsCount?: number
  id: string
}

export function GameBanner({ bannerUrl, adsCount, title, id } : IGamerBannerProps) {
  return (
    <Link to={`/games/${id}`} className='flex relative rounded-lg overflow-hidden'>
      <img src={bannerUrl} alt=""/>
      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
        <strong className='font-bold text-white block'>{title}</strong>
        <strong className='text-zinc-300 text-sm block'>{adsCount} anúncio(s)</strong>
      </div>
    </Link>
  )
}