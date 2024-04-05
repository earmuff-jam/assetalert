
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
gotests:
	cd apilayer/handler && go test -coverprofile=../logs/coverage.out ./... && go tool cover -func=../logs/coverage.out

# api unit tests with details and coverage printed out
gotests-details:
	cd apilayer/handler && go test -coverprofile=../logs/coverage.out ./... && go tool cover -html=../logs/coverage.out

# load data for initial application and unit test. adding other data will result in failures of unit test.
# TODO: Refactor unit test for apilayer https://github.com/earmuff-jam/mashed/issues/118
datagen:
	./setup/_addTestData.sh

# script data is used to load some placeholder data in the application.
scriptdata:
	cd apilayer/dataLake && go run main.go

# load ui in development instance.
startclient:
	cd frontend && \
	yarn dev