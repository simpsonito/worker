## Build the docker image
docker-compose build

## Run in development mode
docker-compose up -d

## Optional
## Watch the logs 
docker logs --follow ts-node-docker

## Stop
docker-compose down

## Stop only one container
sudo docker stop ts-node-docker