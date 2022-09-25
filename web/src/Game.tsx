import axios from "axios";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { GameAdsHeader } from "./components/GameAdsHeader";

interface IAdsProps {
  id: string
  name: string
  weekDays: string[]
  useVoiceChannel: boolean
  yearsPlaying: number
  hourStart: string
  hourEnd: string
}

export function Game({name, weekDays, useVoiceChannel, yearsPlaying, hourEnd, hourStart}: IAdsProps) {
  // Buscar o game pelo id,
  // Exibir infos em tela
  
  const [ads, setAds] = useState<IAdsProps[]>([])
  
  // Pegar o id do useParams,
  const { id } = useParams<'id'>()

  const navigate = useNavigate()
  
  // Buscar o Ads pelo id do game
  useEffect(() => {
      axios.get<IAdsProps[]>(`http://localhost:3333/games/${id}/ads`).then(response => {
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
    </div>
  )
}