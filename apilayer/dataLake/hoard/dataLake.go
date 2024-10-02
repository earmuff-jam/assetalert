package hoard

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/brianvoe/gofakeit"
	_ "github.com/lib/pq"
	"github.com/mohit2530/communityCare/db"
	"github.com/mohit2530/communityCare/model"

	"github.com/joho/godotenv"
)

// IngestSvc ...
//
// main function to ingest data from the datalake
func IngestSvc() {

	// load environment variables
	err := godotenv.Load(filepath.Join("..", "..", ".env"))
	if err != nil {
		log.Printf("No env file detected. Using os system configuration.")
	}

	// setupDB
	currentUser := os.Getenv("CLIENT_USER")
	db, err := SetupDB(currentUser)
	if err != nil {
		log.Fatal("Unable to use data lake without a db source")
	}
	defer db.Close()

	emailAddress := "admin@gmail.com"
	// using the same user as test instance
	creatorID, err := GenerateFakeUser(currentUser, emailAddress)
	if err != nil {
		log.Fatalf("error during finding a test user... %+v", err)
	}
	GenerateFakeDataWithLimit(currentUser, 13, "note", creatorID)
	GenerateFakeDataWithLimit(currentUser, 80, "inventory", creatorID)
	GenerateFakeDataWithLimit(currentUser, 23, "category", creatorID)
	GenerateFakeDataWithLimit(currentUser, 14, "maintenance_plan", creatorID)
}

// GenerateFakeDataWithLimit ...
//
// GenerateFakeDataWithLimit retrieves fake data for mashed application with a limit of rows.
func GenerateFakeDataWithLimit(user string, limit int, typeOf string, creatorID string) error {

	if limit <= 0 {
		fmt.Println("unable to add fake data with empty limit")
		return errors.New("unable to add fake data")
	}

	// rowCounts are generated from limit. this is to generate dynamic information
	rowCounts := gofakeit.Number(1, limit)

	switch typeOf {
	case "note":
		log.Printf("loading %d of note rows", rowCounts)
		populateFakeNotes(user, rowCounts, creatorID)
	case "inventory":
		log.Printf("loading %d of inventory rows", rowCounts)
		populateFakeInventories(user, rowCounts, creatorID)
	case "category":
		log.Printf("loading %d of category rows", rowCounts)
		populateFakeCategories(user, rowCounts, creatorID)
	case "maintenance_plan":
		log.Printf("loading %d of maintenance plan rows", rowCounts)
		populateFakeMaintenancePlans(user, rowCounts, creatorID)
	default:
	}
	return nil
}

// populateFakeCategories ...
//
// generate fake category data to test in the application
func populateFakeCategories(user string, limit int, creatorID string) {

	for i := 1; i <= limit; i++ {
		draftCategory := model.Category{}
		// time is set for created / updated
		now := time.Now()
		daysAgo := gofakeit.Number(1, 30)
		startDate := now.AddDate(0, 0, -daysAgo)

		draftCategory.Name = gofakeit.JobTitle()
		draftCategory.Description = gofakeit.HipsterSentence(2)
		draftCategory.Color = gofakeit.RandString([]string{"#ffcc99", "#ff00ff", "#bb5588"})
		draftCategory.MinItemsLimit = gofakeit.Number(1, 10)
		draftCategory.MaxItemsLimit = gofakeit.Number(10, 100)
		draftCategory.Status = "draft"
		draftCategory.CreatedAt = startDate
		draftCategory.UpdatedAt = startDate
		draftCategory.CreatedBy = creatorID
		draftCategory.Creator = gofakeit.FirstName()
		draftCategory.UpdatedBy = creatorID
		draftCategory.Updator = gofakeit.FirstName()
		draftCategory.SharableGroups = []string{creatorID}

		db.CreateCategory(user, &draftCategory)
	}
}

// populateFakeMaintenancePlans ...
//
// generate fake maintenance plan data to test in the application
func populateFakeMaintenancePlans(user string, limit int, creatorID string) {

	for i := 1; i <= limit; i++ {
		draftMaintenancePlan := model.MaintenancePlan{}
		// time is set for created / updated
		now := time.Now()
		daysAgo := gofakeit.Number(1, 30)
		startDate := now.AddDate(0, 0, -daysAgo)

		draftMaintenancePlan.Name = gofakeit.JobTitle()
		draftMaintenancePlan.Description = gofakeit.HipsterSentence(2)
		draftMaintenancePlan.Color = gofakeit.RandString([]string{"#ffcc99", "#ff00ff", "#bb5588"})
		draftMaintenancePlan.MinItemsLimit = gofakeit.Number(1, 10)
		draftMaintenancePlan.MaxItemsLimit = gofakeit.Number(10, 100)
		draftMaintenancePlan.Status = "draft"
		draftMaintenancePlan.PlanType = gofakeit.RandString([]string{"annual", "weekly", "daily"})
		draftMaintenancePlan.PlanDue = startDate
		draftMaintenancePlan.CreatedAt = startDate
		draftMaintenancePlan.UpdatedAt = startDate
		draftMaintenancePlan.CreatedBy = creatorID
		draftMaintenancePlan.Creator = gofakeit.FirstName()
		draftMaintenancePlan.UpdatedBy = creatorID
		draftMaintenancePlan.Updator = gofakeit.FirstName()
		draftMaintenancePlan.SharableGroups = []string{creatorID}

		db.CreateMaintenancePlan(user, &draftMaintenancePlan)
	}
}

