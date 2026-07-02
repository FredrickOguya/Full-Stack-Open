import { useAnecdoteActions } from "./store"
import anecdoteService from './services/anecdotes'
import useNotificationStore from "./notificationStore"

const AnecdoteForm = () => {

  const { addAnecdote } = useAnecdoteActions()
  const setNotification = useNotificationStore(state => state.setNotification)

  const createAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    const newAnecdote = await anecdoteService.createNew(content)

    addAnecdote(newAnecdote)

    event.target.anecdote.value = ''
    setNotification(`${content} added successfully`)
  }

  return (
    <div>
    <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
        <input name='anecdote'/>
        </div>
        <button>create</button>
      </form>
    </div>

  )
}
export default AnecdoteForm