package handler

import (
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/mohit2530/communityCare/config"
	"github.com/mohit2530/communityCare/db"
	"github.com/mohit2530/communityCare/model"
	"github.com/stretchr/testify/assert"
)

func Test_GetStatusesListHealthCheck(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/health", nil)
	w := httptest.NewRecorder()
	GetStatusesListHealthCheck(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}
	assert.True(t, len(string(data)) <= 69)
	assert.Equal(t, 200, res.StatusCode)
}

func Test_GetStatusList(t *testing.T) {
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

	req := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/api/v1/status/list?id=%s", prevUser.ID), nil)
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	GetStatusList(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}
	assert.Equal(t, 200, res.StatusCode)
	assert.Greater(t, len(data), 0)
	t.Logf("response = %+v", string(data))

	w = httptest.NewRecorder()
	GetStatusList(w, req, config.CEO_USER)
	res = w.Result()
	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}
