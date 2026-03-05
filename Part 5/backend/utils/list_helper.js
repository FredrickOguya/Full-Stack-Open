const blog = require("../models/blog");

const dummy = () => {
  return 1
}

const totalLikes = (array) => {
  const posts = array;

  const total = posts.reduce((accumulator, currentPost) => {
    return accumulator + currentPost.likes
  }, 0)

  return total
}

const favoriteBlog = (blogs) => {
  
  if(blogs.length === 0)
    return 0
  const favorite = blogs.reduce((mostLikes, nextblog) => {
    return mostLikes.likes > nextblog.likes ? mostLikes : nextblog
  })

  return favorite

}

const mostBLogs = (blogs) => {
  if (blogs.length === 0){
    return 0
  } 
  else if(blogs.length === 1){
    return {
      author: `${blogs[0].author}`,
      blogs: 1
    }
  }

  const authorCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    
    return counts
  }, {})
  
  const topAuthor = Object.keys(authorCounts).reduce((a,b) => {
    return authorCounts[a] > authorCounts[b] ? a : b
  })

  return {
    author: topAuthor,
    blogs: authorCounts[topAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0){
    return 0
  } else if(blogs.length === 1){
    return {
      author: `${blogs[0].author}`,
      likes: blogs[0].likes
    }
  }
  const likesByAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {})

  const topAuthor = Object.keys(likesByAuthor).reduce((a,b) => {
    return likesByAuthor[a] > likesByAuthor[b] ? a : b
  })

  return {
    author: topAuthor,
    likes: likesByAuthor[topAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBLogs,
  mostLikes
}