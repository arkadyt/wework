const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.port || 5000;
const db = require('./config/keys').mongoURI;

const postsRouter = require('./routes/api/posts');
const usersRouter = require('./routes/api/users');
const profileRouter = require('./routes/api/profile');

// API
app.get('/', (req, res) => {
    res.send('Hello from root!');
});
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);

// DB
mongoose
    .connect(db)
    .then(() => {
        console.log('Connected to database.');
        app.listen(port, () => console.log('Application listening on port: ' + port));
    })
    .catch((err) => console.log('Could not connect to database.\n' + err));