import { useAnecdoteActions } from "./store"

const AnecdoteForm = () => {

  const { addAnecdote } = useAnecdoteActions()

  const createAnecdote = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value

    addAnecdote(content)

    event.target.anecdote.value = ''
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