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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}