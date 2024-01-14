
# Use an official Node.js runtime as a parent image
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

COPY . .

# Install node packages
RUN yarn

# Build the app
RUN yarn build

# prod environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/client.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]