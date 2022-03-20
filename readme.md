# Worker

## Requirements
You need to have ``docker`` and ``docker-compose`` installed in your system.\
Docker desktop is highly recommended

## How to start
### 1. Create an .env file
Duplicate ``.env.sample`` and rename it to ``.env``
Edit and save your settings

### 2. Build the docker image
```
docker-compose build
```

### 3. Run in development mode (detached)
```
docker-compose up -d
```

## Other useful commands
### Watch the logs 
```
docker logs --follow ts-node-docker
```

### Stop
```
docker-compose down
```

### Stop only one container
```
sudo docker stop ts-node-docker
```

### Run in production mode (detached)
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

### Run tests
```
docker-compose run --rm ts-node-docker npm test
```