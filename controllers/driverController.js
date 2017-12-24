const Driver = require('../models/driverModel')
const bcrypt = require('bcryptjs')
const sgMail = require('@sendgrid/mail')
const jwt = require('jsonwebtoken')

module.exports = {
  all: (req, res) => {
    Driver.find()
    .then(result => {
      res.send(result)
    })
  },
  byId: (req, res) => {
    Driver.findOne({
      _id: req.params._id
    })
    .then(driver => {
      res.send(driver)
    })
    .catch(err => res.send(err))
  },
  removeById: (req, res) => {
    Driver.remove({
      _id: req.params._id
    })
    .then(result => res.send(result))
    .catch(err => res.send(err))
  },
  updateById: (req, res) => {
    Driver.update({
      _id: req.params._id
    }, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birth_date: req.body.birth_date,
      email: req.body.email,
      phone: req.body.phone,
      no_sim: req.body.no_sim,
      no_stnk: req.body.no_stnk,
      no_polisi: req.body.no_polisi,
      sim_verified: req.body.sim_verified,
      stnk_verified: req.body.stnk_verified,
      pangkalan: req.body.pangkalan,
      pangkalan_verified: req.body.pangkalan_verified
    })
    .then(result => res.send(result))
    .catch(err => res.send(err))
  },
  register: (req, res) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    req.body.password = hash
    req.body.email_verified = false
    req.body.phone_verified = false
    req.body.sim_verified = false
    req.body.stnk_verified = false
    req.body.pangkalan_verified = false
    req.body.credit = 0

    Driver.create(req.body)
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

    Driver.update({
      _id: data_register._id
    }, {
      email_verified: true
    })
    .then(() => {
      res.send('email verification success. Thankyou :)')
    })
    .catch(err => res.send(err))
  },
  changePassword: (req, res) => {
    Driver.findOne({
      _id: req.params._id
    })
    .then(driver => {
      bcrypt.compare(req.body.old_password, driver.password)
      .then(response => {
        if (response == true) {
          const salt = bcrypt.genSaltSync(10)
          const hash = bcrypt.hashSync(req.body.new_password, salt)
          Driver.update({
            _id: driver._id
          }, {
            password: hash
          })
          .then(result => {
            res.send(result)
          })
          .catch(err => res.send(err))
        } else {
          res.send('old password incorrect')
        }
      })
    })
    .catch(err => res.send(err))
  },
  login: (req, res) => {
    Driver.findOne({
      username: req.body.username,
      email_verified: true
    })
    .then(driver => {
      if (driver == null) {
        res.send({
          message: 'username not found'
        })
      } else {
        if (bcrypt.compareSync(req.body.password, driver.password)) {
          const token = jwt.sign({
            _id: driver._id,
            first_name: driver.first_name,
            last_name: driver.last_name,
            birth_date: driver.birth_date,
            email: driver.email,
            phone: driver.phone,
            username: driver.drivername
          }, process.env.JWT_SECRET)

          const dataDriver = {
            _id: driver._id,
            first_name: driver.first_name,
            last_name: driver.last_name
          }

          res.send({
            message: 'login success',
            token: token,
            data: dataDriver
          })
        } else {
          res.send({
            message: 'password incorrect'
          })
        }
      }
    })
    .catch(err => res.send(err))
  }
}
