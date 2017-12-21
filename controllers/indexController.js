const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  sendMessage: (req, res) => {
    res.send({ message: 'API works' })
  }
}
