const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const sgMail = require('@sendgrid/mail')
const jwt = require('jsonwebtoken')

const dummy_users = [
  {
    first_name: 'Anto',
    last_name: 'Kbarek',
    birth_date: '1992-12-12',
    email: 'irianto223@gmail.com',
    phone: '082199142474',
    is_verified: true,
    username: 'irianto223',
    password: 'anak223'
  },
  {
    first_name: 'Tri',
    last_name: 'Irianto',
    birth_date: '1992-12-12',
    email: 'triirianto@gmail.com',
    phone: '085354790099',
    is_verified: true,
    username: 'tri',
    password: 'tri123'
  }
]

module.exports = {
  bulkRegister: (req, res) => {
    var result = []
    dummy_users.map(user => {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(user.password)

      user.password = hash

      User.create(user)
      .then(dataUser => {
        result.push(dataUser)
        if (result.length >= 2) {
          res.send(result)
        }
      })
      .catch(err => {
        result.push(err)
        if (result.length >= 2) {
          res.send(result)
        }
      })
    })
  },
  getAll: (req, res) => {
    User.find()
    .then(dataUsers => res.send(dataUsers))
    .catch(err => res.send(err))
  },
  bulkDelete: (req, res) => {
    User.remove({})
    .then(result => res.send(result))
    .catch(err => res.send(err))
  }
}
