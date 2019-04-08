const mongoose = require('mongoose')

const User = mongoose.model('users', {
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    default: null
  }
})

module.exports = User
