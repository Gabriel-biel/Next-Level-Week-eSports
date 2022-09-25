import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { intToString } from "../utils/IntoToString"

interface IGame {
  id: string
  title: string
  description: string
  bannerUrl: string
  viewers: number
  followers: number
}

interface IGameAdsHeaderProps {
  id: string
}

export function GameAdsHeader({ id }: IGameAdsHeaderProps) {
  const [game, setGame] = useState({} as IGame)

  useEffect(() => {
    async function getGameForId() {
      const response = await axios.get<IGame>(`http://localhost:3333/games/${id}`)
      setGame(response.data)
    }

    getGameForId()
  }, [id])

  const viewers = useMemo(() => {
    return intToString(game.viewers)
  }, [game.viewers])

  const followers = useMemo(() => {
    return intToString(game.followers)
  }, [game.followers])


  return (
    <div className="flex gap-6">
      <img src={game.bannerUrl} alt="imgGame" />
      <div className="p-2">
        <strong className="block mb-2 text-4xl text-white">{game.title}</strong>
        <p className="block text-xl text-white mb-2">
          <strong>{followers}</strong> Followers •
          <strong className="flex-inline ml-1"> {viewers}</strong> Viewers
        </p>
        <p className="text-zinc-300 text-sm max-w-21xl">{game.description}</p>
      </div>
    </div>
  )
}