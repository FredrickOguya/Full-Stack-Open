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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBLogs
}