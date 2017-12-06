const User = require('../models/userModel')

module.exports = {
  isRegistered: (req, res, next) => {
    User.find({
      email: req.body.email,
      is_verified: true
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
}
