#!/bin/bash

DIRPATH=/usr/src/db

# get vars (.env is not used by db service itself)
# source $DIRPATH/.env
# export MONGO_INITDB_ROOT_USERNAME MONGO_INITDB_ROOT_PASSWORD

# restore
echo ::: restoring wework database from backup... :::
mongorestore \
  --drop \
  --preserveUUID \
  --restoreDbUsersAndRoles \
  --db=wework \
  --host=localhost:27019 \
  --username=$MONGO_INITDB_ROOT_USERNAME \
  --password=$MONGO_INITDB_ROOT_PASSWORD \
  $DIRPATH/wework
