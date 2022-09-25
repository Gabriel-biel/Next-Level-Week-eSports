import { Routes as Switch, Route} from 'react-router-dom'
import { App } from './App'
import { Game } from './Game'

export function Routes() {
  return (
    <Switch>
      <Route path="/" element={<App/>}/>
      <Route path='/games/:id' element={<Game/>} />
    </Switch>
  )
}