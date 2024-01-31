
include .env

# load api
startserver:
	cd apilayer && \
	GO111MODULE=on \
	go run main.go

# api unit tests
gotest:
	cd apilayer/handler && go test -cover ./... 

# load data
data-mini:
	cd server && \
	./_addTestData.sh ${COMMUNITY_TEST_USER} ${DATABASE_DOCKER_CONTAINER_PORT} ${POSTGRES_DB} ${DATABASE_DOCKER_CONTAINER_IP_ADDRESS}

# load ui
startclient:
	cd frontend && \
	yarn dev