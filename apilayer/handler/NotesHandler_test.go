package handler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/mohit2530/communityCare/config"
	"github.com/mohit2530/communityCare/db"
	"github.com/mohit2530/communityCare/model"
	"github.com/stretchr/testify/assert"
)

func Test_GetNotes(t *testing.T) {

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

	req := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/api/v1/profile/%s/notes", prevUser.ID), nil)
	req = mux.SetURLVars(req, map[string]string{"id": prevUser.ID.String()})
	w := httptest.NewRecorder()
	GetNotes(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, 200, res.StatusCode)
	assert.Greater(t, len(data), 0)
}

func Test_GetNotes_NoID(t *testing.T) {

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

	req := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/api/v1/profile/%s/notes", prevUser.ID), nil)
	req = mux.SetURLVars(req, map[string]string{"id": ""})
	w := httptest.NewRecorder()
	GetNotes(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	_, err = io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, 400, res.StatusCode)
}

func Test_GetNotes_WrongID(t *testing.T) {

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

	req := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/api/v1/profile/%s/notes", prevUser.ID), nil)
	req = mux.SetURLVars(req, map[string]string{"id": "prevUser.ID.String()"})
	w := httptest.NewRecorder()
	GetNotes(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	_, err = io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, 400, res.StatusCode)
}

func Test_GetNotes_InvalidDBUser(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/profile/0802c692-b8e2-4824-a870-e52f4a0cccf8/notes", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	GetNotes(w, req, config.CEO_USER)
	res := w.Result()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}

func Test_AddNewNote(t *testing.T) {
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

	draftNote := &model.Note{
		Title:          "Test Title",
		Description:    "Test Title description",
		Status:         "archived",
		Color:          "#2a6dbc",
		CreatedBy:      prevUser.ID.String(),
		UpdatedBy:      prevUser.ID.String(),
		SharableGroups: []uuid.UUID{prevUser.ID},
	}
	// Marshal the draftEvent into JSON bytes
	requestBody, err := json.Marshal(draftNote)
	if err != nil {
		t.Errorf("failed to marshal JSON: %v", err)
	}

	req := httptest.NewRequest(http.MethodPost, fmt.Sprintf("/api/v1/profile/%s/notes", prevUser.ID), bytes.NewBuffer(requestBody))
	req = mux.SetURLVars(req, map[string]string{"id": prevUser.ID.String()})
	w := httptest.NewRecorder()
	AddNewNote(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	// cleanup
	var note model.Note
	err = json.Unmarshal(data, &note)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, 200, res.StatusCode)
	assert.Greater(t, len(data), 0)
}

func Test_AddNewNote_NoID(t *testing.T) {

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

	emptyNewNote := model.Note{}
	// Marshal the draftEvent into JSON bytes
	requestBody, err := json.Marshal(emptyNewNote)
	if err != nil {
		t.Errorf("failed to marshal JSON: %v", err)
	}
	req := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/api/v1/profile/%s/notes", prevUser.ID), bytes.NewBuffer(requestBody))
	req = mux.SetURLVars(req, map[string]string{"id": ""})
	w := httptest.NewRecorder()
	AddNewNote(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	_, err = io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, 400, res.StatusCode)
}

func Test_AddNewNote_WrongID(t *testing.T) {

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

	emptyNewNote := model.Note{}
	// Marshal the draftEvent into JSON bytes
	requestBody, err := json.Marshal(emptyNewNote)
	if err != nil {
		t.Errorf("failed to marshal JSON: %v", err)
	}
	req := httptest.NewRequest(http.MethodPost, fmt.Sprintf("/api/v1/profile/%s/notes", prevUser.ID), bytes.NewBuffer(requestBody))
	req = mux.SetURLVars(req, map[string]string{"id": "prevUser.ID.String()"})
	w := httptest.NewRecorder()
	AddNewNote(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	_, err = io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, 500, res.StatusCode)
}

