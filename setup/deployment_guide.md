## Deployment Guide

- Deployed to the cloud with scripts.

### Development Instance

- Use `main.sh` to run development instances.
  - ./main.sh -e
  - ./main.sh -f
  - ./main.sh -e
  - ./main.sh -m
- Run `-e` command first to get all .env variables for build.
- Run `-e` again before `-m` so that the migration scripts can run.

### Test Instance

- Use `main.sh` to run test instance.
  - This test instance will have no data. Assumption is that you view mashed app from the scratch.
  - ./main.sh -e
  - ./main.sh -t
  - ./main.sh -e
  - ./main.sh -m
- Run `-e` command first to get all .env variables for build.
- Run `-e` again before `-m` so that the migration scripts can run.

### Production Instance

- Use `mainDeploy.sh` to run test instance.
  - This is production isntance. Please be careful. Data is not scrubbed here.
  - ./main.sh -e
  - ./main.sh -p
  - ./main.sh -m
- Run `-m` to allow for the migration scripts to run.
