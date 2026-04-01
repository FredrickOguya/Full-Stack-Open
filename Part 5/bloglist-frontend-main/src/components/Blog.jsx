import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const label = visible ? 'hide' : 'view'

  const showWhenVisible = { display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{label}</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button>like</button>
        </p>
        <p>{blog.user.name}</p>
      </div>
      
    </div>

  )
}

export default Blog