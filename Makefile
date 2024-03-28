
include .env

# load swagger
swagger:
	cd apilayer && swagger generate spec -o swagger.yaml --scan-models

# load api
startserver:
	cd apilayer && \
	GO111MODULE=on \
	go run main.go

# api unit tests
gotests:
	cd apilayer/handler && go test -coverprofile=../logs/coverage.out ./... && go tool cover -func=../logs/coverage.out

gotests-details:
	cd apilayer/handler && go test -coverprofile=../logs/coverage.out ./... && go tool cover -html=../logs/coverage.out

# load data
datagen:
	./setup/_addTestData.sh
	cd apilayer/dataLake && go run main.go

# load ui
startclient:
	cd frontend && \
	yarn dev