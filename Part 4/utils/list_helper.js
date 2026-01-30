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

module.exports = {
  dummy,
  totalLikes
}