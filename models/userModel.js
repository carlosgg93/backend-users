const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true
  },
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  passwordHash: {
    type: String,
    minlength: 3,
    required: true
  },
  email: {
    type: String,
    minlength: 3,
    required: true
  },
  phone: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
