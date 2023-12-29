## React Application and Docker

- To simply deploy the application, running docker compose should suffice.
- The container should be able to load itself, install dependencies and run three containers to facilitate each env.
- The frontend container is built with react and muiv4 alongside numerous other packages for efficient data flow.
- To develop, it is tasteful to prevent the apilayer go modules and front end containers from being operational.
- Run the frontend container with `yarn dev` and adding a `.env` file to house `REACT_APP_LOCALHOST_URL="http://<containerIP>:<port>"`
- Default selection will choose the docker compose yaml format if `.env` variables are not provided.
