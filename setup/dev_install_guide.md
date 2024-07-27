
# Installing required softwares

1. Make
2. Go Programming Language
3. Migrate Cli
4. Psql Db
5. Yarn package manager
6. Docker

## Make

```
sudo apt-get install build-essential
```

## Go Programming Language

### Installation steps

1. Update the system and install some required dependencies

```
sudo apt update
sudo apt upgrade
sudo apt install wget software-properties-common apt-transport-https

```

2. Access `https://go.dev/dl/` to get the latest go pacakge. Extract the package and install it in /usr/local/

```
wget https://golang.org/dl/go1.21.6.linux-386.tar.gz
sudo tar -zxvf go1.21.6.linux-386.tar.gz -C /usr/local/
```

3. Load the config to /etc/profile.d/go.sh and source it. Verify that you have the go config variables in path with quick check `go version`.

```
echo "export PATH=/usr/local/go/bin:${PATH}" | sudo tee /etc/profile.d/go.sh
source /etc/profile.d/go.sh
go version
```

## Migrate Cli

Required for versioning of db scripts

`Note`: Applications built with releases can be checked out to download relative binaries. You have to download the source code, build it and move it to the appropriate location. You can also use other toolchains to do such.

### Releases
https://github.com/golang-migrate/migrate/releases

### Installation Steps

1. Retrieve the migrate file from the repository

```
curl -s https://packagecloud.io/install/repositories/golang-migrate/migrate/script.deb.sh | sudo bash
```

2. Update your machine

```
sudo apt-get update
```

3. Install the selected package

```
sudo apt-get install -y migrate
```

### Resources:

How to use the migrate application package. https://github.com/golang-migrate/migrate/blob/master/cmd/migrate/README.md


## Postgresql

Install postgresql as it is the database system

```
sudo apt-get install postgresql postgresql-contrib
```

### Troubleshooting:

1. If you get error `Error: No cluster specified with $PGCLUSTER` then you can just simply remove the PGCLUSTER with `unset PGCLUSTER` as we are not using that

2. If you are setting up the psql for the first time, the role `postgres` might not exist. The role you setup your computer would be inherited. To overwrite this, you can use `sudo -i -u postgres` and `psql` into your instance. Please note that `you would have to do this every time`. Instead you can opt to `create a role` for your user. This step is not documented since its not required to start the application.


## Yarn Package manager
Yarn package manager is used to build and deploy the frontend of the application.

1. Install yarn

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn

```

### Troubleshooting:

1. For a first time run, you need to install `vite`. Navigate to the folder with `cd /frontend` and run command `yarn`. 

## Docker
Installing docker steps is located in docker_guide.md


# How to build application

1. Run script in `main.sh` for dev mode. To deploy run script in `mainDeploy.sh`. 
2. For `dev mode` after `main.sh` commands, open a new terminal and run `make startserver`. Your backend should be built.
3. For `dev mode` after step 2, for first time install, navigate to `frontend` directory and run `yarn` depending on what you have setup.

