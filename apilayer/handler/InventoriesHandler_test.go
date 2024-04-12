package handler

import (
	"encoding/json"
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

func Test_GetAllInventories(t *testing.T) {

	// profile are automatically derieved from the auth table. due to this, we attempt to create a new user
	draftUserCredentials := model.UserCredentials{
		Email:             "test@gmail.com",
		Role:              "TESTER",
		EncryptedPassword: "1231231",
	}

	db.PreloadAllTestVariables()
	prevUser, err := db.RetrieveUser(config.CTO_USER, &draftUserCredentials)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	req := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/api/v1/profile/%s/inventories", prevUser.ID), nil)
	req = mux.SetURLVars(req, map[string]string{"id": prevUser.ID.String()})
	w := httptest.NewRecorder()
	GetAllInventories(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, 200, res.StatusCode)
	assert.Greater(t, len(data), 0)
}

func Test_GetAllInventories_WrongUserID(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/profile/0802c692-b8e2-4824-a870-e52f4a0cccf8/inventories", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	GetAllInventories(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}
	assert.Equal(t, 200, res.StatusCode)

	var foundInventories []model.Inventory
	err = json.Unmarshal(data, &foundInventories)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}
	assert.Equal(t, 0, len(foundInventories)) // empty inventory list
}

func Test_GetAllInventories_NoUserID(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/profile/0802c692-b8e2-4824-a870-e52f4a0cccf8/inventories", nil)
	req = mux.SetURLVars(req, map[string]string{"id": ""})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	GetAllInventories(w, req, config.CTO_USER)
	res := w.Result()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}

func Test_GetAllInventories_IncorrectUserID(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/profile/0802c692-b8e2-4824-a870-e52f4a0cccf8/inventories", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "request"})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	GetAllInventories(w, req, config.CTO_USER)
	res := w.Result()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}

func Test_GetAllInventories_InvalidDBUser(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/profile/0802c692-b8e2-4824-a870-e52f4a0cccf8/inventories", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	GetAllInventories(w, req, config.CEO_USER)
	res := w.Result()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}

func Test_AddInventoryInBulk(t *testing.T) {

}

func Test_AddNewInventory(t *testing.T) {

}

func Test_UpdateSelectedInventory(t *testing.T) {

}

func Test_RemoveSelectedInventory(t *testing.T) {

}
