const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
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
    req.body.is_verified = false

    User.create(req.body)
    .then(data => {
      const data_register = {
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
        html: `<p>Click <a href="http://35.198.217.74/verify?encoded=${data_register_encoded}">here</a> to verify your account.</p>`
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
      email: data_register.email
    }, {
      is_verified: true
    })
    .then(() => {
      res.send('email verification success.')
    })
    .catch(err => res.send(err))
  }
}
