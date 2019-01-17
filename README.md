# Description [![Build Status](https://travis-ci.org/arkadyt/ww.net.svg?branch=master)](https://travis-ci.org/arkadyt/ww.net) [![Coverage](https://img.shields.io/coveralls/github/arkadyt/ww.net.svg)](https://coveralls.io/github/arkadyt/ww.net)

This is a fullstack web application built in `JavaScript`, `React` and `Node.js`; it uses `MongoDB` for data storage.

Backend app and database are hosted at my own compute instance at [GCP](https://cloud.google.com).

Frontend is served from [Firebase](http://firebase.google.com).

[Site link](https://socnet.arkadyt.com).

# Run Locally
Clone the repository, install dependencies and build:
```
git clone https://github.com/arkadyt/ww.net.git

cd ww.net && npm install
cd ./client && npm install
```

Set up a new local mongodb database through mongo shell:
```
mongo
use <dbname>
db.createUser({ user: "<username>", pwd: "<password>", roles: ["userAdmin"] })
```

Set up config/keys.dev.js:
```
module.exports = {
  mongoURI: 'mongodb://<username>:<password>@localhost:27017/<dbname>',
  secretOrKey: '12345678'
}
```

Run the app:
```
# cd into repo root, then
konsole & disown
cd ./client && npm start

# in the previous terminal window
npm start
```
