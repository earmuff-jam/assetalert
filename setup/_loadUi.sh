
#!/bin/sh

# File: _loadUi.sh
# Description: Loads the main application ui script with docker

if [ -f .env ]; then
    source .env
else
    echo "Error: Required environment configurations are invalid."
    exit 1
fi

if sudo docker ps -a | grep -q $UI_DOCKER_CONTAINER; then
    echo "There are running containers. Deleting only associated containers."
    sudo docker rm -f $UI_DOCKER_CONTAINER
    sudo docker run --name $UI_DOCKER_CONTAINER -e POSTGRES_PASSWORD=home -e POSTGRES_DB=$POSTGRES_DB -d -p $POSTGRES_HOST:$POSTGRES_HOST $POSTGRES_USER
else
    echo "No running containers found. Installing from source. Please wait ..."
    echo "Downloading PostgreSQL docker container. Please wait..."
    sudo docker run --name $UI_DOCKER_CONTAINER -e POSTGRES_PASSWORD=home -e POSTGRES_DB=$POSTGRES_DB -d -p $POSTGRES_HOST:$POSTGRES_HOST $POSTGRES_USER
fi

echo "Database configuration complete"
sleep 2

# retrieve the ip address of the docker container that the database instance is running on
UI_DOCKER_CONTAINER_IP_ADDRESS=$(sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $UI_DOCKER_CONTAINER)

# Check if UI_DOCKER_CONTAINER_IP_ADDRESS already exists in .env file
if grep -q '^UI_DOCKER_CONTAINER_IP_ADDRESS=' .env; then
    # Update UI_DOCKER_CONTAINER_IP_ADDRESS if it already exists
    sed -i '' "s/^UI_DOCKER_CONTAINER_IP_ADDRESS=.*/UI_DOCKER_CONTAINER_IP_ADDRESS=$UI_DOCKER_CONTAINER_IP_ADDRESS/" .env
else
    # Add UI_DOCKER_CONTAINER_IP_ADDRESS if it doesn't exist
    echo "UI_DOCKER_CONTAINER_IP_ADDRESS=$UI_DOCKER_CONTAINER_IP_ADDRESS" >> .env
fi
