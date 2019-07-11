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

afterAll(async () => {
  await Blog.deleteMany({})
  mongoose.connection.close()
})
