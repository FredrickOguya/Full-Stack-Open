import { useState } from 'react'
import Togglable from './Togglable'
import { TextField, Button, Input } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            id="outlined-basic"
            label="title"
            variant="outlined"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            sx={{ mb: 2, mt: 2 }}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="author"
            variant="outlined"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            sx={{ mb: 2 }}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="url"
            variant="outlined"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button variant="contained" type="submit" style={{ marginTop: 10 }}>
          CREATE
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
