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


// @route   GET api/posts/
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .populate('user', ['name', 'avatar'])
        .populate('comments.user', ['name', 'avatar'])
        .then(data => res.json(data))
        .catch(err => res.status(400).json(err))
})


// @route   GET api/posts/:postId
// @desc    Get post by id
// @access  Public
router.get('/:postId', (req, res) => {
    Post.findById(req.params.postId)
        .populate('user', ['name', 'avatar'])
        .populate('comments.user', ['name', 'avatar'])
        .then(post => res.json(post))
        .catch(err => res.status(400).json(err))
})


// @route   POST api/posts
// @desc    Create a new post
// @access  Protected
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    require('../../validation/posts')({ ...req.body, user: req.user.id })
        .then(post => {
            new Post(post).save()
                .then(post => {
                    Post.findById(post._id)
                        .populate('user', ['name', 'avatar'])
                        .populate('comments.user', ['name', 'avatar'])
                        .then(post => res.json(post))
                        .catch(err => res.status(400).json(err))
                })
                .catch(err => res.status(400).json(err))
        })
        .catch(errors => res.status(400).json(errors))
})


// @route   DELETE api/posts/:postId
// @desc    Delete post by id
// @access  Protected
router.delete('/:postId', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findOneAndRemove({ user: req.user.id, _id: req.params.postId })
        .then(post =>
            post
                ? res.json(post)
                : res.json({ error: "Post was not found or ownership was not proven" }))
        .catch(err => res.status(400).json(err))
})


// @route   POST api/posts/:postId/like
// @desc    Leave a like on a post
// @access  Protected
router.post('/:postId/like', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findOneAndUpdate(
        { _id: req.params.postId, 'likes.user': { $ne: req.user.id } },
        { $push: { likes: { user: mongoose.Types.ObjectId(req.user.id) } } },
        { new: true })
        .populate('user', ['name', 'avatar'])
        .populate('comments.user', ['name', 'avatar'])
        .then(post => post
            ? res.json(post)
            : res.status(400).json({
                error: "Post was not found or was already liked by the user"
            }))
        .catch(err => res.status(400).json(err))
})


// @route   DELETE api/posts/:postId/like/
// @desc    Remove the like from a post
// @access  Protected
router.delete('/:postId/like', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findOneAndUpdate(
        { _id: req.params.postId, 'likes.user': req.user.id },
        { $pull: { likes: { user: mongoose.Types.ObjectId(req.user.id) } } },
        { new: true })
        .populate('user', ['name', 'avatar'])
        .populate('comments.user', ['name', 'avatar'])
        .then(post => post
            ? res.json(post)
            : res.status(400).json({
                error: "Post was not found or wasn't liked by the user"
            }))
        .catch(err => res.status(400).json(err))
})


// @route   POST api/posts/:postId/comment
// @desc    Add a comment to the post
// @access  Protected
router.post('/:postId/comment', passport.authenticate('jwt', { session: false }), (req, res) => {
    require('../../validation/posts')({ ...req.body, user: req.user.id }, { onlyComment: true })
        .then(comment => {
            Post.findOneAndUpdate(
                { _id: req.params.postId },
                { $push: { comments: comment } },
                { new: true })
                .populate('user', ['name', 'avatar'])
                .populate('comments.user', ['name', 'avatar'])
                .then(post => res.json(post))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err))
})


// @route   DELETE api/posts/:postId/comment/:commentId
// @desc    Remove a coment from the post
// @access  Protected
router.delete('/:postId/comment/:commentId', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findOneAndUpdate(
        { _id: req.params.postId, comments: { $elemMatch: { _id: req.params.commentId, user: req.user.id } } },
        { $pull: { comments: { _id: req.params.commentId, user: req.user.id } } },
        { new: true })
        .populate('user', ['name', 'avatar'])
        .populate('comments.user', ['name', 'avatar'])
        .then(post => {
            post
                ? res.json(post)
                : res.json({ error: "Comment was not found or ownership was not proven" })
        })
        .catch(err => res.status(400).json(err))
})


module.exports = router;