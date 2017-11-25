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
  is_validated: {
    type: Boolean,
    required: true
  }
},
{
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
