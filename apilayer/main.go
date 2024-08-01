// Package Mashed Api Layer
//
// # Documentation for the mashed api layer.
//
// Scehmes: http
// BasePath: /
// Version: 1.0.0
//
// Consumes:
// - application/json
//
// Produces:
// - application/json
//
// swagger:meta
package main

import (
	"log"
	"net/http"
	"os"
	"os/user"
	"path/filepath"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/mohit2530/communityCare/db"
	"github.com/mohit2530/communityCare/handler"
)

// MessageResponse ...
// swagger:model MessageResponse
//
// MessageResponse struct
type MessageResponse struct {
	Message string
}

type CustomRequestHandler func(http.ResponseWriter, *http.Request, string)

func main() {

	// load environment variables
	err := godotenv.Load(filepath.Join("..", ".env"))
	if err != nil {
		log.Printf("No env file detected. Using os system configuration.")
	}
	router := mux.NewRouter()

	// these routes are treated as they are public routes
	router.HandleFunc("/api/v1/signup", handler.Signup).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/v1/signin", handler.Signin).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/v1/logout", handler.Logout).Methods("GET", "OPTIONS")

	router.HandleFunc("/api/v1/event/{id}/ws", handler.HandleWebsocket)

	// routes below here are treated as they are secure routes

	// storage locations
	router.Handle("/api/v1/locations/health", CustomRequestHandler(handler.GetStorageLocationHealthCheck)).Methods(http.MethodGet)
	router.Handle("/api/v1/locations", CustomRequestHandler(handler.GetAllStorageLocations)).Methods(http.MethodGet)

	// categories
	router.Handle("/api/v1/categories", CustomRequestHandler(handler.GetAllCategories)).Methods(http.MethodGet)
	router.Handle("/api/v1/category/{id}", CustomRequestHandler(handler.RemoveCategory)).Methods(http.MethodDelete)
	router.Handle("/api/v1/category", CustomRequestHandler(handler.CreateCategory)).Methods(http.MethodPost)
	router.Handle("/api/v1/category/{id}", CustomRequestHandler(handler.UpdateCategory)).Methods(http.MethodPut)

	// profile
	router.Handle("/api/v1/profile/list", CustomRequestHandler(handler.GetAllUserProfiles)).Methods(http.MethodGet)
	router.Handle("/api/v1/profile/{id}", CustomRequestHandler(handler.GetProfile)).Methods(http.MethodGet)
	router.Handle("/api/v1/profile/{id}", CustomRequestHandler(handler.UpdateProfile)).Methods(http.MethodPut)
	router.Handle("/api/v1/profile/{id}/username", CustomRequestHandler(handler.GetUsername)).Methods(http.MethodGet)
	router.Handle("/api/v1/profile/{id}/updateAvatar", CustomRequestHandler(handler.UpdateProfileAvatar)).Methods(http.MethodPost)

	// inventories
	router.Handle("/api/v1/profile/{id}/inventories", CustomRequestHandler(handler.GetAllInventories)).Methods(http.MethodGet)
	router.Handle("/api/v1/profile/{id}/inventories/{invID}", CustomRequestHandler(handler.GetInventoryByID)).Methods(http.MethodGet)
	router.Handle("/api/v1/profile/{id}/inventories", CustomRequestHandler(handler.AddNewInventory)).Methods(http.MethodPost)
	router.Handle("/api/v1/profile/{id}/inventories/bulk", CustomRequestHandler(handler.AddInventoryInBulk)).Methods(http.MethodPost)
	router.Handle("/api/v1/profile/{id}/inventories", CustomRequestHandler(handler.UpdateSelectedInventory)).Methods(http.MethodPut)
	router.Handle("/api/v1/profile/{id}/inventories/prune", CustomRequestHandler(handler.RemoveSelectedInventory)).Methods(http.MethodPost)

	// notes
	router.Handle("/api/v1/profile/{id}/notes", CustomRequestHandler(handler.GetUserNotesDetails)).Methods(http.MethodGet)
	router.Handle("/api/v1/profile/{id}/notes", CustomRequestHandler(handler.AddNewNote)).Methods(http.MethodPost)
	router.Handle("/api/v1/profile/{id}/notes", CustomRequestHandler(handler.UpdateNote)).Methods(http.MethodPut)
	router.Handle("/api/v1/profile/{id}/notes/{noteID}", CustomRequestHandler(handler.RemoveSelectedNote)).Methods(http.MethodDelete)

	cors := handlers.CORS(
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization", "Authorization2"}),
		handlers.AllowedMethods([]string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete}),
		handlers.AllowCredentials(),
		handlers.AllowedOrigins([]string{"http://localhost", "http://localhost:5173", "http://localhost:5173", "http://localhost:8081"}),
		handlers.ExposedHeaders([]string{"Authorization2", "Role2"}),
	)

	http.Handle("/", cors(router))

	log.Println("Api is up and running ...")
	http.ListenAndServe(":8087", nil)

}

// ServerHTTP is a wrapper function to derieve the user authentication.
// It also serves as a method to validate incomming requests and refresh token if necessary.
func (u CustomRequestHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	cookie := r.Header.Get("authorization2")
	if len(cookie) <= 0 {
		log.Printf("missing license key")
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	currentUser := validateCredsWithAuthorizedDbUser()
	isValid, err := validateJwtTokenWithUser(currentUser, cookie)
	if err != nil {
		log.Printf("failed to validate token. error: %+v", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	if isValid {
		u(w, r, currentUser)
	} else {
		// no token || invalid token
		http.Error(w, "Internal Server Error.", http.StatusUnauthorized)
		return
	}
}

// validateCredsWithAuthorizedDbUser ...
func validateCredsWithAuthorizedDbUser() string {
	currentUser := os.Getenv("CLIENT_USER")
	if len(currentUser) == 0 {
		user, _ := user.Current()
		log.Printf("unable to retrieve user from env. Using user - %s", user.Username)
		currentUser = user.Username
	}
	return currentUser
}

// validateJWTWithUserCredentials ...
//
// to validate the user jwt token. the cookie string is the unique id for the oauth table
func validateJwtTokenWithUser(currentUser string, cookie string) (bool, error) {
	err := db.ValidateCredentials(currentUser, cookie)
	if err != nil {
		return false, err
	}
	return true, nil

}
