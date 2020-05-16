## Web address [![Build Status](https://travis-ci.org/arkadyt/ww.net.svg?branch=master)](https://travis-ci.org/arkadyt/ww.net) [![Coverage](https://img.shields.io/coveralls/github/arkadyt/ww.net.svg)](https://coveralls.io/github/arkadyt/ww.net)

App is hosted at [wework.arkadyt.dev](wework.arkadyt.dev).

## Run locally

Clone the repository:
```
git clone git@github.com:arkadyt/wework.git && cd wework
```

Add an .env file to the repo root:
```
PORT=5050
DB_PORT=27950

TZ=America/New_York
NODE_ENV=development

# intentionally not configuring db auth
MONGO_URI='mongodb://db:27017/wework'
SECRET=yoursecretkey12345
```

Run and view the app:
```
# second half sets up db with test data; requires mongorestore binary installed
docker-compose up -d && ./db/dbrestore.sh ./
cd ./client && yarn && yarn start
```
