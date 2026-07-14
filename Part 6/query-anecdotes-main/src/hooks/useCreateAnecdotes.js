import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../services/anecdotes"

export const useCreateAnecdote = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['anecdotes']
            })
        }
    })
}