import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from '@radix-ui/react-select';
import * as Toast from '@radix-ui/react-toast';


import { Check, GameController } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "./Form/Input";
import axios from "axios";

interface IGame {
  id: string,
  title: string
}

export function CreateAdModal() {

  const [games, setGames] = useState<IGame[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  const [alertDataUndefined, setAlertDataUndefined] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3333/games').then(response => setGames(response.data))
  }, []);

  async function handleCreatedAd(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if(weekDays.length <= 0 || !data.name || !data.discord || !data.hoursStart || !data.hoursEnd || !data.useVoiceChannel ) {
      return setAlertDataUndefined(true)
    }
   
    try {
      await axios.post(`http://localhost:3333/game/${data.game}/ads`, {
      name: data.name,
      yearsPlayning: Number(data.yearsPlayning),
      discord: data.discord,
      weekDays: weekDays.map(Number),
      hoursStart: data.hoursStart,
      hoursEnd: data.hoursEnd,
      useVoiceChannel: useVoiceChannel,
    })

    alert('Anúncio Criado com sucesso!')
    } catch (error) {
      alert('Erro ao criar o anúncio')
    }
  }

  return (
    <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'>
              <Dialog.Content 
                className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[600px] shadow-large shadow-black/25'
              >
                <Dialog.Title className='text-3xl font-black'>Publique um Anúncio</Dialog.Title>

                  <form onSubmit={handleCreatedAd} className='mt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="game" className='font-semibold'>Qual o Game?</label>
                      <Select.Root>
                        <Select.Trigger
                          id="game"
                          name='game' 
                          className="inline-flex bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                          defaultValue=''
                        >
                          <Select.Value placeholder='Selecione o game que deseja jogar' />

                          </Select.Trigger>
                          <Select.Portal>
                            <Select.Content>
                              <Select.Viewport className="rounded-md">
                              {games.map(game => {
                                return (
                                  <Select.Item 
                                    key={game.id} 
                                    value={game.id} 
                                    className="flex justify-center items-center bg-zinc-900 py-3 px-4 text-sm text-white placeholder:text-zinc-500 cursor-pointer hover:bg-violet-500"
                                  >
                                    <Select.ItemText>
                                      {game.title}
                                    </Select.ItemText>
                                  </Select.Item>
                                )
                              })} 
                              </Select.Viewport>
                            </Select.Content>
                          </Select.Portal>
                      </Select.Root>
                    </div>

                    <div className='flex flex-col gap-2'>
                      <label htmlFor="name">Seu Nome (nickname)</label>
                      <Input name='name' id='name' placeholder='Como te chamam dentro do Jogo?' />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                      <div className='flex flex-col gap-2'>
                        <label htmlFor="yearsPlayning">Joga a quantos Anos?</label>
                        <Input name='yearsPlayning' id='yearsPlayning' type="number" min={0} placeholder='Tudo bem ser 0' className="appearance-none"/>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <label htmlFor="discord">Qual o seu Discord?</label>
                        <Input name='discord' id='discord' placeholder='usuário#0000'/>
                      </div>
                    </div>

                    <div className='flex gap-6'>
                      <div className='flex flex-col gap-2'>
                        <label htmlFor="weekDays">Quando Costuma Jogar?</label>
                        <div>
                          <ToggleGroup.Root
                            onValueChange={setWeekDays}
                            value={weekDays} 
                            type="multiple"
                            className="flex gap-1"
                            >

                            <ToggleGroup.Item
                              value="0" 
                              title='Domingo'
                              className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500': 'bg-zinc-900'} `}
                              >
                                D
                              </ToggleGroup.Item>
                            <ToggleGroup.Item
                              value="1" 
                              title='Segunda'
                              className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                              >
                                S
                              </ToggleGroup.Item>
                            <ToggleGroup.Item 
                              value="2"
                              title='Terça'
                              className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                              >
                                T
                              </ToggleGroup.Item>
                            <ToggleGroup.Item
                              value="3" 
                              title='Quarta'
                              className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                              >
                                Q
                              </ToggleGroup.Item>
                            <ToggleGroup.Item 
                              value="4"
                              title='Quinta'
                              className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                              >
                                Q
                              </ToggleGroup.Item>
                            <ToggleGroup.Item 
                              value="5"
                              title='Sexta'
                              className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                              >
                                S
                              </ToggleGroup.Item>
                            <ToggleGroup.Item 
                              value="6"
                              title='Sábado'
                              className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                              >
                                S
                            </ToggleGroup.Item>
                          </ToggleGroup.Root>
                        </div>
                      </div>
                      <div className='flex flex-col gap-2 flex-1'>
                        <label htmlFor="hoursStart">Qual horário do dia?</label>
                        <div className='grid grid-cols-2 gap-2'>
                          <Input name='hoursStart' id='hoursStart' type="time" placeholder='De'/>
                          <Input name='hoursEnd' id='hoursEnd' type="time" placeholder='Até'/>
                        </div>
                      </div>
                    </div>

                    <label className='mt-2 flex items-center gap-2 text-sm'>
                      <Checkbox.Root
                        checked={useVoiceChannel} 
                        onCheckedChange={(checked) => {
                          if(checked === true) {
                            setUseVoiceChannel(true)
                          }else {
                            setUseVoiceChannel(false)
                          }
                        }}
                        className="w-6 h-6 p-1 rounded bg-zinc-900">
                        <Checkbox.Indicator>
                          <Check size={16} color='#34D339'/>
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      Costumo me conectar ao chat de voz
                    </label>

                    <footer className='mt-4 flex justify-end gap-4'>
                      <Dialog.Close 
                        type='button' 
                        className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
                        >
                        Cancelar
                      </Dialog.Close>
                      <button
                        type='submit' 
                        className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3bg-violet-600 hover:'>
                        <GameController size={24}/>
                        Encontrar duo
                      </button>
                    </footer>
                  </form>

              </Dialog.Content>
                <Toast.Provider swipeDirection="down" duration={5000}>
                  <Toast.Viewport className="flex w-[100vw] h-[100vh] justify-end items-end p-10">
                    <Toast.Root
                      open={alertDataUndefined} 
                      onOpenChange={setAlertDataUndefined}
                      className="flex flex-col w-1/5 h-20 justify-center items-center p-4 bg-violet-500/50 rounded-md shadow-md animate-pulse"
                    >
                      <Toast.Title className="text-white font-bold">Preencha todos os Campos !</Toast.Title>
                      <Toast.Action altText="close" className="bg-green-300/50 p-2 rounded-md">
                        <button className="text-white font-semibold">Entendi</button>
                      </Toast.Action>
                    </Toast.Root>
                  </Toast.Viewport>
                </Toast.Provider>
            </Dialog.Overlay>  
          </Dialog.Portal>
  )
}