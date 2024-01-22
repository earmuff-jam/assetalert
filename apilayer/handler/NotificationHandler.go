package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/mohit2530/communityCare/db"
	"github.com/mohit2530/communityCare/model"
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

	vars := mux.Vars(r)
	userID := vars["id"]

	if len(userID) <= 0 {
		log.Printf("Unable to retrieve event with empty id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	resp, err := db.RetrieveAllNotifications(user, userID)
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

// UpdateSingleNotification ...
// swagger:route PUT /api/v1/profile/{id}/notifications/{notificationID}
//
// # Retrieves the list of notifications for each users
//
// # Updates the selected notification
//
// Responses:
// 200: Message
// 400: Message
// 404: Message
// 500: Message
func UpdateSingleNotification(rw http.ResponseWriter, r *http.Request, user string) {

	vars := mux.Vars(r)
	userID := vars["id"]

	if len(userID) <= 0 {
		log.Printf("Unable to retrieve event with empty id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	notificationID := vars["notificationID"]

	if len(notificationID) <= 0 {
		log.Printf("unable to retrieve notification with empty id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	var updatedNotification model.Notification
	if err := json.NewDecoder(r.Body).Decode(&updatedNotification); err != nil {
		log.Printf("Error decoding data. error: %+v", err)
		rw.WriteHeader(http.StatusBadRequest)
		return
	}

	resp, err := db.UpdateSelectedNotification(user, userID, updatedNotification)
	if err != nil {
		log.Printf("Unable to update selected notification. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}
