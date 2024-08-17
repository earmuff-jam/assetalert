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

// GetAllCategories ...
// swagger:route GET /api/v1/categories GetAllCategories getAllCategories
//
// # Retrieves the list of categories that each assets can be associated with.
// Each user can have their own set of categories. All categories are specific to the selected user
//
// Responses:
//
// 200: []CategoryList
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func GetAllCategories(rw http.ResponseWriter, r *http.Request, user string) {

	userID := r.URL.Query().Get("id")
	limit := r.URL.Query().Get("limit")

	if userID == "" {
		log.Printf("Unable to retrieve categories with empty id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}
	limitInt, err := strconv.Atoi(limit)
	if err != nil {
		limitInt = 10
	}
	resp, err := db.RetrieveAllCategories(user, userID, limitInt)
	if err != nil {
		log.Printf("Unable to retrieve categories. error: %v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}

// GetCategory ...
// swagger:route GET /api/v1/category GetCategory getCategory
//
// # Retrieves the selected category
//
// Responses:
//
// 200: Category
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func GetCategory(rw http.ResponseWriter, r *http.Request, user string) {

	userID := r.URL.Query().Get("id")
	categoryID := r.URL.Query().Get("catID")

	if userID == "" {
		log.Printf("Unable to retrieve associated item for selected category with empty user id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	if categoryID == "" {
		log.Printf("Unable to retrieve associated items with empty id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	resp, err := db.RetrieveCategory(user, userID, categoryID)
	if err != nil {
		log.Printf("Unable to retrieve categories. error: %v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}

// GetAllCategoryItems ...
// swagger:route GET /api/v1/categories GetAllCategoryItems getAllCategoryItems
//
// # Retrieves the list of assets for a specific category.
//
// Responses:
//
// 200: []CategoryItems
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func GetAllCategoryItems(rw http.ResponseWriter, r *http.Request, user string) {

	userID := r.URL.Query().Get("id")
	limit := r.URL.Query().Get("limit")
	categoryID := r.URL.Query().Get("catID")

	if userID == "" {
		log.Printf("Unable to retrieve associated item for selected category with empty user id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	if categoryID == "" {
		log.Printf("Unable to retrieve associated items with empty id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	limitInt, err := strconv.Atoi(limit)
	if err != nil {
		limitInt = 10
	}

	resp, err := db.RetrieveAllCategoryItems(user, userID, categoryID, limitInt)
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

// CreateCategory ...
// swagger:route POST /api/v1/category/{id} CreateCategory createCategory
//
// # Create category
//
// Parameters:
//   - +name: name
//     in: query
//     description: The category name
//     type: string
//     required: true
//   - +name: description
//     in: query
//     description: The category description of the item
//     type: string
//     required: false
//   - +name: color
//     in: query
//     description: The user assigned color of the selected category
//     type: int
//     required: false
//
// Responses:
// 200: Category
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func CreateCategory(rw http.ResponseWriter, r *http.Request, user string) {

	draftCategory := &model.Category{}
	err := json.NewDecoder(r.Body).Decode(draftCategory)
	r.Body.Close()
	if err != nil {
		log.Printf("Unable to decode request parameters. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	resp, err := db.CreateCategory(user, draftCategory)
	if err != nil {
		log.Printf("Unable to create new category. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}

// UpdateCategory ...
// swagger:route PUT /api/v1/category/{id} UpdateCategory updateCategory
//
// # Update category function updates the selected category with new values
//
// Parameters:
//   - +name: name
//     in: query
//     description: The category name
//     type: string
//     required: true
//   - +name: description
//     in: query
//     description: The category description of the item
//     type: string
//     required: false
//   - +name: color
//     in: query
//     description: The user assigned color of the selected category
//     type: int
//     required: false
//
// Responses:
// 200: Category
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func UpdateCategory(rw http.ResponseWriter, r *http.Request, user string) {

	draftCategory := &model.Category{}
	err := json.NewDecoder(r.Body).Decode(draftCategory)
	r.Body.Close()
	if err != nil {
		log.Printf("Unable to decode request parameters. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	resp, err := db.UpdateCategory(user, draftCategory.UpdatedBy, draftCategory)
	if err != nil {
		log.Printf("Unable to update new category. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return
	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(resp)
}

// RemoveCategory ...
// swagger:route DELETE /api/v1/category/{id} RemoveCategory removeCategory
//
// # Removes a selected category based on the id
//
// Parameters:
//   - +name: id
//     in: path
//     description: The id of the category to delete
//     type: string
//     required: true
//
// Responses:
// 200: MessageResponse
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func RemoveCategory(rw http.ResponseWriter, r *http.Request, user string) {

	vars := mux.Vars(r)
	categoryID := vars["id"]

	if len(categoryID) <= 0 {
		log.Printf("Unable to delete category with empty id")
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(nil)
		return
	}

	err := db.RemoveCategory(user, categoryID)
	if err != nil {
		log.Printf("Unable to remove category. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return

	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(categoryID)
}
