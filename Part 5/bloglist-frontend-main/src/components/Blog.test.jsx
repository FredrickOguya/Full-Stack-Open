import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { expect, vi } from 'vitest'



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

test('blog details (url and likes) are shown when the view button is clicked', async () => {
  const blog = {
    title: 'Locking back in',
    author: 'Fredrick Onyango',
    url: 'https://fredasshi.com',
    likes: 7,
    user: { name: 'Test Admin' }
  }
  const mockHandler = vi.fn()

  render(<Blog blog={blog} handleLike={mockHandler} handleDelete={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const urlElement = screen.queryByText('https://fredasshi.com')
  const likesElement = screen.getByText(/likes/i)

  expect(urlElement).toBeVisible()
  expect(likesElement).toBeVisible()

})

test('if the like button is clicked twice, the prop is received twice', async () => {
  const blog = {
    title: 'Testing twice clicking',
    author: 'Onyango Fredrick',
    url: 'https://twiceclicking.com',
    likes: 6,
    user: { name: 'testing onyi' }
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} handleDelete={mockHandler} handleLike={mockHandler}/>)

  const user = userEvent.setup()

  const showButton = screen.getByText('view')
  await user.click(showButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})