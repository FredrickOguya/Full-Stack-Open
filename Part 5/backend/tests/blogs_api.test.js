const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')

let token = null

const initialBLogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  }
]

beforeEach( async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash= await bcrypt.hash('password', 10)
  const user = new User({
    username: 'root',
    passwordHash
  })
  const savedUser = await user.save()

  const loginRes = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'password'
    })

  
  token = loginRes.body.token


  const blogObjects = initialBLogs.map(blog => new Blog({...blog, user: savedUser._id}))
  await Blog.insertMany(blogObjects)

})

test('blogs are returned as json and correct amount',async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length,initialBLogs.length)
})

test('blog posts have id property instead of id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

test('a valid blog can be added via POST', async () => {
  const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})

    assert.strictEqual(blogsAtEnd.length, initialBLogs.length + 1)
})

test('If there is no likes, It is defaulted to 0', async () => {
  const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('a blog without a title is not added',async () => {
  const newBlog = {
      id: "5a422ba71b54a676234d17fb",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      v: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, initialBLogs.length)
})

test('blog creation fails with 401 if token is not provided', async () => {
  const newBlog = {
    title: "Unauthorized Blog",
    url: 'http://unauthorized.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('blog creation fails with 401 if token is invalid', async () => {
  const newBlog = {
    title: "This has an invalid token",
    author: "Mwizi",
    url: "http://kukuibia.com",
    likes: 10
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer invalidity')
    .send(newBlog)
    .expect(401)
})

test('a blog can be deleted by the creator', async () => {
  const newBlog = {
    title: 'Delete Me',
    author: 'Author',
    url: 'http://delete.com'
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)

    const blogToDelete = response.body

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length,initialBLogs.length)
})

test('Deleting a blog fails with 401 if a different user tries to delete it', async () => {
  const blogResponse = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({ title: 'Private Blog', url: 'http://private.com'})

    const blogId = blogResponse.body.id


      await api
        .post('/api/users')
        .send({username: 'thief', password: 'password123'})

      const loginRes = await api
        .post('/api/login')
        .send({ username: 'thief',password:'password123' })

      const secondToken = loginRes.body.token

      await api
        .delete(`/api/blogs/${blogId}`)
        .set('Authorization', `Bearer ${secondToken}`)
        .expect(401)
})

test('Deleting a single blog post resource' ,async () => {
    const blogsBeforeDelete = await Blog.find({})

    const blogToDelete = blogsBeforeDelete[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, blogsBeforeDelete.length - 1)
})

test('a blog can be updated with PUT', async () => {

  const blogsAtStart = await Blog.find({})
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes + 10
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, updatedBlog.likes)

  const blogsAtEnd = await Blog.find({})
  
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

  const updatedFromDb = blogsAtEnd.find(b => b.id.toString() === blogToUpdate.id.toString())
  assert.strictEqual(updatedFromDb.likes, updatedBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})