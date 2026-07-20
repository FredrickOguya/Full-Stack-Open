import { useAnecdoteActions } from "./store"
import anecdoteService from './services/anecdotes'
import { NotificationContext } from "./contexts/NotificationContext"
import useNotification from "./hooks/useNotification"

const AnecdoteForm = () => {

  const { addAnecdote } = useAnecdoteActions()
  const { showNotification } = useNotification(NotificationContext)

  const createAnecdote = async (event) => {
    event.preventDefault()

    try {
      const content = event.target.anecdote.value
      const newAnecdote = await anecdoteService.createNew(content)

      addAnecdote(newAnecdote)

      event.target.anecdote.value = ''
      showNotification(`${content} added successfully`)
    } catch (error) {
      showNotification(error.message)
    }
    
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