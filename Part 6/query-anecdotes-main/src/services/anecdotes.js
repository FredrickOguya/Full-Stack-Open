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

export  { getAnecdotes, createAnecdote }