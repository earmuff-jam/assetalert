## Psql Container and Docker

- Using Dockerfile to interpret the postgres database
- Provide configurations from Dockerfile alongside environmental variables.
- Provide a starter script to load mashed application into the system.
- Install postgres as a docker application with `./main.sh` file. `./main.sh -h` to guide you through.
- Load configurations with `./main.sh -e` to add a `.env` file to house environment variables.
- Default selection will choose a previous working port if `.env` variables are not provided.
