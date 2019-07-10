const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]
const emptyBlogsList = []
const singleBlogList = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  }
]
const singleBlog = {
  _id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  __v: 0
}

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of an empty object list is 0', () => {
    const result = listHelper.totalLikes(emptyBlogsList)
    expect(result).toBe(0)
  })
  test('when list has only one blog to be the same as the blog likes', () => {
    const result = listHelper.totalLikes(singleBlogList)
    expect(result).toBe(7)
  })
  test('of a bigger list should be calculated correctly', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('from an empty blog list should return an error object', () => {
    const result = listHelper.favoriteBlog(emptyBlogsList)
    expect(result).toEqual({ error: 'blog list is empty, try adding one' })
  })
  test('from a single blog list should be the blog itself', () => {
    const result = listHelper.favoriteBlog(singleBlogList)
    expect(result).toEqual(singleBlog)
  })
  test('from a list of many blogs should be the one with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    const correctBlog = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    }
    listHelper.mostBlogs(blogs)
    expect(result).toEqual(correctBlog)
  })
})

describe('author with most blogs written', () => {
  test('from an empty blog list should be an error object', () => {
    const result = listHelper.mostBlogs(emptyBlogsList)
    expect(result).toEqual({ error: 'blog list is empty, try adding one' })
  })
  test('from a single blog list should be the author with one blog', () => {
    const correctResult = {
      author: 'Michael Chan',
      blogs: 1
    }
    const result = listHelper.mostBlogs(singleBlogList)
    expect(result).toEqual(correctResult)
  })
  test('from a list with many blogs should be the correct one', () => {
    const result = listHelper.mostBlogs(blogs)
    const correctResult = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(result).toEqual(correctResult)
  })
})

describe('most liked blog', () => {
  test('from an empty blog list should be an error object', () => {
    const result = listHelper.mostLikes(emptyBlogsList)
    expect(result).toEqual({ error: 'blog list is empty, try adding one' })
  })
  test('from a single blog list should be the blog itself', () => {
    const correctResult = {
      author: 'Michael Chan',
      likes: 7
    }
    const result = listHelper.mostLikes(singleBlogList)
    expect(result).toEqual(correctResult)
  })
  test('from a list with many blogs should be the correct one', () => {
    const correctResult = {
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(correctResult)
  })
})
