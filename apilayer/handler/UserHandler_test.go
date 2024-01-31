package handler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/google/uuid"
	"github.com/mohit2530/communityCare/config"
	"github.com/mohit2530/communityCare/db"
	"github.com/mohit2530/communityCare/model"
	"github.com/stretchr/testify/assert"
)

func Test_GetSignInApi_Success(t *testing.T) {

	// profiles are derieved from sign in
	draftUserCredentials := model.UserCredentials{
		Email:             "test@gmail.com",
		Role:              "TESTER",
		EncryptedPassword: "1231231",
	}

	// Marshal the draftEvent into JSON bytes
	requestBody, err := json.Marshal(draftUserCredentials)
	if err != nil {
		t.Errorf("failed to marshal JSON: %v", err)
	}

	db.PreloadAllTestVariables()
	req := httptest.NewRequest(http.MethodGet, "/api/v1/sigin", bytes.NewBuffer(requestBody))
	w := httptest.NewRecorder()
	Signin(w, req)
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

func Test_GetSignInApi_Failure(t *testing.T) {

	draftUserCredentials := model.UserCredentials{}

	// Marshal the draftEvent into JSON bytes
	requestBody, err := json.Marshal(draftUserCredentials)
	if err != nil {
		t.Errorf("failed to marshal JSON: %v", err)
	}

	db.PreloadAllTestVariables()
	req := httptest.NewRequest(http.MethodGet, "/api/v1/sigin", bytes.NewBuffer(requestBody))
	w := httptest.NewRecorder()
	Signin(w, req)
	res := w.Result()
	defer res.Body.Close()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}

func Test_GetSignUpApi_Success(t *testing.T) {

	id := uuid.New()

	// profiles are derieved from sign in
	draftUserCredentials := model.UserCredentials{
		Email:             fmt.Sprintf("test%s@gmail.com", id),
		Role:              "TESTER",
		EncryptedPassword: id.String(),
		Birthday:          "2009-01-01",
	}

	// Marshal the draftEvent into JSON bytes
	requestBody, err := json.Marshal(draftUserCredentials)
	if err != nil {
		t.Errorf("failed to marshal JSON: %v", err)
	}

	db.PreloadAllTestVariables()
	req := httptest.NewRequest(http.MethodGet, "/api/v1/signup", bytes.NewBuffer(requestBody))
	w := httptest.NewRecorder()
	Signup(w, req)
	res := w.Result()
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	var user model.UserCredentials
	err = json.Unmarshal(data, &user)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, 200, res.StatusCode)
	assert.Greater(t, len(data), 0)
	t.Logf("response = %+v", string(data))

	db.RemoveUser(config.CTO_USER, user.ID)
}

func Test_GetSignUpApi_Failure(t *testing.T) {
	// profiles are derieved from sign in
	draftUserCredentials := model.UserCredentials{}

	// Marshal the draftEvent into JSON bytes
	requestBody, err := json.Marshal(draftUserCredentials)
	if err != nil {
		t.Errorf("failed to marshal JSON: %v", err)
	}
	db.PreloadAllTestVariables()
	req := httptest.NewRequest(http.MethodGet, "/api/v1/signup", bytes.NewBuffer(requestBody))
	w := httptest.NewRecorder()
	Signup(w, req)
	res := w.Result()
	defer res.Body.Close()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}

func Test_GetLogout(t *testing.T) {
	// profiles are derieved from sign in
	draftUserCredentials := model.UserCredentials{}

	// Marshal the draftEvent into JSON bytes
	requestBody, err := json.Marshal(draftUserCredentials)
	if err != nil {
		t.Errorf("failed to marshal JSON: %v", err)
	}
	db.PreloadAllTestVariables()
	req := httptest.NewRequest(http.MethodGet, "/api/v1/logout", bytes.NewBuffer(requestBody))
	w := httptest.NewRecorder()
	Logout(w, req)
	res := w.Result()
	defer res.Body.Close()

	assert.Equal(t, 200, res.StatusCode)
	assert.Equal(t, "200 OK", res.Status)
}
