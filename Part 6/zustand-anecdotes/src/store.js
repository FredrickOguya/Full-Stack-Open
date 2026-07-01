
import { create } from 'zustand'





const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: id => set(
      state => ({
        anecdotes: state.anecdotes.map(anecdote => 
          anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1} : anecdote
        )
      })
    ),
    addAnecdote: newAnecdote => set(
      state => ({
        anecdotes: state.anecdotes.concat(newAnecdote)
      })
    ),
    setFilter: (value) => 
      set(() => ({
        filter: value
      })
    ),
    initialize: anecdotes => set(() => ({ anecdotes }))
  }
}))

export const useAnecdotes = () => {
  const anecdote = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)

  return anecdote.filter(anecdote => 
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )
}
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)