const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route   GET api/profile/test
// @desc    Tests profile route.
// @access  Public
router.get('/test', (req, res) => {
    res.json({ message: 'OK' })
})


// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {}

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user'
                res.status(404).json({ errors })
            }

            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

// @route   POST /api/profile
// @desc    Create or Update user profile
// @access  Protected
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    require('../../validation/profile')({ ...req.body, user: req.user.id })
        .then(profile => {
            Profile.findOneAndUpdate(
                { user: req.body.id },
                { $set: profile }, // form fields left empty must not be sent
                { new: true, upsert: true })
                .then(profile => res.json(profile))
                .catch(err => res.status(400).json(err))
        })
        .catch(errors => res.status(400).json(errors))
})


module.exports = router;