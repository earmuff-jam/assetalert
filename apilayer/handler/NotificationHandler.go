package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/mohit2530/communityCare/db"
)

// GetNotificationHealthCheck ...
// swagger:route GET /api/v1/health
//
// # Health Check
//
// Health Check to test if the application api layer is operational or not. This api functionality
// does not attempt to connect with the backend service. It is designed to support heartbeat support system.
//
// Responses:
// 200: Message
// 400: Message
// 404: Message
// 500: Message
func GetNotificationHealthCheck(rw http.ResponseWriter, r *http.Request, user string) {
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode("Health check concluded. Status shows all services are operational.")
}

// GetAllNotifications ...
// swagger:route GET /api/v1/profile/{id}/notifications
//
// # Retrieves the list of notifications for each users
//
// Retrieves the list of notifications that are happening currently in the application.
//
// Responses:
// 200: []Notification
// 400: Message
// 404: Message
// 500: Message
func GetAllNotifications(rw http.ResponseWriter, r *http.Request, user string) {
	resp, err := db.RetrieveAllNotifications(user)
	if err != nil {
		log.Printf("Unable to retrieve all existing notifications. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}
