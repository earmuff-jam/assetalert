## Go Container and Docker

- The Api service is supported with Go Programming Language.
- The api structures its own JWT implementation.
- The JWT token persists on the clients browser and has a validity of reserved timeframe.
- All secure endpoints require the ability to verify the JWT token.
- To develop, it is tasteful to prevent the apilayer go modules and front end containers from being operational.
- Run the frontend container with `go run main.go` and adding a `.env` file to house environment variables listed below.
- Default selection will choose a previous working port if `.env` variables are not provided.

```
# Postgres App

# token exipiry time. the default expiry time is two minutes.
# to circumvent this you can pass your own expiry time.
TOKEN_VALIDITY_TIME = 5 # in minutes

```
