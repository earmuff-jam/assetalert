package main

import (
	"log"
	"os"
	"testing"

	"github.com/mohit2530/communityCare/db"
)

const DB_TEST_USER = "community_test"

func TestMain(m *testing.M) {
	testUsersPool, err := db.SetupDB(DB_TEST_USER)
	if err != nil {
		log.Printf("unable to run main unit test. error - %+v", err)
		os.Exit(1)
		return
	}

	testUsersPool.Close()
	os.Exit(m.Run())

}
