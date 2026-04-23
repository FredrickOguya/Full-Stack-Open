import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (<form onSubmit={addBlog}>
    <div>
      <label>
        Title:
        <input value={title} onChange={({ target }) => setTitle(target.value)} placeholder='Enter the title'/>
      </label>
    </div>
    <div>
      <label>
        Author:
        <input value={author} onChange={({ target }) => setAuthor(target.value)} placeholder='Enter the author`s name'/>
      </label>
    </div>
    <div>
      <label>
        url:
        <input value={url} onChange={({ target }) => setUrl(target.value)} placeholder='Enter the url'/>
      </label>
    </div>
    <button type='submit'>save</button>
  </form>
  )
}

export default BlogForm