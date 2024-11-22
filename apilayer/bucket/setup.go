package bucket

import (
	"log"
	"os"

	"github.com/minio/minio-go"
)

// InitializeStorageAndBucket...
//
// Allows for the creation of storage container and bucket
func InitializeStorageAndBucket() {
	client := initializeStorage()
	initializeBucket(client)
}

// initializeStorage ...
//
// Initializes MinIO bucket storage
func initializeStorage() *minio.Client {

	log.Printf("setting up bucket storage for user %s", os.Getenv("MINIO_ROOT_USER"))
	endpoint := os.Getenv("MINIO_APP_LOCALHOST_URL")
	accessKeyID := os.Getenv("MINIO_ROOT_USER")
	secretAccessKey := os.Getenv("MINIO_ROOT_PASSWORD")
	useSSL := false // true for HTTPS

	// Initialize minio client object.
	minioClient, err := minio.New(endpoint, accessKeyID, secretAccessKey, useSSL)
	if err != nil {
		log.Printf("Failed to initialize MinIO client: %+v", err)
	}

	log.Printf("Connected to MinIO bucket storage")
	return minioClient
}

// initializeBucket ...
//
// creates new bucket if the bucket does not exist.
// if the bucket already exists, we do not create the new bucket
func initializeBucket(minioClient *minio.Client) {
	bucketName := os.Getenv("MINIO_APP_BUCKET_NAME")
	location := os.Getenv("MINIO_APP_BUCKET_LOCATION")

	err := minioClient.MakeBucket(bucketName, location)
	if err != nil {
		// Check if the bucket already exists
		exists, errBucketExists := minioClient.BucketExists(bucketName)
		if errBucketExists == nil && exists {
			log.Printf("Bucket already exists:%s", bucketName)
		} else {
			log.Printf("Failed to create bucket. error: %+v", err)
		}
	}
}
