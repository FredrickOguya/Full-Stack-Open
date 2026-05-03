import { useState } from 'react'

const Blog = ({ blog, handleLike,handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const label = visible ? 'hide' : 'view'

  const showWhenVisible = { display: visible ? '' : 'none' }

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
        <p>{blog.title} {blog.author}</p>
        <button onClick={toggleVisibility}>{label}</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <div>
          <p>likes {blog.likes}</p>
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <p>{blog.user.name}</p>
        <button
          style={{ backgroundColor: 'dodgerblue', color: 'white' }}
          onClick={() => handleDelete(blog)}
        >delete</button>
      </div>
    </div>

  )
}

export default Blog