## Go Container and Docker

- The Api service is supported with Go Programming Language.
- The api structures its own JWT implementation.
- The JWT token persists on the clients browser and has a validity of reserved timeframe.
- All secure endpoints require the ability to verify the JWT token.
- To develop, it is tasteful to prevent the apilayer container and front end containers from being operational.
- Run the apilayer container with `make startserver` and adding a `.env` file to house environment variables.
- Default selection will choose a previous working port if `.env` variables are not provided.

### Swagger Spec

- Before we proceed, your bashrc must have `GO` export paths. `export PATH=$PATH:$HOME/go/bin`
- To run swagger for the first time on any application, you need to install required dependencies. `go install github.com/go-swagger/go-swagger/cmd/swagger@latest`.
- Test before you proceed with cmd `swagger`.
