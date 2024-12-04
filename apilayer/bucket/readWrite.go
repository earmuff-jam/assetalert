package bucket

import (
	"errors"
	"io"
	"log"
	"os"

	"github.com/minio/minio-go"
)

// UploadDocumentInBucket ...
//
// uploads document in the bucket. function attempts to communicate with the bucket
func UploadDocumentInBucket(objectName string, filePath string, contentType string) error {

	client, err := initializeStorage()
	if err != nil {
		log.Printf("unable to initialize minio client storage")
		return err
	}
	bucketName := os.Getenv("MINIO_APP_BUCKET_NAME")

	_, err = client.FPutObject(bucketName, objectName, filePath, minio.PutObjectOptions{ContentType: contentType})
	if err != nil {
		log.Printf("unable to add object to the selected bucket. erorr: %+v", err)
		return err
	}
	log.Printf("upload successful")
	return nil
}

// RetrieveDocumentFromBucket ...
//
// Retrieves the selected document from the bucket storage
func RetrieveDocumentFromBucket(documentID string) ([]byte, string, string, error) {
	client, err := initializeStorage()
	if err != nil {
		log.Printf("unable to initialize minio client storage")
		return nil, "", "", err
	}
	bucketName := os.Getenv("MINIO_APP_BUCKET_NAME")

	// Fetch the object from the bucket
	object, err := client.GetObject(bucketName, documentID, minio.GetObjectOptions{})
	if err != nil {
		if minio.ToErrorResponse(err).Code == "NoSuchKey" {
			log.Printf("Object not found: %s", documentID)
			return nil, "", "", nil // Gracefully return empty data if object doesn't exist
		}
		log.Printf("Error retrieving object from the bucket: %+v", err)
		return nil, "", "", err
	}
	defer object.Close()

	// Get object information
	objectStat, err := object.Stat()
	if err != nil {
		if minio.ToErrorResponse(err).Code == "NoSuchKey" {
			log.Printf("Object metadata not found: %s", documentID)
			return nil, "", "", errors.New("NoSuchKey") // Catch the error code and return the error code
		}
		log.Printf("Error retrieving object metadata: %+v", err)
		return nil, "", "", err
	}

	// Read the content
	content, err := io.ReadAll(object)
	if err != nil {
		log.Printf("Error reading object content: %+v", err)
		return nil, "", "", err
	}

	return content, objectStat.ContentType, objectStat.Key, nil
}
