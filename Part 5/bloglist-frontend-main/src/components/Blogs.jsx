import { Link } from 'react-router-dom'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Notification from './Notification'
const Blogs = ({ user, blogs }) => {
  return <div>
    {user &&  (
      <div>
        <div>{blogs.toSorted((a, b) => b.likes - a.likes).map(blog => (
          <p>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </p>
        ))}</div>
      </div>
    )}
  </div>
}

export default Blogs