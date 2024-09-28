package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
)

// GetAllFiles ...
// swagger:route GET /filestat/list/{id} Files getAllFiles
//
// # Retrieves the list of files associated with the selected user
//
// Parameters:
//   - +name: id
//     in: path
//     description: The userID of the selected user
//     type: string
//     required: true
//
// Responses:
// 200: MessageResponse
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func GetAllFiles(rw http.ResponseWriter, r *http.Request, user string) {

	vars := mux.Vars(r)
	userID := vars["id"]

	if len(userID) <= 0 {
		log.Printf("Unable to view files associated with the selected user.")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	directoryPath := filepath.Join("..", "local_uploads", userID)
	if _, err := os.Stat(directoryPath); os.IsNotExist(err) {
		log.Printf("Unable to view associated files. error: %+v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	files, err := os.ReadDir(directoryPath)
	if err != nil {
		log.Printf("Unable to view associated files. error: %+v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	fmt.Printf("%+v", files)
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode("200 OK")
}

// ServeFile ...
// swagger:route GET /filestat/view/{id}/{filename} Files serveFile
//
// # Retrieves the selected file associated with the user in binary form
//
// Parameters:
//
//   - +name: id
//     in: path
//     description: The userID of the selected user
//     type: string
//     required: true
//   - +name: filename
//     in: path
//     description: The unique identifier for the selected file
//     type: string
//     required: true
//
// Responses:
// 200: MessageResponse
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func ServeFile(rw http.ResponseWriter, r *http.Request, user string) {

	vars := mux.Vars(r)
	userID := vars["id"]
	if userID == "" {
		log.Printf("Unable to retrieve selected file with empty id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	filename := vars["filename"]
	if filename == "" {
		log.Printf("Unable to retrieve selected file without filename")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	// Serve the file
	rw.Header().Set("Content-Type", "image/jpeg")
	http.ServeFile(rw, r, "")
}

// CreateFile ...
// swagger:route POST /filestat/create/{id}/{type}/{itemID} Files createFile
//
// # Adds the passed in image from the request body to the storage folder. The folder is created if it does not exists. If the folder exists, then the image is added to the file.
//
// Parameters:
//
//   - +name: id
//     in: path
//     description: The userID of the selected user
//     type: string
//     required: true
//   - +name: type
//     in: path
//     description: The type of item the image must be associated with.
//     type: string
//     enum: [C, A, M, P]
//     required: true
//   - +name: itemID
//     in: path
//     description: The itemID of the associated element the image is uploaded against
//     type: string
//     required: true
//   - +name: File
//     in: body
//     description: The contents of the file limited to 2mb
//     type: string
//     format: binary
//     required: true
//
// Responses:
// 200: MessageResponse
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func CreateFile(rw http.ResponseWriter, r *http.Request, user string) {

	vars := mux.Vars(r)
	userID := vars["id"]
	itemID := vars["itemID"]
	itemType := vars["type"]

	if userID == "" {
		log.Printf("Unable to created associated images with empty id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	if itemID == "" {
		log.Printf("Unable to created associated images with empty item id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	runeElement := rune(itemType[0])
	if !validItemType(runeElement) {
		log.Printf("Unable to created associated images with incorrect item type")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	// Limit size to 2MB
	if err := r.ParseMultipartForm(2 << 20); err != nil {
		log.Printf("Error parsing multipart form: %+v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	file, _, err := r.FormFile("image")
	if err != nil {
		log.Printf("Unable to retrieve file. error: %+v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}
	defer file.Close()

	// fileID, err := service.UploadAndAssociateFile(file, runeElement, userID, itemID, user)
	if err != nil {
		log.Printf("unable to upload and associate file. error: %+v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode("")
}

// validItemType ...
//
// returns true if the item type is valid and is one of the rune elements 'C', 'A', 'M', 'P'
func validItemType(itemType rune) bool {
	itemTypes := []rune{'C', 'A', 'M', 'P'}

	for _, v := range itemTypes {
		if itemType == v {
			return true
		}
	}
	return false
}
