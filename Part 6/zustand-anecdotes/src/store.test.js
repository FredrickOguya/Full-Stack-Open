import { describe, expect, it, vi  } from "vitest";
import anecdoteService from './services/anecdotes'
import { renderHook, act } from "@testing-library/react";
import useAnecdoteStore from "./store";

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
})