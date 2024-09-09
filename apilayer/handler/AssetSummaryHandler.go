package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/mohit2530/communityCare/db"
)

// GetAssetSummary ...
// swagger:route GET /api/v1/locations GetAssetSummary getAssetSummary
//
// # Retrieves the list of all assets and associated maintenance plans created by the select user
//
// Parameters:
//   - +name: id
//     in: query
//     description: The id of the selected user
//     type: string
//     required: true
//
// Responses:
// 200: []AssetSummary
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func GetAssetSummary(rw http.ResponseWriter, r *http.Request, user string) {

	userID := r.URL.Query().Get("id")

	if userID == "" {
		log.Printf("Unable to retrieve asset summary with empty id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}
	resp, err := db.RetrieveAllAssetSummary(user, userID)
	if err != nil {
		log.Printf("Unable to retrieve asset summary. error: %v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}
