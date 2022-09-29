import * as Dialog  from "@radix-ui/react-dialog";
import axios from "axios";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { Ad } from "./components/Ad";
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
      axios.get<IAd[]>(`http://localhost:3333/games/${id}/ads`).then(response => {
          setAds(response.data)
      })
  }, [id]);
  
  return (
    <div className="w-[1344px] mx-auto flex flex-col items-center my-20 px-8 gap-12">
      <header className="flex w-full justify-between items-start p-6 bg-zinc-900/50 rounded-lg">
        <GameAdsHeader id={String(id)} />
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-7 h-7 text-white"/>
        </button>
      </header>

      <Dialog.Root>
        <main className="grid grid-cols-6 w-full gap-4">
          {ads.map(ad => (
            <Ad key={ad.id} ad={ad}/>
            ))}
        </main>
      </Dialog.Root>
    </div>
  )
}