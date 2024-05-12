# Docker Configuration for Mashed

## General Introduction and Overaching Concepts

To enable interoperability between platforms and to stay independent of deployment strategies, we have come to realize that using docker should suit our needs. The main objective here is to assign proper containers for all services that are required for the `Mashed` to work. As we work towards this effort, we would like to note that breaking away from our heavily dependent system of supabase is not going to be an easy task.

## Tips and Helpful Guide

The docker scripts should be run in a linux terminal. The associated scripts will run the appropriate commands to download and run docker including the process to create the container and add scripts to the database on the running system.

`Note:` The scripts are built to consider setup folder as the parent at all given times. Altering this path will misconfigure the installation.

### Docker Installation

`Note:` Support WSL2 in Windows 11. For other operating systems, please use appropriate systems.

- Update your OS if necessary `sudo apt update && sudo apt upgrade`
- Install docker with the command.
  ```
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  ```
- Start and enable the docker services. To enable the services on boot, use appropriate commands.
  ```
  sudo systemctl start docker
  sudo systemctl enable docker
  ```
- Check docker version with the command `docker --version`.
- Run a psql instance docker image as our primary database.
  `docker run --name my-postgres-container -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres`

Docker container should be running at this point. To psql / ssh into the docker container, we need to be aware of the IP address of the docker container. Retrieve it from below. To connect from Windows 11, we need to enable firewall.

```
<!-- Use this to connect DBA tool -->
ip addr show eth0 | grep -oP 'inet \K[\d.]+'

<!-- Run this in the WSL2 container -->
<!-- If you forgot your docker container name, run sudo docker ps -->
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container_name_or_id>

<!-- You need to create a firewall rule inside Windows Advanced Security to allow the port ( default 5432 ) to accept comms. This allows your windows 11 machine to talk to the docker container within WSL2. You need to restart your terminal as well. The docker container IP is retrieved from the command above at line 74. Others do not seem to work. -->
psql -h docker_container_ip -p 5432 -U postgres -d <db_name>
```

- You should be able to psql into the docker and or ssh into the docker now. It is advised to control the IP addresses that can ssh into your docker container as this is a security risk. Since, this container is for the postgres database, we should limit the ability to ssh into this container.

- Stop running docker services and close the docker

  ```
  docker stop <container-name>
  docker rm -f <container-name>
  ```

- View list of running containers with `docker ps`

## Troubleshooting with docker

1. `enter a selected container` - `docker exec -it <service_name> bash`
