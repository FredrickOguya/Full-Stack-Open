import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdote'
import { useVoteAnecdote } from './hooks/useVoteAnecdote'

const App = () => {
  const voteMutation = useVoteAnecdote()



  


  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
  }


  const { data, isPending, isError} = useAnecdotes()
  
  
  if(isPending){
    return <div>loading ...</div>
  }

  if(isError){
    return <div>anecdote service not available due to problems in server</div>
  }


  const anecdotes = data


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {
      anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App