package handler

import (
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
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

// HandleWebsocket ...
func HandleWebsocket(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"] // Extract 'id' from the URL path

	// Upgrade HTTP connection to WebSocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error upgrading to WebSocket:", err)
		return
	}
	defer conn.Close()

	connLock.Lock()
	connections[conn] = true
	connLock.Unlock()

	log.Printf("WebSocket connection established for ID: %s\n", id)

	/// Handle WebSocket connection for the specified 'id'
	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error reading message:", err)
			break
		}
		log.Printf("Received message from %s: %s\n", id, message)

		// Broadcast the received message to all connected clients
		connLock.Lock()
		for conn := range connections {
			err = conn.WriteMessage(messageType, message)
			if err != nil {
				log.Println("Error writing message:", err)
				conn.Close()
				delete(connections, conn)
			}
		}
		connLock.Unlock()
	}
}
