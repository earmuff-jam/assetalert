
# Use an official Node.js runtime as a parent image
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

COPY . .

# Install node packages
RUN yarn network-timeout 100000

# Build the app
RUN NODE_OPTIONS="--max-old-space-size=4096" yarn build --network-timeout 600000

# prod environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/client.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]