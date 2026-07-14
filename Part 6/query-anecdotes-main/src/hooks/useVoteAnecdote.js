import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAnecdote } from "../services/anecdotes"

export const useVoteAnecdote = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['anecdotes']
            })
        }
    })
}