func Test_AddNewNote_InvalidDBUser(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/profile/0802c692-b8e2-4824-a870-e52f4a0cccf8/notes", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	AddNewNote(w, req, config.CEO_USER)
	res := w.Result()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}

func Test_UpdateNote(t *testing.T) {

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

	req := httptest.NewRequest(http.MethodGet, fmt.Sprintf("/api/v1/profile/%s/notes", prevUser.ID), nil)
	req = mux.SetURLVars(req, map[string]string{"id": prevUser.ID.String()})
	w := httptest.NewRecorder()
	GetNotes(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, 200, res.StatusCode)
	assert.Greater(t, len(data), 0)

	var notes []model.Note
	if err := json.Unmarshal(data, &notes); err != nil {
		t.Errorf("Error decoding data. error: %+v", err)
	}

	selectedNote := notes[0]
	assert.Greater(t, len(notes), 1)
	assert.Equal(t, selectedNote.Title, "Test Title")
	assert.Equal(t, selectedNote.Creator, "John Doe")

	selectedNote.Title = "Updated Title"
	// Marshal the draftUpdateEvent into JSON bytes
	updateNoteRequest, err := json.Marshal(selectedNote)
	if err != nil {
		t.Errorf("failed to marshal JSON: %v", err)
	}

	req = httptest.NewRequest(http.MethodPut, fmt.Sprintf("/api/v1/profile/%s/notes", prevUser.ID), bytes.NewBuffer(updateNoteRequest))
	req = mux.SetURLVars(req, map[string]string{"id": prevUser.ID.String()})
	w = httptest.NewRecorder()
	UpdateNote(w, req, config.CTO_USER)
	res = w.Result()
	defer res.Body.Close()
	data, err = io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, 200, res.StatusCode)
	assert.Greater(t, len(data), 0)

	var updatedNote model.Note
	err = json.Unmarshal(data, &updatedNote)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, "Updated Title", updatedNote.Title)

	// cleanup
	db.RemoveNote(config.CTO_USER, updatedNote.ID)
}

func Test_UpdateNote_NoID(t *testing.T) {

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

	emptyNewNote := model.Note{}
	// Marshal the draftEvent into JSON bytes
	requestBody, err := json.Marshal(emptyNewNote)
	if err != nil {
		t.Errorf("failed to marshal JSON: %v", err)
	}
	req := httptest.NewRequest(http.MethodPut, fmt.Sprintf("/api/v1/profile/%s/notes", prevUser.ID), bytes.NewBuffer(requestBody))
	req = mux.SetURLVars(req, map[string]string{"id": ""})
	w := httptest.NewRecorder()
	AddNewNote(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	_, err = io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, 400, res.StatusCode)
}

func Test_UpdateNote_NoUserID(t *testing.T) {

	// profile are automatically derieved from the auth table. due to this, we attempt to create a new user
	draftUserCredentials := model.UserCredentials{
		Email:             "test@gmail.com",
		Role:              "TESTER",
		EncryptedPassword: "1231231",
	}

	db.PreloadAllTestVariables()
	_, err := db.RetrieveUser(config.CTO_USER, &draftUserCredentials)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	emptyNewNote := model.Note{}
	// Marshal the draftEvent into JSON bytes
	requestBody, err := json.Marshal(emptyNewNote)
	if err != nil {
		t.Errorf("failed to marshal JSON: %v", err)
	}
	req := httptest.NewRequest(http.MethodPut, fmt.Sprintf("/api/v1/profile/%s/notes", ""), bytes.NewBuffer(requestBody))
	req = mux.SetURLVars(req, map[string]string{"id": ""})
	w := httptest.NewRecorder()
	UpdateNote(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	_, err = io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, 400, res.StatusCode)
}

