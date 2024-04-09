
include .env

# load swagger for api contract
swagger:
	cd apilayer && swagger generate spec -o swagger.yaml --scan-models

# load api in development instance.
startserver:
	cd apilayer && \
	GO111MODULE=on \
	go run main.go

# api unit tests without coverage printed out
gotest:
	./main.sh -T

# load ui in development instance.
startclient:
	cd frontend && \
	yarn dev