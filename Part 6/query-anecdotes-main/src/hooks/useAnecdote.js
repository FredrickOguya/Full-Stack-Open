import { useQuery } from "@tanstack/react-query";
import { getAnecdotes } from "../services/anecdotes";

export const useAnecdotes = () => {
    return useQuery({
        queryFn: getAnecdotes,
        queryKey: ['anecdotes'],
        retry: false
    })
}

