#!/bin/bash

DIRPATH=/usr/src/db

# restore db
echo ::: restoring wework database from backup... :::
mongorestore \
  --drop \
  --preserveUUID \
  --restoreDbUsersAndRoles \
  --authenticationDatabase=admin \
  --db=wework \
  --host=127.0.0.1:27017 \
  --username=$MONGO_INITDB_ROOT_USERNAME \
  --password=$MONGO_INITDB_ROOT_PASSWORD \
  $DIRPATH/wework
