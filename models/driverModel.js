const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String
  },
  birth_date: {
    type: Date
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  is_verified: {
    type: Boolean,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  no_sim: {
    type: String
  },
  no_stnk: {
    type: String
  },
  no_kendaraan: {
    type: String
  }
},
{
  timestamps: true
})

const Driver = mongoose.model('Driver', driverSchema)

module.exports = Driver
