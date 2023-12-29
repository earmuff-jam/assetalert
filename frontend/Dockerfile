# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package.json yarn.lock ./

# Install node packages
RUN yarn

# Copy the source code and public files
COPY ./src ./src
COPY ./public ./public

ARG REACT_APP_LOCALHOST_URL

# Build the app
RUN yarn build
RUN yarn global add serve

# Expose the port on which the app will run
EXPOSE 3000

# Start the app using the serve command
CMD [ "serve", "-s", "build" ]