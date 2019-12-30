const env = require('dotenv').config()
const express = require('express')
const cors = require('./config/cors.policy.js')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')
const postsRouter = require('./routes/api/posts')
const usersRouter = require('./routes/api/users')
const profileRouter = require('./routes/api/profile')
const infoRouter = require('./routes/api/info')

app.use(cors)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)
app.use('/api/profile', profileRouter)
app.use('/api/info', infoRouter)

const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI
const db = mongoose.connection
db.on('connecting', () => console.log('Connecting to database...'))
db.on('open', () => console.log('Connected to database.'))
db.on('error', err => {
  console.log('Error in database connection:\n\t' + err)
  mongoose.disconnect()
  console.log('Attempting to reconnect in 5 seconds...')
})
db.on('disconnected', () => {
  new Promise(resolve => setTimeout(resolve, 5000)).then(() => {
    mongoose.connect(mongoURI, { useNewUrlParser: true })
  })
})
mongoose.connect(mongoURI, { useNewUrlParser: true })

const PORT = 5000
app.listen(PORT, () => console.log('Application listening on port: ' + PORT))
