const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const lastListElement = list => list[list.length - 1]

const totalLikes = blogs => {
  const reducer = (accumulator, currentValue) =>
    accumulator + currentValue.likes
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return { error: 'blog list is empty, try adding one' }
  } else {
    return lastListElement(
      _.sortBy(blogs, blog => {
        return blog.likes
      })
    )
  }
}

const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return { error: 'blog list is empty, try adding one' }
  }
  const uniqueBlogs = _.uniqBy(blogs, 'author').map(blog => {
    const object = {
      author: blog.author
    }
    object.blogs = 0
    return object
  })
  _.forEach(blogs, function(blog) {
    _.map(uniqueBlogs, function(o) {
      o.author === blog.author ? (o.blogs = o.blogs + 1) : o
    })
  })
  return lastListElement(
    _.sortBy(uniqueBlogs, blog => {
      return blog.blogs
    })
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
