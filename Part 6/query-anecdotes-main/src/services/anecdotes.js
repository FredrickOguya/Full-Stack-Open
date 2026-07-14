const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
    const response = await fetch(baseUrl)

    if(!response.ok){
        throw new Error('There was a problem fetching the data')
    }

    return response.json()
}

export default getAnecdotes