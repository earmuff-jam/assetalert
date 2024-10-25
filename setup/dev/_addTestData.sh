#!/bin/bash

echo "Running test data scripts"
source .env
PGPASSWORD=password psql -h $DATABASE_DOCKER_CONTAINER_IP_ADDRESS -p $DATABASE_DOCKER_CONTAINER_PORT -U $COMMUNITY_TEST_USER -d $POSTGRES_DB -a -f setup/devscript/test_data.sql
