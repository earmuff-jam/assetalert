package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/mohit2530/communityCare/db"
)

// GetStorageLocationHealthCheck ...
// swagger:route GET /api/v1/health GetStorageLocationHealthCheck getStorageLocationHealthCheck
//
// # Health Check
//
// Health Check to test if the application api layer is operational or not. This api functionality
// does not attempt to connect with the backend service. It is designed to support heartbeat support system.
//
// Responses:
// 200: MessageResponse
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func GetStorageLocationHealthCheck(rw http.ResponseWriter, r *http.Request, user string) {
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode("Health check concluded. Status shows all services are operational.")
}

// GetAllStorageLocations ...
// swagger:route GET /api/v1/locations GetAllStorageLocations getAllStorageLocations
//
// # Retrieves the list of locations that can be used to store items associated to a event
//
// Responses:
// 200: []StorageLocation
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func GetAllStorageLocations(rw http.ResponseWriter, r *http.Request, user string) {

	resp, err := db.RetrieveAllStorageLocation(user)
	if err != nil {
		log.Printf("Unable to retrieve storage locations. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return

	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}
