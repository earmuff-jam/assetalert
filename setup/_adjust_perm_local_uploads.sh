#!/bin/bash

DIRECTORY=./local_uploads

USER_UID=$(id -u)
USER_GID=$(id -g)

sudo chown -R ${USER_UID}:${USER_GID} $DIRECTORY
echo "Changed ownership of $DIRECTORY to $USER_UID:$USER_GID"