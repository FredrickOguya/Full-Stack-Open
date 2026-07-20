import { useAnecdoteActions } from "./store"
import anecdoteService from './services/anecdotes'
import { useContext } from "react"
import { NotificationContext } from "./contexts/NotificationContext"

const AnecdoteForm = () => {

  const { addAnecdote } = useAnecdoteActions()
  const { showNotification } = useContext(NotificationContext)

  const createAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    const newAnecdote = await anecdoteService.createNew(content)

    addAnecdote(newAnecdote)

    event.target.anecdote.value = ''
    showNotification(`${content} added successfully`)
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