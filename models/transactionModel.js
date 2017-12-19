const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  pickup_time: {
    type: Date
  },
  arrival_time: {
    type: Date
  },
  pickup_address: {
    type: String,
    required: true
  },
  destination_address: {
    type: String,
    required: true
  },
  pickup_coordinate: {
    type: String,
    required: true
  },
  destination_coordinate: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  price: {
    type: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  transaction_status: {
    type: String,
    required: true
  },
  cancel_time: {
    type: Date
  },
  cancel_by: {
    type: String
  },
  cancel_description: {
    type: String
  }
},
{
  timestamps: true
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
