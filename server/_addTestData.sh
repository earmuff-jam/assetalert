#!/bin/bash

if [ -z "$1" ]; then
  echo "Test User is not provided. "
  exit 1
fi

if [ -z "$2" ]; then
  echo "Test User Port is not provided. "
  exit 1
fi

if [ -z "$3" ]; then
  echo "Db is not provided. "
  exit 1
fi


if [ -z "$4" ]; then
  echo "Client Hostname is not provided."
  exit 1
fi


# Assign the provided PGHOST argument
COMMUNITY_TEST_USER="$1"
COMMUNITY_TEST_PORT="$2"
POSTGRES_DB="$3"
CLIENT_HOSTNAME="$4"

echo "Using configuration for db $POSTGRES_DB with user $COMMUNITY_TEST_USER"
PGPASSWORD=password psql -h $CLIENT_HOSTNAME -p $COMMUNITY_TEST_PORT -U $COMMUNITY_TEST_USER -d $POSTGRES_DB -a -f devscript/test_data.sql
