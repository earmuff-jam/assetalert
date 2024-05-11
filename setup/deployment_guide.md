# Dev Build and Deployment Guide

## Pre Req:

1. Docker.
2. Golang/migrate lib.
3. Yarn package manager.

### Development Instance

- Use `main.sh` to run development instances.
  - ./main.sh -e
  - ./main.sh -f
  - ./main.sh -m
  - ./main.sh -g
- Run `-e` command first to get all .env variables for build.
- Run `-D` to load dev container and run migration scripts. This add extra data for developers to develop against.
- If everything is succesful, you should be able to succesfully have a development instance of psql container within docker with required migration files.
- Continue setup from MakeFile.

### Test Instance

- Use `main.sh` to run test instance.
  - This test instance will have no data. Assumption is that you view mashed app from the scratch.
  - ./main.sh -e
  - ./main.sh -T
- Run `-e` command first to get all .env variables for build.
- Run `-T` for loading test instance. This will load all migration scripts and also run unit tests.
- Run `-u` for cleanup purposes. Must be done manually.

### Production Instance

#### Notes

1. Production instance must be executed in sequence. Since there should be ability to alter data, we have to run migration scripts as well. Please be aware of this.
2. Only required env variables are copied over.
3. Since data cannot be modified here, no test data is inserted. A fresh container will have no users. Running flag `-u` will `REMOVE ALL DATA`. `NEVER RUN THIS IN PRODUCTION ENV`

- Use `mainDeploy.sh` to run production instance.
  - This is production isntance. Please be careful. Data is not scrubbed here.
  - ./mainDeploy.sh -e
  - ./mainDeploy.sh -p
  - ./mainDeploy.sh -m
- Run `-m` to allow for the migration scripts to run. `must`
