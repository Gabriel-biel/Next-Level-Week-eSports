import axios from "axios"
import { useEffect, useState } from "react"

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


  return (
    <div>
      <img src={game.bannerUrl} alt="imgGame" />
      <div className="p-2">
        <strong className="text-white">{game.title}</strong>
        <p>
          <strong>{game.followers}</strong> º Followers
          <strong>{game.viewers}</strong> º Viewers
        </p>
        <p>{game.description}</p>
      </div>
    </div>
  )
}