
help:
	@echo "Available commands:"
	@sed -n '/^[a-zA-Z0-9_]*:/s/:.*//p' <Makefile | sort
	@echo
	@echo "Start server with: m server"
	@echo "Then start client with: m client"
	@echo "Then: ./run.sh"

.PHONY: client
client:
	cd client && npm run dev

.PHONY: server
server:
	cd server && npm run start:dev

#importdb:
#	docker exec -i psqlserver psql -h localhost -U postgres --dbname=postgres < db/gensys.ddl
#
#recreatedb: stop deletevol rundb wait importdb
#
#sql:
#	docker exec -i psqlserver psql -h localhost -U postgres --dbname=postgres
#
#pgdump:
#	docker exec -i psqlserver pg_dump -h localhost -U postgres --dbname=postgres
