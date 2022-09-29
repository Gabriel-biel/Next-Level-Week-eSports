import * as Dialog from '@radix-ui/react-dialog'
import * as Tooltip from '@radix-ui/react-tooltip'
import axios from 'axios'
import { X, CheckCircle } from 'phosphor-react'
import { useEffect, useState } from 'react'

interface DiscordModalProps {
  id: string
}

interface Discord {
  discord: string
}

export function DiscordModal({ id }: DiscordModalProps) {
  const [discord, setDiscord] = useState({} as Discord)
  const [openTooltip, setOpenTooltip] = useState(false)

  useEffect(() => {
    async function getDiscord() {
      const response = await axios.get<Discord>(`http://localhost:3333/ads/${id}/discord`)
      setDiscord(response.data)
    }

    getDiscord()
  }, [id])

  function handleOpenTooltip() {
    setOpenTooltip(true)
    navigator.clipboard.writeText(discord.discord)
  }

  function handleCloseTooltip() {
    setTimeout(() => {
      setOpenTooltip(false) 
    }, 1000)
  }

  return (
    <Tooltip.Provider>
      <Tooltip.Root open={openTooltip}>
        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 bg-black/20' />
          <Dialog.Content className='fixed rounded bg-[#2A2634] text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4'>
            <div className='relative py-4 px-6 flex flex-col gap-6 items-center w-full'>
              <Dialog.Close className='absolute right-0 top-0'>
                <X className='text-xl text-zinc-500' />
              </Dialog.Close>
              <CheckCircle className='text-6xl text-emerald-400' />
              <main className='flex w-full flex-col items-center'>
                <Dialog.Title className='text-2xl font-black'>Let's Play!</Dialog.Title>
                <span className='text-zinc-400'>Agora é só começar a jogar!</span>
              </main>
              <div className='flex flex-col w-full gap-2 items-center'>
                <strong>Adicione no Discord</strong>
                <Tooltip.Trigger className='w-full h-12 bg-zinc-900 text-zinc-200 font-semibold rounded'
                  onClick={handleOpenTooltip}
                  onMouseLeave={handleCloseTooltip}
                >
                  {discord.discord}
                </Tooltip.Trigger>

                <Tooltip.Portal>
                  <Tooltip.Content side='bottom'
                    className='bg-[#8B5CF6] text-white rounded py-2 px-3 text-sm'
                  >
                    <Tooltip.Arrow className='fill-[#8B5CF6]' />
                    <span>Discord copiado!</span>
                  </Tooltip.Content>
                </Tooltip.Portal>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}