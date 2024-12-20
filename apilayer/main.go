// # Documentation for the Asset alert api layer.
//
// Scehmes: https
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
	"github.com/mohit2530/communityCare/bucket"
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

// CustomRequestHandler function
//
// wrapper function for all request, response pair
type CustomRequestHandler func(http.ResponseWriter, *http.Request, string)

func main() {

	// load environment variables
	instance := os.Getenv("ENVIRONMENT")
	if instance == "" {
		err := godotenv.Load(filepath.Join("..", ".env"))
		if err != nil {
			log.Printf("No env file detected. Using os system configuration.")
		}
	}

	//	load storage support
	bucket.InitializeStorageAndBucket()

	router := mux.NewRouter()

	// public routes
	router.HandleFunc("/api/v1/signup", handler.Signup).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/v1/signin", handler.Signin).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/v1/isValidEmail", handler.IsValidUserEmail).Methods("POST")
	router.HandleFunc("/api/v1/logout", handler.Logout).Methods("GET", "OPTIONS")

	router.HandleFunc("/api/v1/event/{id}/ws", handler.HandleWebsocket)

	// secure routes
	router.Handle("/api/v1/locations", CustomRequestHandler(handler.GetAllStorageLocations)).Methods(http.MethodGet)

	// summary
	router.Handle("/api/v1/summary", CustomRequestHandler(handler.GetAssetsAndSummary)).Methods(http.MethodGet)

	// categories
	router.Handle("/api/v1/category/items", CustomRequestHandler(handler.GetAllCategoryItems)).Methods(http.MethodGet)
	router.Handle("/api/v1/category/items", CustomRequestHandler(handler.AddItemsInCategory)).Methods(http.MethodPost)
	router.Handle("/api/v1/category/remove/items", CustomRequestHandler(handler.RemoveAssociationFromCategory)).Methods(http.MethodPost)

	router.Handle("/api/v1/categories", CustomRequestHandler(handler.GetAllCategories)).Methods(http.MethodGet)
	router.Handle("/api/v1/category", CustomRequestHandler(handler.GetCategory)).Methods(http.MethodGet)
	router.Handle("/api/v1/category", CustomRequestHandler(handler.CreateCategory)).Methods(http.MethodPost)
	router.Handle("/api/v1/category/{id}", CustomRequestHandler(handler.UpdateCategory)).Methods(http.MethodPut)
	router.Handle("/api/v1/category/{id}", CustomRequestHandler(handler.RemoveCategory)).Methods(http.MethodDelete)

	// maintenance plans
	router.Handle("/api/v1/plans/items", CustomRequestHandler(handler.GetAllMaintenancePlanItems)).Methods(http.MethodGet)
	router.Handle("/api/v1/plans/items", CustomRequestHandler(handler.AddItemsInMaintenancePlan)).Methods(http.MethodPost)
	router.Handle("/api/v1/plan/remove/items", CustomRequestHandler(handler.RemoveAssociationFromMaintenancePlan)).Methods(http.MethodPost)

	router.Handle("/api/v1/maintenance-plans", CustomRequestHandler(handler.GetAllMaintenancePlans)).Methods(http.MethodGet)
	router.Handle("/api/v1/plan", CustomRequestHandler(handler.CreateMaintenancePlan)).Methods(http.MethodPost)
	router.Handle("/api/v1/plan", CustomRequestHandler(handler.GetMaintenancePlan)).Methods(http.MethodGet)
	router.Handle("/api/v1/plan/{id}", CustomRequestHandler(handler.UpdateMaintenancePlan)).Methods(http.MethodPut)
	router.Handle("/api/v1/plan/{id}", CustomRequestHandler(handler.RemoveMaintenancePlan)).Methods(http.MethodDelete)

	// profile
	router.Handle("/api/v1/profile/list", CustomRequestHandler(handler.GetAllUserProfiles)).Methods(http.MethodGet)
	router.Handle("/api/v1/profile/{id}", CustomRequestHandler(handler.GetProfile)).Methods(http.MethodGet)
	router.Handle("/api/v1/profile/{id}/stats", CustomRequestHandler(handler.GetProfileStats)).Methods(http.MethodGet)
	router.Handle("/api/v1/profile/{id}/notifications", CustomRequestHandler(handler.GetNotifications)).Methods(http.MethodGet)
	router.Handle("/api/v1/profile/{id}/notifications", CustomRequestHandler(handler.UpdateSelectedMaintenanceNotification)).Methods(http.MethodPut)
	router.Handle("/api/v1/profile/{id}/recent-activities", CustomRequestHandler(handler.GetRecentActivities)).Methods(http.MethodGet)
	router.Handle("/api/v1/profile/{id}", CustomRequestHandler(handler.UpdateProfile)).Methods(http.MethodPut)
	router.Handle("/api/v1/profile/{id}/username", CustomRequestHandler(handler.GetUsername)).Methods(http.MethodGet)

	// image
	router.Handle("/api/v1/{id}/uploadImage", CustomRequestHandler(handler.UploadImage)).Methods(http.MethodPost)
	router.Handle("/api/v1/{id}/fetchImage", CustomRequestHandler(handler.FetchImage)).Methods(http.MethodGet)

	// inventories
	router.Handle("/api/v1/profile/{id}/inventories", CustomRequestHandler(handler.GetAllInventories)).Methods(http.MethodGet)
	router.Handle("/api/v1/profile/{id}/inventories/{invID}", CustomRequestHandler(handler.GetInventoryByID)).Methods(http.MethodGet)
	router.Handle("/api/v1/profile/{id}/inventories/{asssetID}", CustomRequestHandler(handler.UpdateAssetColumn)).Methods(http.MethodPut)

	router.Handle("/api/v1/profile/{id}/inventories", CustomRequestHandler(handler.AddNewInventory)).Methods(http.MethodPost)
	router.Handle("/api/v1/profile/{id}/inventories/bulk", CustomRequestHandler(handler.AddInventoryInBulk)).Methods(http.MethodPost)
	router.Handle("/api/v1/profile/{id}/inventories", CustomRequestHandler(handler.UpdateSelectedInventory)).Methods(http.MethodPut)
	router.Handle("/api/v1/profile/{id}/inventories/prune", CustomRequestHandler(handler.RemoveSelectedInventory)).Methods(http.MethodPost)

	router.Handle("/api/v1/profile/{id}/fav", CustomRequestHandler(handler.GetFavouriteItems)).Methods(http.MethodGet)
	router.Handle("/api/v1/profile/{id}/fav", CustomRequestHandler(handler.SaveFavItem)).Methods(http.MethodPost)
	router.Handle("/api/v1/profile/{id}/fav", CustomRequestHandler(handler.RemoveFavItem)).Methods(http.MethodDelete)

	// notes
	router.Handle("/api/v1/profile/{id}/notes", CustomRequestHandler(handler.GetNotes)).Methods(http.MethodGet)
	router.Handle("/api/v1/profile/{id}/notes", CustomRequestHandler(handler.AddNewNote)).Methods(http.MethodPost)
	router.Handle("/api/v1/profile/{id}/notes", CustomRequestHandler(handler.UpdateNote)).Methods(http.MethodPut)
	router.Handle("/api/v1/profile/{id}/notes/{noteID}", CustomRequestHandler(handler.RemoveNote)).Methods(http.MethodDelete)

	// reports
	router.Handle("/api/v1/reports/{id}", CustomRequestHandler(handler.GetReports)).Methods(http.MethodGet)

	cors := handlers.CORS(
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization", "Authorization2"}),
		handlers.AllowedMethods([]string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete}),
		handlers.AllowCredentials(),
		handlers.AllowedOrigins([]string{"http://localhost", "http://localhost:5173", "http://localhost:5173", "http://localhost:8081"}),
		handlers.ExposedHeaders([]string{"Authorization2", "Role2"}),
	)

	http.Handle("/", cors(router))

	log.Println("Api is up and running ...")
	err := http.ListenAndServe(":8087", nil)
	if err != nil {
		log.Printf("failed to start the server. error: %+v", err)
		return
	}
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
