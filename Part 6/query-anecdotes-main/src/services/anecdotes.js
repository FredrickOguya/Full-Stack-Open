const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
    const response = await fetch(baseUrl)

    if(!response.ok){
        throw new Error('There was a problem fetching the data')
    }

    return response.json()
}

const createAnecdote = async (content) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({content, votes: 0})
    })

    if(!response.ok) {
        throw new Error('Error creating anecdote')
    }

    return response.json()
}

const updateAnecdote = async (anecdote) => {

    const updated = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await fetch(`${baseUrl}/${anecdote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(updated)
    })
    if(!response.ok){
        throw new Error('Error updating vote')
    }

    return response.json()
}

export  { getAnecdotes, createAnecdote, updateAnecdote }