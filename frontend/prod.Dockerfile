# Use an official Node.js runtime as a parent image
FROM node:20-alpine as build

# Set the working directory inside the container
WORKDIR /app

RUN apk add --no-cache curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh

ENV PATH="/root/.yarn/bin:${PATH}"

COPY frontend/ .

RUN yarn -v && \
    yarn install --production && \
    yarn build

# prod environment
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/client.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
