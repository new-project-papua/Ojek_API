const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const sgMail = require('@sendgrid/mail')
const jwt = require('jsonwebtoken')

module.exports = {
  sendMessage: (req, res) => {
    res.send({ message: 'API works' })
  },
  register: (req, res) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password)

    req.body.password = hash
    req.body.email_verified = false
    req.body.phone_verified = false

    User.create(req.body)
    .then(data => {
      const data_register = {
        _id: data._id,
        first_name: data.first_name,
        last_name: data.last_name,
        birth_date: data.birth_date,
        email: data.email,
        phone: data.phone,
        username: data.username
      }
      const data_register_encoded = jwt.sign(data_register, process.env.JWT_SECRET)

      sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      const msg = {
        to: data.email,
        from: 'no-reply@ojekpancasila.com',
        subject: 'Email Verification',
        text: 'Please click link below to verify your account.',
        html: `<p>Click <a href="${process.env.API_HOST}/verify?encoded=${data_register_encoded}">here</a> to verify your account.</p>`
      }
      sgMail.send(msg)

      res.send({
        message: 'success',
        data: data
      })
    })
    .catch(err => res.send(err))
  },
  emailVerification: (req, res) => {
    const data_register = jwt.verify(req.query.encoded, process.env.JWT_SECRET)

    User.update({
      _id: data_register._id
    }, {
      email_verified: true
    })
    .then(() => {
      res.send('email verification success. Thankyou :)')
    })
    .catch(err => res.send(err))
  },
  login: (req, res) => {
    User.findOne({
      username: req.body.username,
      email_verified: true
    })
    .then(user => {
      if (user == null) {
        res.send({
          message: 'username not found'
        })
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            birth_date: user.birth_date,
            email: user.email,
            phone: user.phone,
            email_verified: user.email_verified,
            phone_verified: user.phone_verified,
            username: user.username
          }, process.env.JWT_SECRET)
          res.send({
            message: 'login success',
            token: token
          })
        } else {
          res.send({
            message: 'password incorrect'
          })
        }
      }
    })
    .catch(err => res.send(err))
  },
  all: (req, res) => {
    User.find()
    .then(users => {
      res.send({
        message: 'data found',
        data: users
      })
    })
    .catch(err => res.send(err))
  },
  byId: (req, res) => {
    User.findOne({
      _id: req.params._id
    })
    .then(user => {
      res.send({
        message: 'data found',
        data: user
      })
    })
    .catch(err => res.send(err))
  },
  removeById: (req, res) => {
    User.remove({
      _id: req.params._id
    })
    .then(result => res.send(result))
    .catch(err => res.send(err))
  },
  updateById: (req, res) => {
    User.update({
      _id: req.params._id
    }, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birth_date: req.body.birth_date,
      phone: req.body.phone
    })
    .then(result => res.send(result))
    .catch(err => res.send(err))
  }
}
