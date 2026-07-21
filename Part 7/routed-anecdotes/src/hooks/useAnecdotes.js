import { useEffect, useState } from "react"
import anecdoteService from '../services/anecdotes'

export const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(() => {
        anecdoteService.getAll().then(data => setAnecdotes(data))
    }, [])

    const addAnecdote = async (anecdote) => {
        const created = await anecdoteService.createNew(anecdote)
        setAnecdotes(prev => prev.concat(created))
    }

    const deleteAnecdote = async (id) => {
        await anecdoteService.remove(id)
        setAnecdotes(prev => prev.filter(anecdote => anecdote.id !== id))
    }

    return { anecdotes, addAnecdote, deleteAnecdote }
}