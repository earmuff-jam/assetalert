
#!/bin/bash

# File: _main.sh
# Description: Loads the database layer for the application

help() {
    echo "Usage: $0 [option...] {loadEnv, loadDb, loadMigration}" >&2
    echo
    echo "   -e, --loadEnv              Loads the environment variables only"
    echo "   -p, --loadProdEnv          Allows to load all containers and start with new fresh data. This is production env. Does not erase data"
    echo "   -m, --loadMigration        Allows to load the migration in sequence. Does not erase data but requires container to be up"
    echo
    exit 1
}

loadEnv() {
    echo "envOnly flag provided. only loading env variables."
    chmod +x setup/_loadProdEnvVariables.sh
    ./setup/_loadProdEnvVariables.sh
}

loadProdEnv() {

    echo "loadProdEnv flag provided. building all containers in production mode."

    docker-compose down
    docker-compose -f docker-compose.deploy.yml up --build -d

}

loadMigration() {

    echo "migration flag provided. running migration in sequence."

    chmod +x setup/_loadMigration.sh
    ./setup/_loadMigration.sh
}

while [[ "$#" -gt 0 ]]; do
    case $1 in
        -h|--help) help; shift ;;
        -e|--loadEnv) loadEnv; shift ;;
        -p|--loadProdEnv) loadProdEnv; shift ;;
        -m|--loadMigration) loadMigration; shift ;;
        *) help; echo "Unknown parameter passed: $1" ;;
    esac
    shift
done
