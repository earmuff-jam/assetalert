package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/mohit2530/communityCare/db"
)

// GetStatusesListHealthCheck ...
// swagger:route GET /api/v1/health GetStatusesListHealthCheck getStatusesListHealthCheck
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
func GetStatusesListHealthCheck(rw http.ResponseWriter, r *http.Request, user string) {
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode("Health check concluded. Status shows all services are operational.")
}

// GetStatusList ...
// swagger:route GET /api/v1/status/list GetStatusList getStatusList
//
// # Retrieves the list of statuses that the user can associate with any event
//
// Responses:
// 200: []StatusList
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func GetStatusList(rw http.ResponseWriter, r *http.Request, user string) {

	userID := r.URL.Query().Get("id")

	if userID == "" {
		log.Printf("Unable to retrieve status list with empty id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	resp, err := db.FetchStatusList(user, userID)
	if err != nil {
		log.Printf("Unable to retrieve status list. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return

	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}
