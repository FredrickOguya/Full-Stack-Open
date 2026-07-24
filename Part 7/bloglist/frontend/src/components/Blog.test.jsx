import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { expect, vi } from 'vitest'
import BlogForm from './BlogForm'

test('unauthenticated users can see blog info and likes but cannot see the buttons', () => {
  const blog = {
    title: 'Testing dis ting',
    author: 'Onyi ofcourse',
    url: 'https://realnigga',
    likes: 40,
    user: {
      username: 'Fredrick',
      name: 'Fredrick',
    },
  }

  render(<Blog blog={blog} user={null} />)

  expect(screen.getByText(/Testing dis ting/i)).toBeInTheDocument()
  expect(screen.getByText(/likes 40/i)).toBeInTheDocument()
  expect(
    screen.queryByRole('button', { name: /like/i })
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('button', { name: /delete/i })
  ).not.toBeInTheDocument()
})

test('authenticated users who are not the blog`s creator are shown only the like button', () => {
  const blog = {
    title: 'Testing dis ting',
    author: 'Onyi ofcourse',
    url: 'https://realnigga',
    likes: 40,
    user: {
      name: 'fredi',
    },
  }
  const user = {
    username: 'Fredrick',
    password: 'WsxfT',
  }

  render(<Blog blog={blog} user={user} />)

  expect(screen.getByText(/Testing dis ting/i)).toBeInTheDocument()
  expect(screen.getByText(/likes 40/i)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /like/i })).toBeInTheDocument()
  expect(
    screen.queryByRole('button', { name: /delete/i })
  ).not.toBeInTheDocument()
})

test('The blog`s creator is shown the delete button', () => {
  const blog = {
    title: 'Testing dis ting',
    author: 'Onyi ofcourse',
    url: 'https://realnigga',
    likes: 40,
    user: {
      username: 'Fredrick',
      name: 'Fredrick',
    },
  }
  const user = {
    username: 'Fredrick',
    name: 'Fredrick',
  }

  render(<Blog blog={blog} user={user} />)

  expect(screen.getByText(/Testing dis ting/i)).toBeInTheDocument()
  expect(screen.getByText(/likes 40/i)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /like/i })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /delete/i })).toBeInTheDocument()
})

test('authenticated users can click the like button and the likes increase', async () => {
  const blog = {
    title: 'Testing dis ting',
    author: 'Onyi ofcourse',
    url: 'https://realnigga',
    likes: 40,
    user: {
      name: 'Fredrick',
      username: 'Fredrick',
    },
  }
  const user = {
    name: 'Fredrick',
    username: 'Fredrick',
  }

  const mockHandler = vi.fn()

  render(
    <Blog
      blog={blog}
      user={user}
      handleDelete={mockHandler}
      handleLike={mockHandler}
    />
  )

  const clicker = userEvent.setup()

  const likeButton = screen.getByText('like')
  await clicker.click(likeButton)
  await clicker.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

  expect(screen.getByText(/Testing dis ting/i)).toBeInTheDocument()
  expect(screen.getByText(/likes 40/i)).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /like/i })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /delete/i })).toBeInTheDocument()
})

test('Blog calls the event handler with the right details when anew blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('Enter the title')
  const authorInput = screen.getByPlaceholderText('Enter the author`s name')
  const urlInput = screen.getByPlaceholderText('Enter the url')
  const saveButton = screen.getByText('save')

  await user.type(titleInput, 'tester of form')
  await user.type(authorInput, 'Fredrick Onyango')
  await user.type(urlInput, 'http://formtester.com')

  await user.click(saveButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  const submittedBlog = createBlog.mock.calls[0][0]

  expect(submittedBlog.title).toBe('tester of form')
  expect(submittedBlog.author).toBe('Fredrick Onyango')
  expect(submittedBlog.url).toBe('http://formtester.com')
})