func Test_UpdateNote_WrongID(t *testing.T) {

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

	emptyNewNote := model.Note{}
	// Marshal the draftEvent into JSON bytes
	requestBody, err := json.Marshal(emptyNewNote)
	if err != nil {
		t.Errorf("failed to marshal JSON: %v", err)
	}
	req := httptest.NewRequest(http.MethodPut, fmt.Sprintf("/api/v1/profile/%s/notes", prevUser.ID), bytes.NewBuffer(requestBody))
	req = mux.SetURLVars(req, map[string]string{"id": "prevUser.ID.String()"})
	w := httptest.NewRecorder()
	UpdateNote(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	_, err = io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, 500, res.StatusCode)
}

func Test_UpdateNote_InvalidDBUser(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/v1/profile/0802c692-b8e2-4824-a870-e52f4a0cccf8/notes", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	UpdateNote(w, req, config.CEO_USER)
	res := w.Result()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}

func Test_RemoveNote(t *testing.T) {
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

	draftNote := &model.Note{
		Title:       "Kitty Litter",
		Description: "Kitty Litter unit test note description",
		Status:      "ALL",
		CreatedAt:   time.Now(),
		CreatedBy:   prevUser.ID.String(),
		UpdatedAt:   time.Now(),
		UpdatedBy:   prevUser.ID.String(),
	}
	// Marshal the draftEvent into JSON bytes
	requestBody, err := json.Marshal(draftNote)
	if err != nil {
		t.Errorf("failed to marshal JSON: %v", err)
	}

	req := httptest.NewRequest(http.MethodDelete, fmt.Sprintf("/api/v1/profile/%s/notes", prevUser.ID), bytes.NewBuffer(requestBody))
	req = mux.SetURLVars(req, map[string]string{"id": prevUser.ID.String()})
	w := httptest.NewRecorder()
	RemoveNote(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	var removedDraftNote model.Note
	err = json.Unmarshal(data, &removedDraftNote)
	if err != nil {
		t.Errorf("expected error to be nil got %+v", err)
	}

	assert.Equal(t, draftNote.ID, removedDraftNote.ID)
}

func Test_RemoveNote_NoUserID(t *testing.T) {

	db.PreloadAllTestVariables()
	req := httptest.NewRequest(http.MethodDelete, "/api/v1/profile/0802c692-b8e2-4824-a870-e52f4a0cccf8/notes/0802c692-b8e2-4824-a870-e52f4a0cccf8", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	req = mux.SetURLVars(req, map[string]string{"noteID": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	w := httptest.NewRecorder()
	RemoveNote(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	_, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}
	assert.Equal(t, 400, res.StatusCode)
}

func Test_RemoveNote_NoNoteID(t *testing.T) {

	db.PreloadAllTestVariables()
	req := httptest.NewRequest(http.MethodDelete, "/api/v1/profile/0802c692-b8e2-4824-a870-e52f4a0cccf8/notes/0802c692-b8e2-4824-a870-e52f4a0cccf8", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	req = mux.SetURLVars(req, map[string]string{"noteID": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	w := httptest.NewRecorder()
	RemoveNote(w, req, config.CTO_USER)
	res := w.Result()
	defer res.Body.Close()
	_, err := io.ReadAll(res.Body)
	if err != nil {
		t.Errorf("expected error to be nil got %v", err)
	}

	assert.Equal(t, 400, res.StatusCode)
}

func Test_RemoveNote_InvalidDBUser(t *testing.T) {
	req := httptest.NewRequest(http.MethodDelete, "/api/v1/profile/0802c692-b8e2-4824-a870-e52f4a0cccf8/notes/0802c692-b8e2-4824-a870-e52f4a0cccf8", nil)
	req = mux.SetURLVars(req, map[string]string{"id": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	req = mux.SetURLVars(req, map[string]string{"noteID": "0802c692-b8e2-4824-a870-e52f4a0cccf8"})
	w := httptest.NewRecorder()
	db.PreloadAllTestVariables()
	RemoveNote(w, req, config.CEO_USER)
	res := w.Result()

	assert.Equal(t, 400, res.StatusCode)
	assert.Equal(t, "400 Bad Request", res.Status)
}
