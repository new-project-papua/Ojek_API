const axios = require('axios')
const Transaction = require('../models/transactionModel')

module.exports = {
  all: (req, res) => {
    Transaction.find()
    .then(result => res.send(result))
    .catch(err => res.send(err))
  },
  create: (req, res) => {
    var distance = 0
    axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=-2.557137,140.704436&destinations=-2.557847,140.709090&mode=car&key=${process.env.GOOGLE_API_KEY}`
    })
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }
}
