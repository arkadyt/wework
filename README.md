# Description [![Build Status](https://travis-ci.org/arkadyt/ww.net.svg?branch=master)](https://travis-ci.org/arkadyt/ww.net)

This is a fullstack web application built in `JavaScript`, `React` and `Node.js`; it uses `MongoDB` for data storage ([mlab.com](https://mlab.com)).

Backend app is hosted at my own compute instance at [GCP](https://cloud.google.com).

Frontend is served from Firebase.

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
use newdb
db.createUser({ user: "username", pwd: "password", roles: ["userAdmin"] })
```

Set up config/keys.dev.js:
```
module.exports = {
  mongoURI: 'mongodb://username:password@localhost:27017/newdb',
  secretOrKey: '12345678'
}
```

Run the app:
```
npm start && cd ./client && npm start
```