// populateFakeNotes ...
//
// generate fake item data to test in the application
func populateFakeNotes(user string, limit int, creatorID string) {

	for i := 1; i <= limit; i++ {
		draftNote := model.Note{}

		// time is set for created / updated
		now := time.Now()
		daysAgo := gofakeit.Number(1, 30)
		startDate := now.AddDate(0, 0, -daysAgo)

		draftNote.Title = gofakeit.JobTitle()
		draftNote.Description = gofakeit.HipsterSentence(2)
		draftNote.CreatedAt = startDate
		draftNote.UpdatedAt = startDate
		draftNote.CreatedBy = creatorID
		draftNote.Creator = gofakeit.FirstName()
		draftNote.UpdatedBy = creatorID
		draftNote.Updator = gofakeit.FirstName()

		db.AddNewNote(user, creatorID, draftNote)
	}
}

// populateFakeInventories ...
//
// generate fake personal inventories data to test in the application
func populateFakeInventories(user string, limit int, creatorID string) {

	for i := 1; i <= limit; i++ {
		draftInventory := model.Inventory{}

		// time is set for created / updated
		now := time.Now()
		daysAgo := gofakeit.Number(1, 90)
		startDate := now.AddDate(0, 0, -daysAgo)
		isReturnableStatus := gofakeit.Bool()

		draftInventory.Name = gofakeit.BeerName()
		draftInventory.Description = gofakeit.HipsterSentence(gofakeit.Number(2, 5))
		draftInventory.Price = gofakeit.Price(2, 120)
		draftInventory.Status = gofakeit.RandString([]string{"COUPONS", "DRAFT", "HIDDEN", "ALL"})
		draftInventory.Barcode = fmt.Sprintf("%d,%v", gofakeit.Number(2, 20), gofakeit.BeerHop())
		draftInventory.SKU = fmt.Sprintf("%d,%v", gofakeit.Number(2, 20), gofakeit.BeerHop())
		draftInventory.Quantity = gofakeit.Number(10, 100)
		draftInventory.Location = gofakeit.RandString(
			[]string{"Master Bedroom Closet",
				"Garage",
				"Living Room Cabinet",
				"Bathroom Closet",
				"Dining Room Hutch",
				"Home Office Desk",
				"Basement Storage",
				"Kids'' Playroom",
				"Garage Workshop",
				"Guest Bedroom Closet",
				"Outdoor Shed"})
		draftInventory.IsReturnable = isReturnableStatus
		if isReturnableStatus {
			draftInventory.ReturnLocation = gofakeit.CarMaker()
		}
		draftInventory.MaxWeight = fmt.Sprintf("%d", gofakeit.Number(2, 5))
		draftInventory.MinWeight = fmt.Sprintf("%d", gofakeit.Number(2, 2))
		draftInventory.MaxHeight = fmt.Sprintf("%d", gofakeit.Number(2, 5))
		draftInventory.MinHeight = fmt.Sprintf("%d", gofakeit.Number(2, 2))
		draftInventory.CreatedAt = startDate
		draftInventory.UpdatedAt = startDate
		draftInventory.CreatedBy = creatorID
		draftInventory.CreatorName = gofakeit.FirstName()
		draftInventory.UpdatedBy = creatorID
		draftInventory.UpdaterName = gofakeit.FirstName()
		draftInventory.BoughtAt = gofakeit.CarMaker()

		db.AddInventory(user, creatorID, draftInventory)
	}
}

// GenerateFakeUser ...
//
// used to create a fake user for testing and ingest purpose only
func GenerateFakeUser(user string, emailAddress string) (string, error) {
	db, err := SetupDB(user)
	if err != nil {
		return "", err
	}
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		return "", err
	}

	var updatedProfile model.Profile

	sqlStr := `
	UPDATE community.profiles SET 
	username = 'IngestSvcUser',
	full_name = 'John Doe',
	phone_number = '1234567890',
	about_me = 'There is a lot of things that are in the unknown. Explore them'
	WHERE email_address = $1
	RETURNING id;`

	row := tx.QueryRow(sqlStr, emailAddress)
	err = row.Scan(
		&updatedProfile.ID,
	)

	if err != nil {
		tx.Rollback()
		return "", err
	}

	if err := tx.Commit(); err != nil {
		return "", err
	}

	updatedProfile.Validate()
	return updatedProfile.ID.String(), nil
}

// SetupDB ...
//
// function is used to build the db for the data lake
func SetupDB(user string) (*sql.DB, error) {

	pwd := os.Getenv("CLIENT_PASSWORD")
	if len(pwd) == 0 {
		pwd = "password"
	}

	host := os.Getenv("DATABASE_DOCKER_CONTAINER_IP_ADDRESS")
	if len(host) == 0 {
		host = "localhost"
	}

	port := os.Getenv("DATABASE_DOCKER_CONTAINER_PORT")
	if len(port) == 0 {
		port = "5432"
	}

	psqlStr := fmt.Sprintf("postgres://%s:%s@%s:%s/community?sslmode=disable", user, pwd, host, port)
	var db, err = sql.Open("postgres", psqlStr)
	if err != nil {
		log.Fatalf("failed to open postgres db. error: +%v", err)
		return nil, err
	}

	// if the user is unable to ping the db, we don't want to submit the request
	err = db.Ping()
	if err != nil {
		fmt.Printf("unable to ping. error: +%v", err)
		return nil, err
	}
	return db, nil
}
