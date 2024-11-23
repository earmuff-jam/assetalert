# Start from golang base image
FROM golang:alpine as builder

# Add Maintainer info
LABEL maintainer="Earmuff Jam <earmuffjam@gmail.com>"

# Install git.
RUN apk update && apk add --no-cache git

# Set the current working directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY apilayer/go.mod apilayer/go.sum ./
COPY .env .env

# Download all dependencies
RUN go mod download 

# Copy the source code
COPY apilayer/ .

# Build the Go app
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Start a new stage from scratch
FROM alpine:latest
RUN apk --no-cache add ca-certificates

# Set the working directory
WORKDIR /root/

# Copy the Pre-built binary file from the previous stage
COPY --from=builder /app/main .
COPY --from=builder /app/.env .

# Expose port 8087
EXPOSE 8087

# Command to run the executable
CMD ["./main"]
