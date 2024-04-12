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
// swagger:route GET /api/v1/health GetNotificationHealthCheck getNotificationHealthCheck
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
func GetNotificationHealthCheck(rw http.ResponseWriter, r *http.Request, user string) {
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode("Health check concluded. Status shows all services are operational.")
}

// GetAllNotifications ...
// swagger:route GET /api/v1/profile/{id}/notifications GetAllNotifications getAllNotifications
//
// # Retrieves the list of notifications for each users
//
// Retrieves the list of notifications that are happening currently in the application.
//
// Parameters:
//   - +name: id
//     in: path
//     description: The id of the selected user to retrieve the notification for
//     type: string
//     required: true
//
// Responses:
// 200: []Notification
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func GetAllNotifications(rw http.ResponseWriter, r *http.Request, user string) {

	vars := mux.Vars(r)
	userID := vars["id"]

	if len(userID) <= 0 {
		log.Printf("Unable to retrieve notifications with empty id")
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
// swagger:route PUT /api/v1/profile/{id}/notifications/{notificationID} UpdateSingleNotification updateSingleNotification
//
// # Retrieves the list of notifications for each users
//
// # Updates the selected notification
//
// Parameters:
//   - +name: id
//     in: path
//     description: The id of the selected user to retrieve the notification for
//     type: string
//     required: true
//   - +name: notificationID
//     in: path
//     description: The notificationID of the selected notification
//     type: string
//     required: true
//   - +name: Notification
//     in: body
//     description: The Notification object that can be used to update the selected notification
//     type: Notification
//     required: true
//
// Responses:
// 200: MessageResponse
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func UpdateSingleNotification(rw http.ResponseWriter, r *http.Request, user string) {

	vars := mux.Vars(r)
	userID := vars["id"]

	if len(userID) <= 0 {
		log.Printf("Unable to retrieve notification with empty userID")
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
