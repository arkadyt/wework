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
const db = require('./config/keys').mongoURI
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to database.'))
    .catch((err) => console.log('Could not connect to database.\n' + err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Application listening on port: ' + PORT))
