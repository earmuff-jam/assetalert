#!/bin/bash

echo "Running migration scripts"
source .env
migrate -database "postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@$DATABASE_DOCKER_CONTAINER_IP_ADDRESS:$DATABASE_DOCKER_CONTAINER_PORT/$POSTGRES_DB?sslmode=disable" -path ./server/migrations up
