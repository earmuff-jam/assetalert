package handler

import (
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
	"github.com/mohit2530/communityCare/config"
	"github.com/mohit2530/communityCare/db"
	"github.com/stretchr/testify/assert"
)

func Test_GetEventHealthCheck(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/health", nil)
	w := httptest.NewRecorder()
	GetEventHealthCheck(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}
	assert.True(t, len(string(data)) <= 69)
	assert.Equal(t, 200, res.StatusCode)
}

func Test_GetAllEventReports_WrongItemID(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/report/0802c692-b8e2-4824-a870-e52f4a0cccf8", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	GetAllEventReports(w, req, config.CTO_USER)
	res := w.Result()

	assert.Equal(t, 200, res.StatusCode)
	assert.Equal(t, "200 OK", res.Status)
}

func Test_GetAllEventReports_NoItemID(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/report/0902c692-b8e2-4824-a870-e52f4a0cccf8", nil)
	req = mux.SetURLVars(req, map[string]string{"id": ""})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	GetAllEventReports(w, req, config.CTO_USER)
	res := w.Result()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}

func Test_GetAllEventReports_IncorrectItemID(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/report/0902c692-b8e2-4824-a870-e52f4a0cccf8", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "request"})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	GetAllEventReports(w, req, config.CTO_USER)
	res := w.Result()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}

func Test_GetAllEventReports_InvalidDBUser(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/report/0902c692-b8e2-4824-a870-e52f4a0cccf8", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	GetAllEventReports(w, req, config.CEO_USER)
	res := w.Result()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}

func Test_GetAllStorageLocations(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/locations", nil)
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	GetAllStorageLocations(w, req, config.CTO_USER)
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
	GetAllStorageLocations(w, req, config.CEO_USER)
	res = w.Result()
	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}
