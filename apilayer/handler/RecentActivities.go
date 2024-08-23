package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/mohit2530/communityCare/db"
)

// GetRecentActivities ...
// swagger:route GET /api/v1/profile/recent-activities GetRecentActivities getRecentActivities
//
// # Retrieves user actions for categories, maintenance plans and assets. List all created, updated or deleted.
//
// Responses:
// 200: []Activity
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func GetRecentActivities(rw http.ResponseWriter, r *http.Request, user string) {

	vars := mux.Vars(r)
	userID := vars["id"]
	limit := r.URL.Query().Get("limit")
	untilDate := r.URL.Query().Get("until")

	if userID == "" {
		log.Printf("Unable to retrieve recent activities with empty id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	limitInt, err := strconv.Atoi(limit)
	if err != nil {
		log.Printf("Unable to retrieve recent activities without limit. error :%+v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	resp, err := db.RetrieveRecentActivities(user, userID, limitInt, untilDate)
	if err != nil {
		log.Printf("Unable to retrieve recent activities. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return

	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}
