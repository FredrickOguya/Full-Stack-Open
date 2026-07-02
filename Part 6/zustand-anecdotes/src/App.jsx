
import { useEffect } from 'react'
import AnecdoteForm from './AnecdoteForm'
import AnecdoteList from './AnecdoteList'
import Filter from './Filter'
import anecdoteService from './services/anecdotes'
import { useAnecdoteActions } from './store'
import Notification from './components/Notification'
import useNotificationStore from './notificationStore'


const App = () => {

  const { initialize } = useAnecdoteActions()
  const notification = useNotificationStore(state => state.notification)

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => initialize(anecdotes))
  }, [initialize])
  return (
    <div>
      <Notification message={notification}/>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App