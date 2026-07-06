import { useAnecdoteActions, useAnecdotes } from "./store"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()

  const anecdoteActions = useAnecdoteActions()

  const sortedAnecdotes = [...anecdotes].sort(
   (a,b) => b.votes - a.votes
  )
  return (
    <div>
      <h2>Anecdotes</h2>
      {
        sortedAnecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => anecdoteActions.vote(anecdote.id)}>vote</button>
            </div>
            {anecdote.votes ===0 && <button onClick={() => anecdoteActions.delete(anecdote.id)}>delete</button>}
          </div>
        ))
      }
    </div>
  )
}

export default AnecdoteList