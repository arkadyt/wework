const cors = require('cors')

let whitelist

if (process.env.NODE_ENV === 'development') {
  whitelist = ['http://localhost:3000']
} else {
  whitelist = ['https://wework.arkadyt.com']
}

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

module.exports = cors(corsOptions)
