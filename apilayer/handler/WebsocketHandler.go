package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/mohit2530/communityCare/model"
)

var (
	upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	connections = make(map[*websocket.Conn]bool) // Map to track WebSocket connections
	connLock    sync.Mutex                       // Mutex to safely manage the connections map
)

// broadcastActiveUsersCount sends the current active users count to all connected clients
func broadcastActiveUsersCount() {
	connLock.Lock()
	defer connLock.Unlock()
	activeUsersCount := len(connections)

	for conn := range connections {
		websocketMsg := model.WebsocketMsg{
			ActiveUsersCount: activeUsersCount,
		}
		message, err := json.Marshal(websocketMsg)
		if err != nil {
			log.Println("Error encoding active users count message:", err)
			continue
		}
		err = conn.WriteMessage(websocket.TextMessage, message)
		if err != nil {
			log.Println("Error writing active users count message:", err)
			conn.Close()
			delete(connections, conn)
		}
	}
}

// HandleWebsocket handles WebSocket requests
func HandleWebsocket(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"] // Extract 'id' from the URL path

	// Upgrade HTTP connection to WebSocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error upgrading to WebSocket:", err)
		return
	}
	defer func() {
		connLock.Lock()
		delete(connections, conn)
		connLock.Unlock()
		broadcastActiveUsersCount()
		conn.Close()
	}()

	connLock.Lock()
	connections[conn] = true
	connLock.Unlock()
	broadcastActiveUsersCount()

	log.Printf("WebSocket connection established for ID: %s\n", id)

	// Handle WebSocket connection for the specified 'id'
	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error reading message:", err)
			break
		}
		log.Printf("Received message from %s: %s\n", id, message)

		var websocketMsg model.WebsocketMsg
		err = json.Unmarshal(message, &websocketMsg)
		if err != nil {
			log.Println("Error decoding message:", err)
			break
		}
		websocketMsg.ActiveUsersCount = len(connections)

		formattedMsg, err := json.Marshal(websocketMsg)
		if err != nil {
			log.Println("Error encoding message:", err)
			break
		}

		// Broadcast the received message to all connected clients
		connLock.Lock()
		for conn := range connections {
			err = conn.WriteMessage(messageType, formattedMsg)
			if err != nil {
				log.Println("Error writing message:", err)
				conn.Close()
				delete(connections, conn)
			}
		}
		connLock.Unlock()
	}
}
