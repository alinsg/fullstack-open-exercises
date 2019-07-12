const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Test blog number one',
    author: 'Geralt of Rivia',
    url: 'http://loremipsum.com',
    likes: 1337
  },
  {
    title: 'Test blog number two',
    author: 'Yennefer',
    url: 'http://loremipsum.com',
    likes: 1337
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length)
})

test('blogs should have an id property not _id', async () => {
  await api
    .get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs/')
  const objectToTest = response.body[0]
  expect(objectToTest.id).toBeDefined()
})

test('a blog should be added correctly', async () => {
  const newBlog = {
    title: 'Test blog number three',
    author: 'Zirael',
    url: 'http://loremipsum.com',
    likes: 1337
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length + 1)
})

test('adding a blog without likes property should add the blog with 0 likes', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Zirael',
    url: 'http://loremipsum.com'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const addedObject = response.body.filter(
    blog => blog.title === newBlog.title
  )[0]
  expect(addedObject.likes).toBeDefined()
  expect(addedObject.likes).toBe(0)
})

test('adding a blog without title and url should not work', async () => {
  const newBlog = {
    author: 'Una',
    likes: 3
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(async () => {
  await Blog.deleteMany({})
  mongoose.connection.close()
})
