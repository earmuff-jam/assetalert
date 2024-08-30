package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/mohit2530/communityCare/db"
	"github.com/mohit2530/communityCare/model"
)

// GetAllMaintenancePlans ...
// swagger:route GET /api/v1/maintenance-plans GetAllMaintenancePlans getAllMaintenancePlans
//
// # Retrieves the list of maintenance plans that each asset can be associated with.
// Each user can have thier own set of maintenance plans. All plans are specific to the selected user
//
// Users can assign asset to multiple plans.
//
// Responses:
//
// 200: []MaintenancePlan
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func GetAllMaintenancePlans(rw http.ResponseWriter, r *http.Request, user string) {

	userID := r.URL.Query().Get("id")
	limit := r.URL.Query().Get("limit")

	if userID == "" {
		log.Printf("Unable to retrieve maintenance plans with empty id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}
	limitInt, err := strconv.Atoi(limit)
	if err != nil {
		limitInt = 10
	}
	resp, err := db.RetrieveAllMaintenancePlans(user, userID, limitInt)
	if err != nil {
		log.Printf("Unable to retrieve maintenance plans. error: %v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}

// GetMaintenancePlan ...
// swagger:route GET /api/v1/plan/ GetMaintenancePlan GetMaintenancePlan
//
// # Retrieve a selected maintenance plan
//
// Responses:
// 200: MaintenancePlan
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func GetMaintenancePlan(rw http.ResponseWriter, r *http.Request, user string) {

	userID := r.URL.Query().Get("id")
	maintenanceID := r.URL.Query().Get("mID")

	if userID == "" {
		log.Printf("Unable to retrieve selected maintenance plan with empty user id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	if maintenanceID == "" {
		log.Printf("Unable to retrieve selected maintenance plan with empty id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	resp, err := db.RetrieveMaintenancePlan(user, userID, maintenanceID)
	if err != nil {
		log.Printf("unable to create new maintenance plan. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}

// GetAllMaintenancePlanItems ...
// swagger:route GET /api/v1/plans/items GetAllMaintenancePlanItems getAllMaintenancePlanItems
//
// # Retrieves the list of assets for a specific maintenance plans.
//
// Responses:
//
// 200: []MaintenanceItemResponse
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func GetAllMaintenancePlanItems(rw http.ResponseWriter, r *http.Request, user string) {

	userID := r.URL.Query().Get("id")
	limit := r.URL.Query().Get("limit")
	maintenancePlanID := r.URL.Query().Get("mID")

	if userID == "" {
		log.Printf("Unable to retrieve associated item for selected maintenance item with empty user id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	if maintenancePlanID == "" {
		log.Printf("Unable to retrieve associated items with empty id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	limitInt, err := strconv.Atoi(limit)
	if err != nil {
		limitInt = 10
	}

	resp, err := db.RetrieveAllMaintenancePlanItems(user, userID, maintenancePlanID, limitInt)
	if err != nil {
		log.Printf("Unable to retrieve associated items. error: %v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}

// AddItemsInMaintenancePlan ...
// swagger:route POST /api/v1/category/items AddItemsInMaintenancePlan addItemsInMaintenancePlan
//
// # Add selected items in a specific maintenance plan
//
// Parameters:
//   - +name: id
//     in: query
//     description: The id of the selected maintenance plan to add the items into
//     type: string
//     required: true
//   - +name: selectedIDs
//     in: query
//     description: The array of IDs of the selected assets
//     type: string
//     required: false
//
// Responses:
// 200: []MaintenanceItemResponse
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func AddItemsInMaintenancePlan(rw http.ResponseWriter, r *http.Request, user string) {

	draftMaintenancePlan := &model.MaintenanceItemRequest{}
	err := json.NewDecoder(r.Body).Decode(draftMaintenancePlan)
	r.Body.Close()
	if err != nil {
		log.Printf("Unable to decode request parameters. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	resp, err := db.AddAssetToMaintenancePlan(user, draftMaintenancePlan.UserID, draftMaintenancePlan.ID, draftMaintenancePlan.AssetIDs)
	if err != nil {
		log.Printf("Unable to add assets to existing maintenance plan. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}

// CreateMaintenancePlan ...
// swagger:route POST /api/v1/plan/{id} CreateMaintenancePlan createMaintenancePlan
//
// # Create maintenance plan
//
// Parameters:
//   - +name: name
//     in: query
//     description: The maintenance plan name
//     type: string
//     required: true
//   - +name: description
//     in: query
//     description: The maintenance plan description of the item
//     type: string
//     required: false
//   - +name: color
//     in: query
//     description: The user assigned color of the selected maintenance plan
//     type: int
//     required: false
//
// Responses:
// 200: MaintenancePlan
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func CreateMaintenancePlan(rw http.ResponseWriter, r *http.Request, user string) {

	draftMaintenancePlan := &model.MaintenancePlan{}
	err := json.NewDecoder(r.Body).Decode(draftMaintenancePlan)
	r.Body.Close()
	if err != nil {
		log.Printf("Unable to decode request parameters. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	resp, err := db.CreateMaintenancePlan(user, draftMaintenancePlan)
	if err != nil {
		log.Printf("unable to create new maintenance plan. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}

// UpdateMaintenancePlan ...
// swagger:route PUT /api/v1/plan/{id} UpdateMaintenancePlan UpdateMaintenancePlan
//
// # Update maintenance plan function updates the selected maintenance plan with new values
//
// Parameters:
//   - +name: name
//     in: query
//     description: The maintenance plan name
//     type: string
//     required: true
//   - +name: description
//     in: query
//     description: The maintenance plan description of the item
//     type: string
//     required: false
//   - +name: color
//     in: query
//     description: The user assigned color of the selected maintenance plan
//     type: int
//     required: false
//
// Responses:
// 200: MaintenancePlan
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func UpdateMaintenancePlan(rw http.ResponseWriter, r *http.Request, user string) {

	draftMaintenancePlan := &model.MaintenancePlan{}
	err := json.NewDecoder(r.Body).Decode(draftMaintenancePlan)
	r.Body.Close()
	if err != nil {
		log.Printf("Unable to decode request parameters. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	resp, err := db.UpdateMaintenancePlan(user, draftMaintenancePlan.UpdatedBy, draftMaintenancePlan)
	if err != nil {
		log.Printf("Unable to update new maintenance plan. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}

// RemoveMaintenancePlan ...
// swagger:route DELETE /api/v1/plan/{id} RemoveMaintenancePlan removeMaintenancePlan
//
// # Removes a selected maintenance plan based on the id
//
// Parameters:
//   - +name: id
//     in: path
//     description: The id of the maintenance plan to delete
//     type: string
//     required: true
//
// Responses:
// 200: MessageResponse
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func RemoveMaintenancePlan(rw http.ResponseWriter, r *http.Request, user string) {

	vars := mux.Vars(r)
	maintenancePlanID := vars["id"]

	if len(maintenancePlanID) <= 0 {
		log.Printf("Unable to delete maintenance plan with empty id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	err := db.RemoveMaintenancePlan(user, maintenancePlanID)
	if err != nil {
		log.Printf("Unable to remove maintenance plan. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return

	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(maintenancePlanID)
}
