const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
  {
    username: 'root',
    name: 'John Doe',
    password: 'foobar'
  }
]

describe('when there is only one user in db', () => {
  //Before each test, db users data will be deleted
  beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
  })

  test('user creation is successful', async () => {
    const newUser = {
      username: 'ijones',
      name: 'Indiana Jones',
      password: 'test1234'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(initialUsers.length + 1)
  })

  test('user creation with an invalid username should not be successful', async () => {
    const newUser = {
      username: 'ij',
      name: 'Indiana Jones',
      password: 'test1234'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('user creation with a property missing should not be successful', async () => {
    const newUser = {
      name: 'Indiana Jones',
      password: 'test1234'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('user creation when password is smaller than 3 chars should not be successful', async () => {
    const newUser = {
      username: 'ijones',
      name: 'Indiana Jones',
      password: '12'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('another user with the same username cannot be created', async () => {
    const newUser = {
      username: 'root',
      name: 'Doe John',
      password: 'barfoo'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

afterAll(async () => {
  mongoose.connection.close()
})
