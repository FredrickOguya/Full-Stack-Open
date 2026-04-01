import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])


  const handleCreateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))

      setError(false)
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch{
      setError(true)
      setMessage('Error adding blog')
      setTimeout(() => {
        setError(null)
        setMessage(null)
      }, 5000)
    }
  }



  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      setError(false)
      setMessage(`You are now logged ${user.name}`)
      setTimeout(() => {
        setError(null)
        setMessage(null)
      }, 5000)
    } catch {
      setError(true)
      setMessage('wrong username or password')
      setTimeout(()=> {
        setError(false)
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
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

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes +1,
      user: blog.user.id
    }

      const returnedBlog = await blogService.update(blog.id, updatedBlog)

      const blogWithUser = {...returnedBlog, user: blog.user}

      setBlogs(blogs.map(b => b.id !== blog.id ? b : blogWithUser))
 
    
  }

  const handleBlogDelete = async (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)){



      try{
        await blogService.remove(blog.id)

        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch (exception) {
        console.error('Error deleting blog', exception)
      }
    }
  }

  const blogForm = () => (
      <Togglable buttonLabel="create new blog">
        <BlogForm createBlog={handleCreateBlog}/>
      </Togglable>   
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} error={error}/>

      {!user && loginForm()}
      {user &&  (
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>Log Out</button></p>
          {blogForm()}
          <div>{blogs.toSorted((a, b) => b.likes - a.likes).map(blog => (
            <Blog 
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleBlogDelete}
            />

          ))}</div>
        </div>
      )}
    </div>
  )
}

export default App