const User = require('../models/userModel')

module.exports = {
  isLogin: (req, res, next) => {
    if (req.headers.token) {
      next()
    } else {
      res.send({
        message: 'unauthenticated'
      })
    }
  }
}
