# Description [![Build Status](https://travis-ci.org/arkadyt/ww.net.svg?branch=master)](https://travis-ci.org/arkadyt/ww.net) [![Coverage Status](https://coveralls.io/repos/github/arkadyt/ww.net/badge.svg?branch=master)](https://coveralls.io/github/arkadyt/ww.net?branch=master)

This is a fullstack web application built in `JavaScript`, `React` and `NodeJS`; it uses `MongoDB` for data storage.

Application is deployed to `Heroku` servers and is available for viewing live at this [link](https://socnet.arkadyt.com).

# Run Locally
First set up a new local mongodb database through mongo shell:
```
use newdb
db.createUser({ user: "username", pwd: "password", roles: ["userAdmin"] })
```

Next modify mongoURI in config/keys.dev.js:
```
...
  mongoURI: 'mongodb://username:password@localhost:27017/newdb',
...
```

Finally clone the repository, install dependencies, build and run:
```
git clone https://github.com/arkadyt/ww.net.git
cd ww.net
npm install && npm run server

# replace konsole w/ your terminal
konsole & disown
cd ww.net/client
npm install && npm start
```

# TODO
[] Improve prop-typing of NodeHeader and Field components.
