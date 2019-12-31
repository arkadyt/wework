#!/bin/bash

DIRPATH=$0

# restore db
echo ::: restoring wework database from backup... :::
mongorestore \
  --drop \
  --preserveUUID \
  --restoreDbUsersAndRoles \
  --authenticationDatabase=admin \
  --db=wework \
  --host=localhost:27017 \
  --username=$MONGO_INITDB_ROOT_USERNAME \
  --password=$MONGO_INITDB_ROOT_PASSWORD \
  $DIRPATH/wework
