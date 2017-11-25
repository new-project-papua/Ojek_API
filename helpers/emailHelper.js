const User = require('../models/userModel')

const isRegistered = (req, res, next) => {
  User.find({
    email: req.body.email,
    is_validated: true
  })
  .then(result => {
    if (result.length == 0) {
      next()
    } else {
      res.send({
        message: 'email is already registered'
      })
    }
  })
  .catch(err => res.send(err))
}

module.exports = {
  isRegistered
}
