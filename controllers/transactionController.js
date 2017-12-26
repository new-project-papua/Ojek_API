const Transaction = require('../models/transactionModel')

module.exports = {
  all: (req, res) => {
    Transaction.find()
    .then(result => res.send(result))
    .catch(err => res.send(err))
  }
}
