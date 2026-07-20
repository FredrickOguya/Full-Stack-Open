
import { useContext, useEffect } from 'react'
import AnecdoteForm from './AnecdoteForm'
import AnecdoteList from './AnecdoteList'
import Filter from './Filter'
import anecdoteService from './services/anecdotes'
import { useAnecdoteActions } from './store'
import Notification from './components/Notification'


const App = () => {

  const { initialize } = useAnecdoteActions()

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => initialize(anecdotes))
  }, [initialize])
  return (
    <div>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App