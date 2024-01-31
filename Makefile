
include .env

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
	cd server && \
	./_addTestData.sh ${COMMUNITY_TEST_USER} ${DATABASE_DOCKER_CONTAINER_PORT} ${POSTGRES_DB} ${DATABASE_DOCKER_CONTAINER_IP_ADDRESS}

# load ui
startclient:
	cd frontend && \
	yarn dev