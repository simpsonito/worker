build:
	docker-compose build

up:
	docker-compose up -d

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

down: 
	docker-compose down

test:
	docker-compose run --rm ts-node-docker npm test
