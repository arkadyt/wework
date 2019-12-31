#!/bin/bash

DIRPATH=$(pwd)

# load credentials
source $DIRPATH/../.env
export $MONGO_INITDB_ROOT_USERNAME $MONGO_INITDB_ROOT_PASSWORD

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
