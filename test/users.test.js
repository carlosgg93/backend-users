const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user.js')
const { app, server } = require('../index')
const bcrypt = require('bcrypt')

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

describe('Creating a user', () => {
  beforeEach(async () => {
    await User.remove({})

    const pwd = bcrypt.hashSync('sekret', 10)
    const user = new User({
      username: 'root',
      name: 'Superuser',
      password: pwd,
      email: 'c@c.com'
    })

    await user.save()
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

  test('works as expected creating a fresh username', async () => {
    const users = await User.find({})
    const usersAtStart = users.map((user) => {
      return user.toJSON()
    })

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
      email: 'c@c.con'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  afterAll(() => {
    mongoose.connection.close()
    server.close()
  })
})
