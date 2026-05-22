import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'
const Blogs = ({ message, error, user, blogs, handleLike, handleBlogDelete, handleCreateBlog }) => {
  return <div>
    <Notification message={message} error={error}/>
    {user &&  (
      <div>
        <BlogForm createBlog={handleCreateBlog}/>
        <div>{blogs.toSorted((a, b) => b.likes - a.likes).map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleBlogDelete}
            user={user}
          />

        ))}</div>
      </div>
    )}
  </div>
}

export default Blogs