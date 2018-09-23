const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')
const postsRouter = require('./routes/api/posts')
const usersRouter = require('./routes/api/users')
const profileRouter = require('./routes/api/profile')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())

require('./config/passport')(passport)

app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)
app.use('/api/profile', profileRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to database.'))
    .catch((err) => console.log('Could not connect to database.\n' + err))



const port = process.env.port || 5000
app.listen(port, () => console.log('Application listening on port: ' + port))