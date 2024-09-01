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

func Test_Signin_Success(t *testing.T) {

	draftUserCredentials := model.UserCredentials{
		Email:             "test@gmail.com",
		Role:              "TESTER",
		EncryptedPassword: "1231231",
	}
	requestBody, err := json.Marshal(draftUserCredentials)
	if err != nil {
		t.Errorf("failed to marshall JSON: error: %+v", err)
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
}

func Test_Signin_Failure(t *testing.T) {

	draftUserCredentials := model.UserCredentials{}
	requestBody, err := json.Marshal(draftUserCredentials)
	if err != nil {
		t.Errorf("failed to marshall JSON: error: %+v", err)
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

func Test_Signup_Success(t *testing.T) {

	id := uuid.New()

	draftUserCredentials := model.UserCredentials{
		Email:             fmt.Sprintf("test%s@gmail.com", id),
		Role:              "TESTER",
		EncryptedPassword: id.String(),
		Birthday:          "2009-01-01",
	}
	requestBody, err := json.Marshal(draftUserCredentials)
	if err != nil {
		t.Errorf("failed to marshall JSON: error: %+v", err)
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

	db.RemoveUser(config.CTO_USER, user.ID)
}

func Test_Signup_Failure(t *testing.T) {
	draftUserCredentials := model.UserCredentials{}
	requestBody, err := json.Marshal(draftUserCredentials)
	if err != nil {
		t.Errorf("failed to marshall JSON: error: %+v", err)
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

	draftUserCredentials := model.UserCredentials{}
	requestBody, err := json.Marshal(draftUserCredentials)
	if err != nil {
		t.Errorf("failed to marshall JSON: error: %+v", err)
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

func Test_UserVerification_Success(t *testing.T) {

	draftUserVerification := &model.VerifyUserRequest{
		Email:    "test@gmail.com",
		Birthday: "2010-01-01",
	}
	requestBody, err := json.Marshal(draftUserVerification)
	if err != nil {
		t.Errorf("failed to marshall JSON: error: %+v", err)
	}

	db.PreloadAllTestVariables()

	req := httptest.NewRequest(http.MethodPost, "/api/v1/user/verification", bytes.NewBuffer(requestBody))
	w := httptest.NewRecorder()
	UserVerification(w, req)
	res := w.Result()
	defer res.Body.Close()

	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	var verifyUserResp = &model.VerifyUserResponse{}
	err = json.Unmarshal(data, &verifyUserResp)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, 200, res.StatusCode)
	assert.Equal(t, "200 OK", res.Status)
	assert.Equal(t, verifyUserResp.IsUserValid, true)
	assert.LessOrEqual(t, verifyUserResp.RetryAttempts, 3)
	assert.Equal(t, len(verifyUserResp.SecurityQuestionList), 4)
}

func Test_UserVerification_Failure(t *testing.T) {

	draftUserVerification := &model.VerifyUserRequest{
		Email:    "test@gmail.com",
		Birthday: "2010-01-02",
	}
	requestBody, err := json.Marshal(draftUserVerification)
	if err != nil {
		t.Errorf("failed to marshall JSON: error: %+v", err)
	}

	db.PreloadAllTestVariables()

	req := httptest.NewRequest(http.MethodPost, "/api/v1/user/verification", bytes.NewBuffer(requestBody))
	w := httptest.NewRecorder()
	UserVerification(w, req)
	res := w.Result()
	defer res.Body.Close()

	assert.Equal(t, 400, res.StatusCode)

	draftUserVerification = &model.VerifyUserRequest{
		Email: "test@gmail.com",
	}
	requestBody, err = json.Marshal(draftUserVerification)
	if err != nil {
		t.Errorf("failed to marshall JSON: error: %+v", err)
	}

	req = httptest.NewRequest(http.MethodPost, "/api/v1/user/verification", bytes.NewBuffer(requestBody))
	w = httptest.NewRecorder()
	UserVerification(w, req)
	res = w.Result()
	defer res.Body.Close()

	assert.Equal(t, 400, res.StatusCode)

	draftUserVerification = &model.VerifyUserRequest{}
	requestBody, err = json.Marshal(draftUserVerification)
	if err != nil {
		t.Errorf("failed to marshall JSON: error: %+v", err)
	}

	req = httptest.NewRequest(http.MethodPost, "/api/v1/user/verification", bytes.NewBuffer(requestBody))
	w = httptest.NewRecorder()
	UserVerification(w, req)
	res = w.Result()
	defer res.Body.Close()

	assert.Equal(t, 400, res.StatusCode)
}
