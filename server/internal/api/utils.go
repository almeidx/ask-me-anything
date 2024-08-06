package api

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

func sendJSON(w http.ResponseWriter, rawData any) {
	data, _ := json.Marshal(rawData)
	w.Header().Set("Content-Type", "application/json")
	_, _ = w.Write(data)
}

func getRoomIDFromRequest(w http.ResponseWriter, r *http.Request, h apiHandler) (string, uuid.UUID, error) {
	rawRoomId := chi.URLParam(r, "room_id")
	roomId, err := uuid.Parse(rawRoomId)
	if err != nil {
		http.Error(w, "invalid room id", http.StatusBadRequest)
		return "", uuid.Nil, err
	}

	_, err = h.q.GetRoom(r.Context(), roomId)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			http.Error(w, "room not found", http.StatusNotFound)
			return "", uuid.Nil, err
		}

		http.Error(w, "internal server error", http.StatusInternalServerError)
		return "", uuid.Nil, err
	}

	return rawRoomId, roomId, nil
}
