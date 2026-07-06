
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'
import useNotificationStore from './notificationStore'




const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async (id) => {
      const anecdote = useAnecdoteStore.getState().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.update(id, {...anecdote, votes: anecdote.votes + 1}
      )
      set(state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? updated : a)
      }))
      useNotificationStore.getState().setNotification(`You voted for '${updated.content}'`)
    },
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
    initialize: anecdotes => set(() => ({ anecdotes })),
    delete: (id) => 
      set((state) => ({
        anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)
      }))
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