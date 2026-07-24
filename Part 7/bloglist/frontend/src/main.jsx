import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { useNavigate, BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)

const Blog = ({ blog }) => {
  const navigate = useNavigate()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const handleView = () => {
    // Navigates to a specific URL for this blog
    navigate(`/blogs/${blog.id}`)
  }

  return (
    <div style={blogStyle}>
      <div>
        <strong>{blog.title}</strong> by {blog.author}
      </div>
      <button onClick={handleView}>view</button>
    </div>
  )
}

export default Blog
