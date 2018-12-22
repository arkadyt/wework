const cors = require('cors')

var whitelist = ['https://socnet.arkadyt.com', 'http://socnet.arkadyt.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

module.exports = cors(corsOptions)
