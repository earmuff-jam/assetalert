package handler

import (
	"bytes"
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

func Test_GetNotificationHealthCheck(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/health", nil)
	w := httptest.NewRecorder()
	GetNotificationHealthCheck(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}
	assert.True(t, len(string(data)) <= 69)
	assert.Equal(t, 200, res.StatusCode)
}

func Test_GetAllNotifications(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/profile/0902c692-b8e2-4824-a870-e52f4a0cccf8/notifications", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "0902c692-b8e2-4824-a870-e52f4a0cccf8"})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	GetAllNotifications(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}
	assert.Equal(t, 200, res.StatusCode)
	assert.Greater(t, len(data), 0)
}

func Test_GetAllNotifications_NoID(t *testing.T) {

	req := httptest.NewRequest(http.MethodGet, "/api/v1/profile/0802c692-b8e2-4824-a870-e52f4a0cccf8/notifications", nil)
	req = mux.SetURLVars(req, map[string]string{"id": ""})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	GetAllNotifications(w, req, config.CTO_USER)
	res := w.Result()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}

func Test_GetAllNotifications_WrongID(t *testing.T) {

	req := httptest.NewRequest(http.MethodGet, "/api/v1/profile/0802c692-b8e2-4824-a870-e52f4a0cccf8/notifications", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	GetAllNotifications(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}
	assert.Equal(t, 200, res.StatusCode)
	assert.Greater(t, len(data), 0)
}

func Test_GetAllNotifications_InvalidDBUser(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/profile/0802c692-b8e2-4824-a870-e52f4a0cccf8/notifications", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	GetAllNotifications(w, req, config.CEO_USER)
	res := w.Result()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}

func Test_UpdateSingleNotification(t *testing.T) {

	db.PreloadAllTestVariables()
	draftUserCredentials := model.UserCredentials{
		Email:             "test@gmail.com",
		Role:              "TESTER",
		EncryptedPassword: "1231231",
	}

	_, err := db.RetrieveUser(config.CTO_USER, &draftUserCredentials)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	req := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/api/v1/profile/%s/notifications", draftUserCredentials.ID.String()), nil)
	req = mux.SetURLVars(req, map[string]string{"id": draftUserCredentials.ID.String()})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	GetAllNotifications(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	var draftNotificationList []model.Notification
	err = json.Unmarshal(data, &draftNotificationList)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, 200, res.StatusCode)
	assert.Greater(t, len(draftNotificationList), 1)

	selectedNotification := draftNotificationList[0]
	// can only update the following
	selectedNotification.IsResolved = true
	selectedNotification.IsViewed = true

	// Marshal the draftEvent into JSON bytes
	requestBody, err := json.Marshal(selectedNotification)
	if err != nil {
		t.Errorf("failed to marshal JSON: %v", err)
	}

	req = httptest.NewRequest(http.MethodPut, fmt.Sprintf("/api/v1/profile/%s/notifications/%s", draftUserCredentials.ID.String(), draftNotificationList[0].ID), bytes.NewBuffer(requestBody))
	req = mux.SetURLVars(req, map[string]string{
		"id":             draftUserCredentials.ID.String(),
		"notificationID": draftNotificationList[0].ID})

	w = httptest.NewRecorder()
	UpdateSingleNotification(w, req, config.CTO_USER)
	res = w.Result()
	defer res.Body.Close()
	data, err = io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	var updatedNotification model.Notification
	err = json.Unmarshal(data, &updatedNotification)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, true, updatedNotification.IsResolved)
	assert.Equal(t, true, updatedNotification.IsViewed)
}

func Test_UpdateSingleNotification_WrongUserID(t *testing.T) {
	req := httptest.NewRequest(http.MethodPut, "/api/v1/profile/0802c692-b8e2-4824-a870-e52f4a0cccf8/notifications/0802c692-b8e2-4824-a870-e52f4a0cccf8", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	req = mux.SetURLVars(req, map[string]string{"notificationID": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	UpdateSingleNotification(w, req, config.CTO_USER)
	res := w.Result()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}

func Test_UpdateSingleNotification_NoUserID(t *testing.T) {
	req := httptest.NewRequest(http.MethodPut, "/api/v1/profile/0802c692-b8e2-4824-a870-e52f4a0cccf8/notifications/0802c692-b8e2-4824-a870-e52f4a0cccf8", nil)
	req = mux.SetURLVars(req, map[string]string{"id": ""})
	req = mux.SetURLVars(req, map[string]string{"notificationID": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})

	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	UpdateSingleNotification(w, req, config.CTO_USER)
	res := w.Result()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}

func Test_UpdateSingleNotification_IncorrectUserID(t *testing.T) {
	req := httptest.NewRequest(http.MethodPut, "/api/v1/profile/0802c692-b8e2-4824-a870-e52f4a0cccf8/notifications/0802c692-b8e2-4824-a870-e52f4a0cccf8", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "request"})
	req = mux.SetURLVars(req, map[string]string{"notificationID": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	UpdateSingleNotification(w, req, config.CTO_USER)
	res := w.Result()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}

func Test_UpdateSingleNotification_InvalidDBUser(t *testing.T) {
	req := httptest.NewRequest(http.MethodPut, "/api/v1/profile/0802c692-b8e2-4824-a870-e52f4a0cccf8/notifications/0802c692-b8e2-4824-a870-e52f4a0cccf8", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	req = mux.SetURLVars(req, map[string]string{"notificationID": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})

	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	UpdateSingleNotification(w, req, config.CEO_USER)
	res := w.Result()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}
