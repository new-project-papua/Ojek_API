const mongoose = require('mongoose')

const pangkalanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  coordinate: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Pangkalan = mongoose.model('Pangkalan', pangkalanSchema)

module.exports = Pangkalan
