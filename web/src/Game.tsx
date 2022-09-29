import * as Dialog  from "@radix-ui/react-dialog";
import axios from "axios";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { Ad } from "./components/Ad";
import { DiscordModal } from "./components/DiscordModal";
import { GameAdsHeader } from "./components/GameAdsHeader";

export interface IAd {
  id: string
  name: string
  weekDays: string[]
  useVoiceChannel: boolean
  yearsPlayning: number
  hourStart: string
  hourEnd: string
}

export function Game() {
  // Buscar o game pelo id,
  // Exibir infos em tela
  
  const [ads, setAds] = useState<IAd[]>([])
  
  // Pegar o id do useParams,
  const { id } = useParams<'id'>()

  const navigate = useNavigate()
  
  // Buscar o Ads pelo id do game
  useEffect(() => {
    async function loadAds() {
      const response = await axios.get<IAd[]>(`http://localhost:3333/games/${id}/ads`)
      setAds(response.data)
    }
    loadAds()
    }, [id]);
  
  return (
    <div className="w-[1344px] mx-auto flex flex-col items-center my-6 px-4 gap-4">
      <header className="flex w-full justify-between items-start p-6 bg-zinc-900/50 rounded-lg">
        <GameAdsHeader id={String(id)} />
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-7 h-7 text-white"/>
        </button>
      </header>

      <Dialog.Root>
        <main className="grid grid-cols-5 w-full gap-4">
          {ads.map(ad => (
            <>
              <Ad key={ad.id} ad={ad}/>
              <DiscordModal key={ad.id} id={ad.id}/>
            </>
            ))}
        </main>
      </Dialog.Root>
    </div>
  )
}