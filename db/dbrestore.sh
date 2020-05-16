#!/bin/bash

# default values
DF_PATH=/home/ubuntu/apps/wework
DF_PORT=27950

DIRPATH=${1:-$DF_PATH}
DB_PORT=${2:-$DF_PORT}

# restore db
echo ::: restoring wework database from backup... :::
mongorestore \
  --drop \
  --db=wework \
  --host=localhost:$DB_PORT \
  $DIRPATH/db/wework
