import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate,
  useMatch
} from 'react-router-dom'
import Blogs from './components/Blogs'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const navigate = useNavigate()
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

      setNotification({
        text: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        type: 'success'
      })
      navigate('/')

      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch{
      setNotification({
        text: 'Error adding blog',
        type: 'error'

      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }



  const handleLogin = async (credentials) => {

    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setNotification({
        text: `You are now logged ${user.name}`,
        type: 'success'
      })
      setTimeout(() => {
        navigate('/')
      }, 2000)
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch {
      setNotification({
        text: 'wrong username or password',
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    navigate('/login')
  }


  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes +1,
      user: blog.user.id
    }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)

    const blogWithUser = { ...returnedBlog, user: blog.user }

    setBlogs(blogs.map(b => b.id !== blog.id ? b : blogWithUser))
  }

  const handleBlogDelete = async (blog) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)){



      try{
        await blogService.remove(blog.id)

        setBlogs(blogs.filter(b => b.id !== blog.id))

        navigate('/')
      } catch (exception) {
        console.error('Error deleting blog', exception)
      }
    }
  }





  const padding = {
    padding: 5
  }

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(b => b.id === match.params.id) : null
  return (
    <div>
      <div>
        {user ? (
          <div>
            <Box>
              <AppBar position='static'>
                <Toolbar>
                  <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>Blog App</Typography>
                  <Button component={Link} style={ padding } color='inherit' to="/">blogs</Button>
                  <Button component={Link} style={ padding } color='inherit' to="/create-new-blog">create new blog</Button>
                  <Button color='inherit' onClick={handleLogout}>Logout</Button>
                </Toolbar>
              </AppBar>
            </Box>
          </div>
        ) : (
          <div>

            <Link style={padding} to="/">blogs</Link>
            <Link style={padding} to="/login">login</Link>
          </div>
        )}

      </div>

      <Notification notification={notification}/>
      <Routes>
        <Route path='/' element={
          <Blogs
            blogs={blogs}
          />
        } />
        <Route path='/login' element={
          <LoginForm handleLogin={handleLogin} user={user} notification={notification}/>
        } />
        <Route path='/create-new-blog' element={
          <BlogForm notification={notification} createBlog={handleCreateBlog}/>

        } />
        <Route path='/blogs/:id' element={
          <Blog blog={blog} handleDelete={handleBlogDelete} handleLike={handleLike} user={user} />
        }/>
      </Routes>
    </div>
  )
}

export default App