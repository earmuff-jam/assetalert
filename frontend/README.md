## React Application and Docker

- The FrontEnd Service is supported with React.
- Muiv4 components, MuiIcons and MuiLab components are also used.
- All secure endpoints require the ability to verify the JWT token.
- To develop, it is tasteful to prevent the front end containers and apilayer container from being operational.
- Run the frontend container with `make startclient` and adding a `.env` file to house environment variables.
- Default selection will choose a previous working port if `.env` variables are not provided.

### Troubleshooting

1. Update node with nvm

```
nvm install 20.0.0
nvm use 20.0.0
nvm default 20.0.0
```
