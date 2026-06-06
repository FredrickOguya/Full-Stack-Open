const Blog = ({ blog, handleLike,handleDelete,user }) => {

  if(!blog) {
    return <div>Loading...</div>
  }

  const showRemoveButton = blog.user?.username === user?.username



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
      </div>
      <div >
        <p>{blog.url}</p>
        <div>
          <p>likes {blog.likes}</p>
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <p>{blog.user.name}</p>
        {showRemoveButton && (<button
          style={{ backgroundColor: 'dodgerblue', color: 'white' }}
          onClick={() => handleDelete(blog)}
        >delete</button>
        )}
      </div>
    </div>

  )
}

export default Blog