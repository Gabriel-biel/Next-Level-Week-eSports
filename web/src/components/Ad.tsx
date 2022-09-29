import * as Dialog from '@radix-ui/react-dialog'
import { GameController } from 'phosphor-react'
import { IAd as AdComponent } from '../Game'

interface IAdPropForComponent {
  ad: AdComponent
}

export function Ad (
    { ad: {name, yearsPlayning, weekDays, useVoiceChannel} }: IAdPropForComponent
  ) {
  return (
    <div className='p-4 mb-1 rounded bg-gradient-to-r from-violet-500/50 to-fuchsia-500/50'>
      <span className='block text-zinc-300 text-sm'>Nome</span>
      <strong className='text-white'>{name}</strong>

      <span className='block text-zinc-300'>Tempo de Jogo</span>
      <strong className='text-white'>
        {yearsPlayning != 1 ? `${yearsPlayning} anos` : `${yearsPlayning} ano`}
      </strong>


      <span className='block text-zinc-300'>Disponibilidade</span>
      <strong className='text-white'>{weekDays.length != 1 ? `${weekDays.length} dias` : `${weekDays.length} ano`}</strong>

      <span className='block text-zinc-300'>Chamada de aúdio</span>
      <strong className='text-white'>{useVoiceChannel ? 'Sim' : 'Não'}</strong>

      <Dialog.Trigger className='bg-gradient-to-r from-sky-500/50 to-indigo-500 flex w-full mt-4 justify-center items-center gap-4 rounded text-white font-semibold'>
        <GameController size={20}/>
        Connectar
      </Dialog.Trigger>
    </div>        
  )
}