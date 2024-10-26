#!/bin/bash


if [ -f .env ]; then
    source .env
else
    echo "Error: Required environment configurations are invalid."
    exit 1
fi

if sudo docker ps -a | grep -q $DATABASE_DOCKER_CONTAINER_NAME; then
    echo "There are running containers. Deleting only associated containers."
    sudo docker rm -f $DATABASE_DOCKER_CONTAINER_NAME
    sudo docker run --name $DATABASE_DOCKER_CONTAINER_NAME -e POSTGRES_PASSWORD=home -e POSTGRES_DB=$POSTGRES_DB -d -p $POSTGRES_HOST:$POSTGRES_HOST $POSTGRES_USER
else
    echo "No running containers found. Installing from source. Please wait ..."
    echo "Downloading PostgreSQL docker container. Please wait..."
    sudo docker run --name $DATABASE_DOCKER_CONTAINER_NAME -e POSTGRES_PASSWORD=home -e POSTGRES_DB=$POSTGRES_DB -d -p $POSTGRES_HOST:$POSTGRES_HOST $POSTGRES_USER
fi

echo "Database configuration complete"
sleep 2

# retrieve the ip address of the docker container that the database instance is running on
DATABASE_DOCKER_CONTAINER_IP_ADDRESS=$(sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $DATABASE_DOCKER_CONTAINER_NAME)

# retrieve the ip address required for ide to connect to the system
DATABASE_DOCKER_CONTAINER_IDE_ADDRESS=$(sudo ip addr show eth0 | grep -oP 'inet \K[\d.]+')

# Check if DATABASE_DOCKER_CONTAINER_IP_ADDRESS already exists in .env file
if grep -q '^DATABASE_DOCKER_CONTAINER_IP_ADDRESS=' .env; then
    # Update DATABASE_DOCKER_CONTAINER_IP_ADDRESS if it already exists
    sed -i '' "s/^DATABASE_DOCKER_CONTAINER_IP_ADDRESS=.*/DATABASE_DOCKER_CONTAINER_IP_ADDRESS=$DATABASE_DOCKER_CONTAINER_IP_ADDRESS/" .env
else
    # Add DATABASE_DOCKER_CONTAINER_IP_ADDRESS if it doesn't exist
    echo "DATABASE_DOCKER_CONTAINER_IP_ADDRESS=$DATABASE_DOCKER_CONTAINER_IP_ADDRESS" >> .env
fi