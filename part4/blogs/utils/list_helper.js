const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (accumulator, currentValue) =>
    accumulator + currentValue.likes
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  let blogToReturn = { likes: 0 }
  if (blogs.length === 0) {
    return {
      error: 'blog list is empty, try adding one'
    }
  } else {
    blogs.map(blog => {
      if (blog.likes >= blogToReturn.likes) {
        blogToReturn = blog
      }
    })
  }
  return blogToReturn
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
