const User = require('../models/userModel')

module.exports = {
  sendMessage: (req, res) => {
    res.send({ message: 'Ojek API works' })
  },
  register: (req, res) => {
    req.body.is_validated = false
    User.create(req.body)
    .then(data => {
      res.send({
        message: 'success',
        data: data
      })
    })
    .catch(err => res.send(err))
  }
}
