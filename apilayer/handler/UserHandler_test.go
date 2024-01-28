package handler

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/mohit2530/communityCare/db"
	"github.com/mohit2530/communityCare/model"
	"github.com/stretchr/testify/assert"
)

func Test_GetSignInApi(t *testing.T) {

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
