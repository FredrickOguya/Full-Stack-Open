import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [likes, setLikes] = useState(0)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      url: url,
      title: title,
      author: author,
      likes: likes
    }

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setUrl('')
      setTitle('')
      setAuthor('')
      setLikes(0)
    })
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(()=> {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {

      return (
        
        <div>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>
              username
                <input
                  type='text'
                  value={username}
                  onChange={({ target })=> setUsername(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                password
                <input
                  type='text'
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </label>
            </div>
            <button type='submit'>login</button>
          </form>
        </div>
      )


  
  }

  const handleUrlChange = event => {
    setUrl(event.target.value)
  }

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = event => {
    setAuthor(event.target.value)
  }

  const handleLikesChange = event => {
    setLikes(event.target.value)
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label>
          url
          <input value={url} onChange={handleUrlChange}/>
        </label>
      </div>
      <div>
        <label>
          Title
          <input value={title} onChange={handleTitleChange}/>
        </label>
      </div>
      <div>
        <label>
          Author
          <input value={author} onChange={handleAuthorChange}/>
        </label>
      </div>
      <div>
        <label>
          Likes
          <input value={likes} onChange={handleLikesChange}/>
        </label>
      </div>
      
      
      
      
      <button type='submit'>save</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage}/>

      {!user && loginForm()}
      {user &&  (
        <div>
          <p>{user.name} logged</p>
          {blogForm()}
          <div>{blogs.map(blog => (
            <Blog 
              key={blog.id}
              blog={blog}
            />

          ))}</div>
        </div>
      )}
    </div>
  )
}

export default App