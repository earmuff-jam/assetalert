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

	emailAddress := "test@gmail.com"
	// using the same user as test instance
	creatorID, err := GenerateFakeUser(currentUser, emailAddress)
	if err != nil {
		log.Fatalf("error during finding a test user... %+v", err)
	}
	GenerateFakeDataWithLimit(currentUser, 20, "event", creatorID)
	GenerateFakeDataWithLimit(currentUser, 2, "report", creatorID)
	GenerateFakeDataWithLimit(currentUser, 2, "expense", creatorID)
	GenerateFakeDataWithLimit(currentUser, 2, "item", creatorID)
	GenerateFakeDataWithLimit(currentUser, 2, "note", creatorID)
	GenerateFakeDataWithLimit(currentUser, 2, "inventory", creatorID)

}

// GenerateFakeDataWithLimit ...
//
// GenerateFakeDataWithLimit retrieves fake data for mashed application with a limit of rows.
func GenerateFakeDataWithLimit(user string, minCount int, typeOf string, creatorID string) error {

	if minCount <= 0 {
		fmt.Println("unable to add fake data with empty limit")
		return errors.New("unable to add fake data")
	}

	// rowCounts are generated from minCount. this is to generate dynamic information
	rowCounts := gofakeit.Number(minCount, minCount+10)

	switch typeOf {
	case "note":
		log.Printf("loading %d of note rows", rowCounts)
		populateFakePersonalNotes(user, rowCounts, creatorID)
	case "inventory":
		log.Printf("loading %d of inventory rows", rowCounts)
		populateFakePersonalInventories(user, rowCounts, creatorID)
	default:
	}
	return nil
}

// // populateFakeReportDetails ...
// //
// // used to generate fake report for the first eventID
// // generate fake report data to test in the application
// func populateFakeReportDetails(user string, limit int, creatorID string) {

// 	resp, err := db.RetrieveAllEvents(user)
// 	if err != nil {
// 		log.Printf("unable to populate reports without eventID. err %+v", err)
// 		return
// 	}

// 	draftEvent := resp[0]
// 	userGroup := []string{creatorID}

// 	for i := 1; i <= limit; i++ {
// 		draftReport := model.ReportEvent{}

// 		// time is set for created / updated
// 		now := time.Now()
// 		daysAgo := gofakeit.Number(1, 30)
// 		startDate := now.AddDate(0, 0, -daysAgo)

// 		draftReport.Subject = gofakeit.JobTitle()
// 		draftReport.Description = gofakeit.HackerPhrase()
// 		draftReport.EventLocation = gofakeit.Address().Address
// 		draftReport.OrganizerName = gofakeit.Name()
// 		draftReport.EventID = draftEvent.ID
// 		draftReport.CreatedAt = startDate
// 		draftReport.UpdatedAt = startDate
// 		draftReport.CreatedBy = creatorID
// 		draftReport.UpdatedBy = creatorID
// 		draftReport.SharableGroups = userGroup

// 		db.SaveNewReport(user, &draftReport)
// 	}

// }

// populateFakePersonalNotes ...
//
// generate fake item data to test in the application
func populateFakePersonalNotes(user string, limit int, creatorID string) {

	for i := 1; i <= limit; i++ {
		draftNote := model.Note{}

		// time is set for created / updated
		now := time.Now()
		daysAgo := gofakeit.Number(1, 30)
		startDate := now.AddDate(0, 0, -daysAgo)

		draftNote.Title = gofakeit.JobTitle()
		draftNote.Status = gofakeit.JobLevel()
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

// populateFakePersonalInventories ...
//
// generate fake personal inventories data to test in the application
func populateFakePersonalInventories(user string, limit int, creatorID string) {

	for i := 1; i <= limit; i++ {
		draftInventory := model.Inventory{}

		// time is set for created / updated
		now := time.Now()
		daysAgo := gofakeit.Number(1, 30)
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
	if err != nil {
		tx.Rollback()
		return "", err
	}
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
