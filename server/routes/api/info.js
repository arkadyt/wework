const express = require('express')
const router = express.Router()

router.get('/env', (req, res) => {
  // Unacceptable for a real world app, of course.
  // It's all for testing, sir!
  let response
  if (process.env.NODE_ENV === 'production') {
    response = {
      NODE_ENV: process.env.NODE_ENV,
      MONGO_URI: !!process.env.MONGO_URI,
      SECRET_OR_KEY: !!process.env.SECRET_OR_KEY
    }
  } else {
    response = 'not in a production environment'
  }
  res.json(response)
})

module.exports = router
