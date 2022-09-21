import './styles/main.css'

import * as Dialog from '@radix-ui/react-dialog'

import logoImg from './assets/logo.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useEffect, useState } from 'react'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'

interface IGame {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number,
  }
}

export function App() {
  const [games, setGames] = useState<IGame[]>([])
  
  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, []);

  return (
      <div className="max-w-[1344px] mx-auto flex flex-col items-center my-2 px-6">
        <img src={logoImg} alt="logoImg"/>
        <h1 className='text-6xl text-white font-black mt-4'>Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span>Está aqui</h1>

        <div className='grid grid-cols-6 gap-6 mt-5'>
          {games.map(game => {
            return (
              <GameBanner
                key={game.id}
                bannerUrl={game.bannerUrl} 
                title={game.title} 
                adsCount={game._count.ads} 
              />
              )
            })}
        </div>

        <Dialog.Root>
          <CreateAdBanner />
          <CreateAdModal />  
        </Dialog.Root>
      </div>
  )
}
