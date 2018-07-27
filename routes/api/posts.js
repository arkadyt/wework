const express = require('express');
const router = express.Router();

// Can setup middleware like this:
// router.use(functions);

// @route   GET api/posts/test
// @desc    Tests posts route.
// @access  Public
router.get('/test', (req, res) => {
    res.send('OK');
});

module.exports = router;