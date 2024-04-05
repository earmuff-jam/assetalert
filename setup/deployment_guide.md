# Dev Build and Deployment Guide

## Pre Req:

1. Docker.
2. Golang/migrate lib.

### Development Instance

- Use `main.sh` to run development instances.
  - ./main.sh -e
  - ./main.sh -f
  - ./main.sh -m
  - ./main.sh -g
- Run `-e` command first to get all .env variables for build.
- Run `-f` command to fetch the db container and build it in docker. Pre-req : Docker.
- Run `-m` command to run all the migration in sequence. Pre-req: Migrate Cmd go/lang lib. https://github.com/golang-migrate/migrate
- Run `-g` command to insert some test data. This inserts some rows in the database built beforehand. This should be only used for test data purposes.
- If everything is succesful, you should be able to succesfully have a development instance of psql container within docker with required migration files.
- Continue setup from MakeFile.

### Test Instance

- Use `main.sh` to run test instance.
  - This test instance will have no data. Assumption is that you view mashed app from the scratch.
  - ./main.sh -e
  - ./main.sh -t
  - ./main.sh -m
  - ./main.sh -g
- Run `-e` command first to get all .env variables for build.
- Run `-t` for loading test instance and `-m` so that the migration scripts can run.
- Run `-g` command to insert some test data. This inserts some rows in the database built beforehand. This should be only used for test data purposes.

### Production Instance

- Use `mainDeploy.sh` to run production instance.
  - This is production isntance. Please be careful. Data is not scrubbed here.
  - ./main.sh -e
  - ./main.sh -p
  - ./main.sh -m
- Run `-m` to allow for the migration scripts to run.
