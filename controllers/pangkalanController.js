const Pangkalan = require('../models/pangkalanModel')

module.exports = {
  all: (req, res) => {
    Pangkalan.find()
    .then(result => res.send(result))
    .catch(err => res.send(err))
  },
  byId: (req, res) => {
    Pangkalan.findOne({
      _id: req.params._id
    })
    .then(result => res.send(result))
    .catch(err => res.send(err))
  },
  create: (req, res) => {
    const coordinate = {
      latitude: parseFloat(req.body.latitude),
      longitude: parseFloat(req.body.longitude)
    }

    Pangkalan.create({
      name: req.body.name,
      coordinate: JSON.stringify(coordinate)
    })
    .then(result => res.send(result))
    .catch(err => res.send(err))
  },
  delete: (req, res) => {
    Pangkalan.remove({
      _id: req.params._id
    })
    .then(result => res.send(result))
    .catch(err => res.send(err))
  },
  getObjCoords: (req, res) => {
    Pangkalan.findOne({
      _id: req.params._id
    })
    .then(result => res.send(JSON.parse(result.coordinate)))
    .catch(err => res.send(err))
  },
  update: (req, res) => {
    const coordinate = {
      latitude: parseFloat(req.body.latitude),
      longitude: parseFloat(req.body.longitude)
    }

    Pangkalan.update({
      _id: req.params._id
    }, {
      name: req.body.name,
      coordinate: JSON.stringify(coordinate)
    })
    .then(result => res.send(result))
    .catch(err => res.send(err))
  }
}
