#!/bin/sh

echo "production deployment authorized. please ensure all required applications are installed. "

source .env

chmod +x setup/_loadEnvVariables.sh
./setup/_loadEnvVariables.sh

chmod +x docker-compose.deploy.yml

if [ "$1" = "-clean" ]; then
    echo "Cleaning up existing containers..."
    docker-compose down --remove-orphans --volumes
    docker-compose -f docker-compose.deploy.yml up --build -d
else
    docker-compose -f docker-compose.deploy.yml up -d
fi

ip_address=$(hostname -I | cut -d' ' -f1)
echo "Docker compose up. Ip Address for UI: http://$ip_address:3000/"
