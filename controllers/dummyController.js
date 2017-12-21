const User = require('../models/userModel')
const Driver = require('../models/driverModel')
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
    email_verified: true,
    phone_verified: true,
    username: 'irianto223',
    password: 'anak223'
  },
  {
    first_name: 'Tri',
    last_name: 'Irianto',
    birth_date: '1992-12-12',
    email: 'triirianto@gmail.com',
    phone: '085354790099',
    email_verified: true,
    phone_verified: true,
    username: 'tri',
    password: 'tri123'
  }
]

const dummy_drivers = [
  {
    first_name: 'Jack',
    last_name: 'Sparrow',
    birth_date: '1990-12-31',
    phone: '085354790099',
    email: 'jacksparrow@mail.com',
    username: 'jack',
    password: 'jack',
    no_sim: '001122',
    no_stnk: '112233',
    no_polisi: 'PA0001RA',
    email_verified: true,
    phone_verified: true,
    sim_verified: true,
    stnk_verified: true,
    credit: 100000
  },
  {
    first_name: 'Jason',
    last_name: 'Momoa',
    birth_date: '1980-01-01',
    phone: '085354790088',
    email: 'jmomoa@mail.com',
    username: 'jason',
    password: 'jason',
    no_sim: '001133',
    no_stnk: '112244',
    no_polisi: 'PA0002RA',
    email_verified: true,
    phone_verified: true,
    sim_verified: true,
    stnk_verified: true,
    credit: 100000
  }
]

module.exports = {
  bulkRegister: (req, res) => {
    var result = []
    dummy_users.map(user => {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(user.password, salt)

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
  },
  bulkRegisterDriver: (req, res) => {
    var result = []
    dummy_drivers.map(driver => {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(driver.password, salt)

      driver.password = hash

      Driver.create(driver)
      .then(dataDriver => {
        result.push(dataDriver)
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
  getAllDriver: (req, res) => {
    Driver.find()
    .then(dataDrivers => res.send(dataDrivers))
    .catch(err => res.send(err))
  },
  bulkDeleteDriver: (req, res) => {
    Driver.remove({})
    .then(result => res.send(result))
    .catch(err => res.send(err))
  }
}
