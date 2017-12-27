const axios = require('axios')
const Transaction = require('../models/transactionModel')
const jwt = require('jsonwebtoken')

module.exports = {
  all: (req, res) => {
    Transaction.find()
    .then(result => res.send(result))
    .catch(err => res.send(err))
  },
  create: (req, res) => {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
    req.body.user = decoded._id
    req.body.transaction_status = 'finding driver'
    const pickup_coordinate = JSON.parse(req.body.pickup_coordinate)
    const destination_coordinate = JSON.parse(req.body.destination_coordinate)

    axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${pickup_coordinate.latitude},${pickup_coordinate.longitude}&destinations=${destination_coordinate.latitude},${destination_coordinate.longitude}&mode=car&key=${process.env.GOOGLE_API_KEY}`
    })
    .then(response => {
      req.body.distance = response.data.rows[0].elements[0].distance.value
      req.body.duration = response.data.rows[0].elements[0].duration.value

      res.send(req.body)
    })
    .catch(err => res.send(err))
  }
}
