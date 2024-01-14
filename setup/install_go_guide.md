# Go Configuration for Mashed

## Installation steps

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
