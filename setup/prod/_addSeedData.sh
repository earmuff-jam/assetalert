#!/bin/bash

echo "Running seed data scripts for production instance"
source .env

psql    -h $DATABASE_DOCKER_CONTAINER_IP_ADDRESS \
        -p $DATABASE_DOCKER_CONTAINER_PORT \
        -U $POSTGRES_USER \
        -d $POSTGRES_DB \
        -a -f server/seed/seedData.sql

