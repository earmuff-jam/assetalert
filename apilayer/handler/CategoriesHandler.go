package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/mohit2530/communityCare/db"
	"github.com/mohit2530/communityCare/model"
)

// GetAllCategories ...
// swagger:route GET /api/v1/categories GetAllCategories getAllCategories
//
// # Retrieves the list of categories that each inventory items can be associated with.
//
// Users cannot assign assets to multiple categories.
//
// Responses:
//
// 200: []CategoryList
// 400: MessageResponse
// 404: MessageResponse
// 500: MessageResponse
func GetAllCategories(rw http.ResponseWriter, r *http.Request, user string) {

	resp, err := db.RetrieveAllCategories(user)
	if err != nil {
		log.Printf("Unable to retrieve categories. error: +%v", err)
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
//     required: true
//   - +name: color
//     in: query
//     description: The user assigned color of the selected category
//     type: int
//     required: true
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
		log.Printf("Unable to retrieve categories. error: +%v", err)
		rw.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(rw).Encode(err)
		return

	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	json.NewEncoder(rw).Encode(categoryID)
}
