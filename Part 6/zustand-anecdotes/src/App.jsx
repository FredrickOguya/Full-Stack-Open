
import { useAnecdoteActions, useAnecdotes } from './store'

const App = () => {
  const anecdotes = useAnecdotes()
  const { addAnecdote } = useAnecdoteActions()

  const createAnecdote = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value

    addAnecdote(content)

    event.target.anecdote.value = ''
  }

  const vote = id => {
    console.log('vote', id)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
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

export default App