import { describe, expect, it, vi  } from "vitest";
import anecdoteService from './services/anecdotes'
import { renderHook, act } from "@testing-library/react";
import useAnecdoteStore, { useAnecdotes } from "./store";

vi.mock('./services/anecdotes', () => {
  return {
    default: {
      getAll: vi.fn(),
      createNew: vi.fn(),
      update: vi.fn()
    }
  }
})

describe('Anecdote Store Logic', () => {
  it('Initializes with data from backend', async () => {
    const anecdotes = [
      {id: 1, content: 'Allo', votes: 5 }, 
      {id: 2, content: 'mi guy', votes: 3 }
    ]
    anecdoteService.getAll.mockResolvedValue(anecdotes)

    const { result } = renderHook(() => useAnecdoteStore(state => state))
    await act(async () => await result.current.actions.initialize(anecdotes))

    expect(useAnecdoteStore.getState().anecdotes).toEqual(anecdotes)
  })

  it('anecdotes are sorted by votes', () => {
    useAnecdoteStore.setState( { anecdotes: [
      { id: 1,content: 'A', votes: 1}, { id: 2, content: 'B', votes: 10 }, { id: 3, content: 'C', votes: 5 }
    ]})

    const { result } = renderHook(() => useAnecdotes())

    expect(result.current[0].votes).toBe(10)
    expect(result.current[1].votes).toBe(5)
    expect(result.current[2].votes).toBe(1)
  })

  it('anecdotes are filtered properly', () => {
    useAnecdoteStore.setState({
      anecdotes: [{ content: 'React' }, { content: 'Vue' }],
      filter: 'Re'
    })

    const { result } = renderHook(() => useAnecdotes())
    expect(result.current).toHaveLength(1)
    expect(result.current[0].content).toBe('React')
  })
})