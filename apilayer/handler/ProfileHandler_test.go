package handler

import (
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
	"github.com/mohit2530/communityCare/config"
	"github.com/mohit2530/communityCare/db"
	"github.com/mohit2530/communityCare/model"
	"github.com/stretchr/testify/assert"
)

func Test_GetProfileHealthCheck(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/health", nil)
	w := httptest.NewRecorder()
	GetProfileHealthCheck(w, req, config.DB_TEST_USER)
	res := w.Result()
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}
	assert.True(t, len(string(data)) <= 69)
	assert.Equal(t, 200, res.StatusCode)
}

func Test_GetProfileApi(t *testing.T) {

	// profile are automatically derieved from the auth table. due to this, we attempt to create a new user
	draftUserCredentials := model.UserCredentials{
		Email:             "test@gmail.com",
		Role:              "TESTER",
		EncryptedPassword: "123",
	}

	db.PreloadAllTestVariables()

	// if the user exists,
	prevUser, _ := db.RetrieveUser(config.DB_TEST_USER, &draftUserCredentials)
	if len(prevUser.Email) <= 0 {
		selectedUserCred, err := db.SaveUser(config.DB_TEST_USER, &draftUserCredentials)
		if err != nil {
			t.Errorf("expected error to be nil got %v", err)
		}
		// if there was no user, we just say the newly created user is the prevUser
		prevUser.ID = selectedUserCred.ID
	}

	req := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/api/v1/profile/%s", prevUser.ID), nil)
	req = mux.SetURLVars(req, map[string]string{"id": prevUser.ID.String()})
	w := httptest.NewRecorder()
	GetProfile(w, req, config.DB_TEST_USER)
	res := w.Result()
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}
	assert.Equal(t, 200, res.StatusCode)
	assert.Greater(t, len(data), 0)
	t.Logf("response = %+v", string(data))
}
