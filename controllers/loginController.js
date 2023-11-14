const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (req, res) => {
  const { body } = req
  const { userName, password } = body

  const user = await User.findOne({ username: userName })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  jwt.sign({ userName, id: user._id }, process.env.SECRET, (err, token) => {
    if (err) {
      return res.status(500).json({
        error: 'error signing token'
      })
    }
    return res.status(200).json({
      token,
      username: user.username,
      name: user.name,
      email: user.email,
      id: user._id
    })
  })
})

module.exports = loginRouter
