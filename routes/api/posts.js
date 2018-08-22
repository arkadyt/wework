const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const Post = require('../../models/Post')

// Can setup middleware like this:
// router.use(functions);

// @route   GET api/posts/test
// @desc    Tests posts route.
// @access  Public
router.get('/test', (req, res) => res.send('OK'))


// @route   POST api/posts
// @desc    Create a new post
// @access  Protected
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    require('../../validation/posts')({ ...req.body, user: req.user.id })
        .then(post => {
            new Post({ ...post }).save()
                .then(post => res.json(post))
                .catch(err => res.status(400).json(err))
        })
        .catch(errors => res.status(400).json(errors))
})


module.exports = router;