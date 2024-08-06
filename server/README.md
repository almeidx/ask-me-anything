1. `go install github.com/jackc/tern/v2@latest`
1. `tern init ./internal/store/pgstore/migrations`
1. `tern new --migrations ./internal/store/pgstore/migrations create_rooms_table`
1. `tern new --migrations ./internal/store/pgstore/migrations create_messages_table`
1. `go run ./cmd/tools/terndotenv/main.go`
1. `sqlc generate -f ./internal/store/pgstore/sqlc.yaml`
1. `go generate ./...`
