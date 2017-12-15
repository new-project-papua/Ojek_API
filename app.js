const app = require('express')()
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(`${process.env.DB_HOST}/${process.env.DB_NAME}`, { useMongoClient: true })

const index = require('./routes/index')
const user = require('./routes/userRoutes')
const dummy = require('./routes/dummyRoutes')

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/users', user)
app.use('/dummy', dummy)

module.exports = app
