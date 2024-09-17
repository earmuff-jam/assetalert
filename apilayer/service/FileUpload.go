package service

import (
	"errors"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"os"
	"path/filepath"

	"github.com/google/uuid"
	"github.com/mohit2530/communityCare/db"
)

const Upload_Directory = "local_uploads"

// UploadAndAssociateFile ...
//
// upload image to the local system and associate it with the passed in id. the workflow can be associated with various tables we also pass in the type of association.
func UploadAndAssociateFile(fileToProcess multipart.File, itemType rune, userID string, itemID string, user string) (string, error) {
	uploadDir := filepath.Join("..", Upload_Directory, userID)
	if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
		log.Printf("unable to create user directory for images. erorr: %+v", err)
		return "", err
	}

	fileID := uuid.New().String()
	dstFilePath := filepath.Join(uploadDir, fmt.Sprintf("%s.png", fileID))
	dstFile, err := os.Create(dstFilePath)
	if err != nil {
		log.Printf("Error creating file: %+v", err)
		return "", err
	}
	defer dstFile.Close()

	if _, err := io.Copy(dstFile, fileToProcess); err != nil {
		log.Printf("Error saving file: %+v", err)
		return "", err
	}

	err = associateImage(fileID, itemType, userID, itemID, user)
	if err != nil {
		log.Printf("unable to associate image with selected file. error: %+v", err)
		_ = removeAssociatedImage(fileID, userID, user)
		return "", err
	}
	return fileID, nil
}

// AssociateImage ...
//
// associates the selected image with the type of item that the image is targeted for. Eg, if the image is a type of asset, type would be 'A' and image id is the ID.
func associateImage(imageID string, itemType rune, userID string, itemID string, user string) error {

	switch itemType {
	case 'C':
		_, err := db.UpdateCategoryImage(user, userID, itemID, imageID)
		if err != nil {
			return err
		}
	case 'A':
		_, err := db.UpdateAssetImage(user, userID, itemID, imageID)
		if err != nil {
			return err
		}
	case 'M':
		_, err := db.UpdateMaintenancePlanImage(user, userID, itemID, imageID)
		if err != nil {
			return err
		}
	case 'P':
		_, err := db.UpdateProfileImage(user, userID, imageID)
		if err != nil {
			return err
		}
	default:
		return errors.New("unable to find selected item type")
	}

	return nil
}

// removeAssociatedImage ...
//
// removes the associated image from the selected folder where the image is stored.
func removeAssociatedImage(imageID string, userID string, user string) error {

	return nil
}
