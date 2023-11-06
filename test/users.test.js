const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user.js')
const { app, server } = require('../index')

const api = supertest(app)

const initialUsers = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only Javascript',
    important: true
  }
]

beforeEach(async () => {
  await User.remove({})

  let userObject = new User(initialUsers[0])
  await userObject.save()

  userObject = new User(initialUsers[1])
  await userObject.save()
})

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two users', async () => {
  const response = await api.get('/api/users')
  expect(response.body.length).toBe(2)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
