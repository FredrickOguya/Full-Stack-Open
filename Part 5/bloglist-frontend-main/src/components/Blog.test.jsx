import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    user:{
      name: 'Fredrick'
    },
    title: 'I am here',
    author: 'Fredrick Onyango',
    url: 'http://testing.com',
    likes: 30
  }
  render(<Blog blog={blog}/>)

  const titleElement = screen.getByText('I am here Fredrick Onyango')
  const urlElement = screen.queryByText('http://testing.com')
  const likesElement = screen.getByText(/likes/i)

  expect(titleElement).toBeInTheDocument()
  expect(urlElement.parentElement).toHaveStyle('display:none')
  expect(likesElement).not.toBeVisible()
})