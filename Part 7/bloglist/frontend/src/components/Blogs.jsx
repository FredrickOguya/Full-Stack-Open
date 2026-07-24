import { Link } from 'react-router-dom'
const Blogs = ({  blogs }) => {
  return <div>
    {(
      <div>
        <h3>Blogs</h3>
        <div>{blogs.toSorted((a, b) => b.likes - a.likes).map(blog => (
          <ul>
            <li>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.author}
              </Link>
            </li>
          </ul>
        ))}</div>
      </div>
    )}
  </div>
}

export default Blogs