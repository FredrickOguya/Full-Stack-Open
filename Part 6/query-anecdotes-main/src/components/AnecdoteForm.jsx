import { useMutation, useQueryClient } from "@tanstack/react-query"
import {createAnecdote} from '../services/anecdotes'



const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })
    }
  })
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    mutation.mutate(content)
    event.target.reset()
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm