const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/',async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name : 1, id : 1 })
  response.json(blogs)
})

blogsRouter.post('/',async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  
  const user = await User.findById(decodedToken.id)

  if(!user){
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  if(!body.title || !body.url) {
    return response.status(400).json({
      error: 'title and url are missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request,response,next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error){
    next(error)
  }
})

blogsRouter.put('/:id', async (request,response,next) => {
  const {title, author, url, likes } = request.body

  const updatedBlog = {
    title,
    author,
    url,
    likes
  }

  try {
    const result =await Blog.findByIdAndUpdate(
      request.params.id,
      updatedBlog,
      {new: true, runValidators: true}
    )
    if(!result){
      return response.status(404).end()
    }

    response.json(result)
  } catch(error){
      next(error)
    }
  
  
})

module.exports = blogsRouter