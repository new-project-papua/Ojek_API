const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String
  },
  birth_date: {
    type: Date
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  is_verified: {
    type: Boolean,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
