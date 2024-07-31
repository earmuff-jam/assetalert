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

func Test_GetAllCategories(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/categories?id=0802c692-b8e2-4824-a870-e52f4a0cccf8&limit=5", nil)
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	GetAllCategories(w, req, config.CTO_USER)
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
	GetAllCategories(w, req, config.CEO_USER)
	res = w.Result()
	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}

func Test_RemoveCategory(t *testing.T) {
	req := httptest.NewRequest(http.MethodDelete, "/api/v1/category/0802c692-b8e2-4824-a870-e52f4a0cccf8", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	RemoveCategory(w, req, config.CTO_USER)
	res := w.Result()

	assert.Equal(t, 200, res.StatusCode)
	assert.Equal(t, "200 OK", res.Status)
}
