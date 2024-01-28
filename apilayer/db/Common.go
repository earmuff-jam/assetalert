package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

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

	appEnv := os.Getenv("ENVIRONMENT")
	pool, err := startSqlDb(user, pwd, host, port, appEnv) // appEnv is to just toggle for production
	if err != nil {
		fmt.Printf("unable to ping. error: +%v", err)
		return nil, err
	}
	return pool, nil
}

// PreloadAllTestVariables ...
//
// load environment variables
func PreloadAllTestVariables() {
	err := godotenv.Load(filepath.Join("..", "..", ".env"))
	if err != nil {
		log.Printf("No env file detected. Using os system configuration.")
	}
}

// RetriveTestUser ...
//
// retrieve the test user that can be used to test
func RetriveTestUser(user string, eventID string) error {
	db, err := SetupDB(user)
	if err != nil {
		return err
	}
	defer db.Close()

	sqlStr := `SELECT id FROM community.profiles FETCH FIRST ROW ONLY;`
	_, err = db.Exec(sqlStr, eventID)
	if err != nil {
		log.Printf("unable to delete event ID %+v", eventID)
		return err
	}
	return nil
}

func startSqlDb(user string, pwd string, host string, port string, appEnv string) (*sql.DB, error) {

	psqlStr := fmt.Sprintf("postgres://%s:%s@%s:%s/community?sslmode=disable", user, pwd, host, port)

	// if the env is production, we switch the port but still keep the same user context
	if len(appEnv) != 0 && appEnv == "PRODUCTION" {
		psqlStr = fmt.Sprintf("postgres://%s:%s@%s:%s/community?sslmode=disable", user, pwd, host, port)
	}

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
