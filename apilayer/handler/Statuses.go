package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/mohit2530/communityCare/db"
)

// GetStatusList ...
// swagger:route GET /api/v1/status/list StatusList getStatusList
//
// # Retrieves the list of statuses that the user can associate with any event
//
// // Parameters:
//   - +name: id
//     in: query
//     description: The userID of the selected user
//     type: string
//     required: true
//   - +name: type
//     in: query
//     description: The type of status option. Current options include "category", "notes", "maintenance"
//     type: string
//     required: true
//
// Responses:
// 200: []StatusList
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func GetStatusList(rw http.ResponseWriter, r *http.Request, user string) {

	userID := r.URL.Query().Get("id")
	statusOptionType := r.URL.Query().Get("type")

	if userID == "" || statusOptionType == "" {
		log.Printf("Unable to retrieve status list with empty params")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	resp, err := db.MaintenanceStatusList(user, userID, statusOptionType)
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
