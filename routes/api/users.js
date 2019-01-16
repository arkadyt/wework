const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const Post = require('../../models/Post')
const gravatar = require('gravatar')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const mongoose = require('mongoose')

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
                        res.status(400).json({ password: 'Incorrect password' })
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

// @route   GET api/users/current
// @desc    Return current user
// @access  Protected
router.get('/current',
    passport.authenticate('jwt', { session: false }), (req, res) => {
        res.json({ ...req.user._doc, password: 'null' })
    })


// @route   GET api/users/:userId/following
// @desc    Get user's subscription list
// @access  Public
router.get('/:userId/following', (req, res) => {
    User.findOne({ _id: req.params.userId })
        .then(user =>
            user
                ? res.json(user.following)
                : res.status(400).json({
                    error: "User not found"
                }))
})


// @route   GET api/users/:userId/followers
// @desc    Get user's subscription list
// @access  Public
router.get('/:userId/followers', (req, res) => {
    User.findOne({ _id: req.params.userId })
        .then(user =>
            user
                ? res.json(user.followers)
                : res.status(400).json({
                    error: "User not found"
                }))
})


// @route   POST api/users/:userId/follow
// @desc    Follow a user by :userId
// @access  Protected
router.post('/:userId/follow',
    passport.authenticate('jwt', { session: false }), (req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.userId, 'followers.user': { $ne: req.user.id } },
            { $push: { followers: { user: mongoose.Types.ObjectId(req.user.id) } } },
            { new: true })
            .then(user =>
                user
                    ? User.findOneAndUpdate(
                        { _id: req.user.id, 'following.user': { $ne: req.params.userId } },
                        { $push: { following: { user: mongoose.Types.ObjectId(req.params.userId) } } },
                        { new: true })
                        .then(user =>
                            user
                                ? res.json(user.following)
                                : res.status(400).json({ error: "Already following or user does not exist" }))
                        .catch(err => res.status(400).json(err))
                    : res.status(400).json({
                        error: "Already following or user does not exist"
                    }))
            .catch(err => res.status(400).json(err))
    })


// @route   DELETE api/users/:userId/follow
// @desc    Unfollow a user by id
// @access  Protected
router.delete('/:userId/follow',
    passport.authenticate('jwt', { session: false }), (req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.userId, 'followers.user': req.user.id },
            { $pull: { followers: { user: mongoose.Types.ObjectId(req.user.id) } } },
            { new: true })
            .then(user =>
                user
                    ? User.findOneAndUpdate(
                        { _id: req.user.id, 'following.user': req.params.userId },
                        { $pull: { following: { user: mongoose.Types.ObjectId(req.params.userId) } } },
                        { new: true })
                        .then(user =>
                            user
                                ? res.json(user.following)
                                : res.status(400).json({
                                    error: "Not following or user does not exist"
                                }))
                        .catch(err => res.status(400).json(err))
                    : res.status(400).json({
                        error: "Not following or user does not exist"
                    }))
            .catch(err => res.status(400).json(err))
    })


// @route   /api/users/sample
// @desc    Get a sample of {n} users
// @access  Protected
router.get('/sample/:count', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find({ _id: req.user.id }, function (err, data) {
        if (err) return res.status(400).json(err)

        let subscriptions = data[0].following
        let flattenedSubs = []
        for (let i of subscriptions)
            flattenedSubs.push(i.user)

        // Now, what aggregation stages to use to match only followed Users?

        // $match with added field and dot-notation travel does not work...
        // Tried:
        // { $addFields: { requestMastersSubs: subscriptions }, },
        // { $match: { _id: "$requestMastersSubs.user" } },
        // { $match: { 'requestMastersSubs.user': '$_id' } },

        // Maybe some query operators can help?

        // $elemMatch
        // Returns when at least one element in some array of the input document
        // matches the specified object. You should use it only when you have
        // multiple fields to match.
        // Plus you can't use it in the aggregation adequately: 
        // { $match: { requestMastersSubs: { $elemMatch: { 'user': '$_id' } } } }

        // $filter
        // Not used directly in the aggregation.
        // ??? did not take the investigation far.

        // $in
        // YES!!!!

        User.aggregate([
            // match unfollowed users only:
            { $match: { _id: { $nin: flattenedSubs } } },
            // exclude self:
            { $match: { _id: { $ne: mongoose.Types.ObjectId(req.user.id) } } },
            // copy profile object for the user:
            {
                $lookup: {
                    from: 'profiles',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'personsProfile'
                }
            },
            // try to add fields. If profile doesn't exist, 
            // [] will be returned:
            {
                $addFields: {
                    title: "$personsProfile.title",
                    company: "$personsProfile.company",
                    followers: { $size: "$followers" }
                }
            },
            // $unwind does not pass forward a document if the field
            // is an empty array or null. Acts like a $match here:
            { $unwind: "$title" },
            // but does if preserveNullAndEmptyArrays flag is set to true 
            {
                $unwind: {
                    path: '$company',
                    preserveNullAndEmptyArrays: true
                }
            },
            // Finally out of those who are followed and who have profile
            // sample {req.params.count} number of objects:
            { $sample: { size: parseInt(req.params.count) } },
            // throw out all the redundant:
            {
                $project: {
                    name: true,
                    avatar: true,
                    title: true,
                    company: true,
                    followers: true
                }
            }
        ], function (err, data) {
            if (err) return res.status(400).json(err)

            return res.json(data)
        })
    })
})


// @route   /api/users/mystats
// @desc    Get total posts, likes & comments on own posts,
//          followers and subscriptions count for current user
// @access  Protected
router.get('/myStats', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find({ _id: req.user.id }, function (err, data) {
        if (err) return res.status(400).json(err)

        const user = data[0]
        const followers = user.followers.length || 0
        const following = user.following.length || 0

        Post.find({ user: req.user.id }, function (err, posts) {
            if (err) return res.status(400).json(err)

            const postCount = posts.length
            let totalLikes = 0, totalComments = 0

            for (let i of posts) {
                totalLikes += i.likes.length
                totalComments += i.comments.length
            }

            res.json({
                followers,
                following,
                postCount,
                totalLikes,
                totalComments
            })
        })
    })
})


module.exports = router
