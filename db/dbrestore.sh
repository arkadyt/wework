#!/bin/bash

DIRPATH=/home/ubuntu/apps/wework

# restore db
echo ::: restoring wework database from backup... :::
mongorestore \
  --drop \
  --preserveUUID \
  --restoreDbUsersAndRoles \
  --db=wework \
  --host=localhost:27017 \
  $DIRPATH/db/wework
