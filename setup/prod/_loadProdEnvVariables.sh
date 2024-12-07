#!/bin/sh

# File: _loadProdEnvVariables.sh
# Description: Loads the required environment variables in production environment.

sleep 2
echo "loading environment variables"

# geocoding map api key
GEOCODING_MAP_API_KEY="65935a9a69a55044609123vne64b72b"

# postgres db parameters
POSTGRES_DB="community"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="home"
POSTGRES_HOST=5432

# minio user
MINIO_ROOT_USER="community_public"
MINIO_ROOT_PASSWORD="password"
MINIO_APP_LOCALHOST_URL=localhost:9000
MINIO_APP_BUCKET_NAME="images"
MINIO_APP_BUCKET_LOCATION="us-east-1"

# general users
CLIENT_USER="community_public"
CLIENT_PASSWORD="password"
TOKEN_VALIDITY_TIME=2

# test users
COMMUNITY_TEST_USER="community_test"

# UI env variables
REACT_APP_ENVIRONMENT="PROD"
REACT_APP_LOCALHOST_URL=http://localhost:8087
REACT_APP_LOCALHOST_URL_SOCKET_BASE_URL=ws://localhost:8087

DATABASE_DOCKER_CONTAINER_NAME="mashed-backend-1"
DATABASE_DOCKER_CONTAINER_PORT=8089

# Create .env file and set parameters
cat <<EOF > .env
POSTGRES_DB=$POSTGRES_DB
POSTGRES_USER=$POSTGRES_USER
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
POSTGRES_HOST=$POSTGRES_HOST
CLIENT_USER=$CLIENT_USER
CLIENT_PASSWORD=$CLIENT_PASSWORD
MINIO_ROOT_USER=$MINIO_ROOT_USER
MINIO_ROOT_PASSWORD=$MINIO_ROOT_PASSWORD
MINIO_APP_BUCKET_NAME=$MINIO_APP_BUCKET_NAME
MINIO_APP_BUCKET_LOCATION=$MINIO_APP_BUCKET_LOCATION
MINIO_APP_LOCALHOST_URL=$MINIO_APP_LOCALHOST_URL
DATABASE_DOCKER_CONTAINER_NAME=$DATABASE_DOCKER_CONTAINER_NAME
TOKEN_VALIDITY_TIME=$TOKEN_VALIDITY_TIME
COMMUNITY_TEST_USER=$COMMUNITY_TEST_USER
REACT_APP_ENVIRONMENT=$REACT_APP_ENVIRONMENT
REACT_APP_LOCALHOST_URL=$REACT_APP_LOCALHOST_URL
DATABASE_DOCKER_CONTAINER_PORT=$DATABASE_DOCKER_CONTAINER_PORT
GEOCODING_MAP_API_KEY=$GEOCODING_MAP_API_KEY
REACT_APP_LOCALHOST_URL_SOCKET_BASE_URL=$REACT_APP_LOCALHOST_URL_SOCKET_BASE_URL
EOF
echo "finished compiling required variables."