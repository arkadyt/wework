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
        .populate('user', ['name', 'email'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user'
                res.status(404).json(errors)
            }

            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})


// @route   GET /api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'email'])
        .then(profile => profile ? res.json(profile)
            : res.status(404).json({ noprofile: "Profile does not exist" }))
        .catch(err => res.status(404).json(err))
})


// @route   GET /api/profile/user/:userId
// @desc    Get profile by userId
// @access  Public
router.get('/user/:userId', (req, res) => {
    Profile.findOne({ user: req.params.userId })
        .populate('user', ['name', 'email'])
        .then(profile => profile ? res.json(profile)
            : res.status(404).json({ noprofile: "Profile does not exist" }))
        .catch(err => res.status(404).json(err))
})


// @route   GET /api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
    Profile.find()
        .populate('user', ['name', 'email'])
        .then(profile => profile ? res.json(profile)
            : res.status(404).json({ noprofile: "There are no profiles" }))
        .catch(err => res.status(404).json(err))
})


// @route   POST /api/profile
// @desc    Create or Update user profile
// @access  Protected
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    require('../../validation/profile')({ ...req.body, user: req.user.id })
        .then(profile => {
            Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profile }, // form fields left empty must not be sent (unless they are undefined?)
                { new: true, upsert: true })
                .then(profile => res.json(profile))
                .catch(err => res.status(400).json(err))
        })
        .catch(errors => res.status(400).json(errors))
})


// @route   POST /api/profile/experience
// @desc    Post users experience to profile
// @access  Protected
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    require('../../validation/profile')(req.body, { onlyExperience: true })
        .then(experienceData => {
            console.log('AFTER VALIDATION:', experienceData)
            Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: { experience: experienceData } },
                { new: true })
                .then(savedData => res.json(savedData))
                .catch(err => res.status(404).json(err))
        })
        .catch(err => res.json(err))
})

// @route   POST api/profile/education
// @desc    Post users education to profile
// @access  Protected
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    require('../../validation/profile')(req.body, { onlyEducation: true })
        .then(educationData => {
            Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: { education: educationData } },
                { new: true })
                .then(savedData => res.json(savedData))
                .catch(err => res.status(400).json(err))
        })
})


// @route   DELETE api/profile/experience/:expId
// @desc    Delete experience entry(ies) on profile
// @access  Protected
router.delete('/experience/:expId', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndUpdate(
        { user: req.user.id },
        { $pull: { experience: { _id: req.params.expId } } },
        { new: true })
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json(err))
})


// @route   DELETE api/profile/education/:edId
// @desc    Delete education entry(ies) on profile
// @access  Protected
router.delete('/education/:edId', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndUpdate(
        { user: req.user.id },
        { $pull: { education: { _id: req.params.edId } } },
        { new: true })
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json(err))
})


module.exports = router;