#!/bin/bash

DIRPATH=$(pwd)

# restore db
echo ::: restoring wework database from backup... :::
mongorestore \
  --drop \
  --preserveUUID \
  --restoreDbUsersAndRoles \
  --db=wework \
  --host=localhost:27017 \
  $DIRPATH/wework
