package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/mohit2530/communityCare/db"
	"github.com/mohit2530/communityCare/model"
)

// GetEventHealthCheck ...
// swagger:route GET /api/v1/health GetEventHealthCheck getEventHealthCheck
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
func GetEventHealthCheck(rw http.ResponseWriter, r *http.Request, user string) {
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode("Health check concluded. Status shows all services are operational.")
}

// AddExpenseToEvent ...
// swagger:route POST /api/v1/expense AddExpenseToEvent addExpenseToEvent
//
// # Add expenses to an existing event. If the eventID does not exist, the api results an error
//
// Parameters:
//   - +name: name
//     in: query
//     description: The name of the item to add to the event storage list
//     type: string
//     required: true
//   - +name: eventID
//     in: query
//     description: The eventID of the project that the item belongs to
//     type: string
//     required: true
//   - +name: description
//     in: query
//     description: The description of the item
//     type: string
//     required: true
//   - +name: quantity
//     in: query
//     description: The quantity of the item to add into the storage container
//     type: int
//     required: true
//   - +name: location
//     in: query
//     description: The location of the item to add into the storage container.
//     type: string
//     required: true
//
// Responses:
// 200: Event
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func AddExpenseToEvent(rw http.ResponseWriter, r *http.Request, user string) {

	draftExpense := &model.Expense{}
	err := json.NewDecoder(r.Body).Decode(draftExpense)
	r.Body.Close()
	if err != nil {
		log.Printf("Unable to decode request parameters. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	resp, err := db.AddExpense(user, draftExpense)
	if err != nil {
		log.Printf("Unable to add expense. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}

// GetAllEventReports ...
// swagger:route GET /api/v1/report/{id} GetAllEventReports getAllEventReports
//
// # Retrieves the list of reports made against any event. If there is no report, the result is empty array.
//
// Parameters:
//   - +name: id
//     in: path
//     description: The id of the event to retrieve the report from
//     type: string
//     required: true
//
// Responses:
// 200: []ReportEvent
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func GetAllEventReports(rw http.ResponseWriter, r *http.Request, user string) {
	vars := mux.Vars(r)
	eventID := vars["id"]

	if len(eventID) <= 0 {
		log.Printf("Unable to retrieve reports with empty id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	resp, err := db.RetrieveAllReports(user, eventID)
	if err != nil {
		log.Printf("Unable to retrieve report details. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return

	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}

// CreateNewReport ...
// swagger:route POST /api/v1/report CreateNewReport createNewReport
//
// # Create a new report against an event
//
// Parameters:
//   - +name: id
//     in: query
//     description: The id of the new report
//     type: string
//     required: false
//   - +name: ReportEvent
//     in: body
//     description: The report event object that needs to be updated in the db
//     type: ReportEvent
//     required: true
//
// Responses:
// 200: []ReportEvent
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func CreateNewReport(rw http.ResponseWriter, r *http.Request, user string) {

	draftReport := &model.ReportEvent{}
	err := json.NewDecoder(r.Body).Decode(draftReport)
	r.Body.Close()
	if err != nil {
		log.Printf("Unable to decode request parameters. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	resp, err := db.SaveNewReport(user, draftReport)
	if err != nil {
		log.Printf("Unable to create new report. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
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
