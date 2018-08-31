const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

// @route   GET api/users/test
// @desc    Tests users route.
// @access  Public
router.get('/test', (req, res) => {
    res.json({ response: 'OK' })
})

// @route   POST api/users/register
// @desc    Allows for new user registration
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = require('../../validation/register')(req.body)
    if (!isValid) { return res.status(400).json(errors) }

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json({ email: 'Email already exists' })
            } else {
                // console.log('CMD: grab gravatar')
                const avatar = gravatar.url(req.body.email, {
                    s: 200,
                    r: 'pg',
                    d: 'mm'
                })
                // console.log('GOT GRAVATAR')
                // console.log('CMD: create new user')
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                })
                // console.log('USER CREATED')
                // console.log('CMD: gen salt')
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err
                    // console.log('SALT GENERATED')
                    // console.log('CMD: hash password')
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err
                        // console.log('HASH GENERATED')
                        newUser.password = hash
                        // console.log('CMD: save user')
                        newUser
                            .save()
                            .then(user => {
                                const payload = {
                                    id: user.id,
                                    name: user.name,
                                    avatar: user.avatar
                                }
        
                                // Sign Token
                                jwt.sign(
                                    payload,
                                    keys.secretOrKey,
                                    { expiresIn: 3600 * 24 * 7 },
                                    (err, token) => {
                                        if (err) throw err
                                        res.json({
                                            success: true,
                                            token: 'Bearer ' + token
                                        })
                                    }
                                )
                            })
                            .catch(err => console.log(err))
                        // console.log('USER SAVED')
                    })
                })
            }
        })
})

// @route   GET api/users/login
// @desc    Login User / Return JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const { errors, isValid } = require('../../validation/login')(req.body)
    if (!isValid) res.status(400).json(errors)

    // Find user by email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) return res.status(404).json({ email: 'User not found' })
            
            // Check password
            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        res.status(400).json({ error: 'Incorrect username or password' })
                    } else {
                        // Create JWT Payload
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }

                        // Sign Token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 * 24 * 7 },
                            (err, token) => {
                                if (err) throw err
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            }
                        )
                    }
                })
        })
})

// @route   POST api/users/current
// @desc    Return current user
// @access  Public
router.get('/current',
    passport.authenticate('jwt', { session: false }), (req, res) => {
        res.json({ ...req.user._doc, password: 'null' })
    })

module.exports = router