# Description

This is a fullstack web application built in `JavaScript`, `React` and `NodeJS`.

It uses `MongoDB` for its data storaging needs, is deployed at `Heroku` and is available live at this [link](https://socnet.arkadyt.com).

# Run Locally
Set up a new local mongodb database through mongo shell:
```
use newdb
db.createUser({ user: "dbuser", pwd: "dbpwd", roles: [ "userAdmin" ] })
```

Modify mongoURI in config/keys.dev.js:
```
...
  mongoURI: 'mongodb://dbuser:dbpwd@localhost:27017/newdb',
...
```

Finally clone the repository, install dependencies, build and run:
```
git clone https://github.com/arkadyt/ww.net.git
cd ww.net
npm install && npm run server

# replace konsole w/ your terminal
[konsole] & disown
cd ww.net/client
npm install && npm start
```