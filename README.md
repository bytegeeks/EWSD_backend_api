# EWSD_backend_api
backend api endpoints for the ewsd

development setup

### 1. Install node modules
```bash
npm install
```

### 2. run mongodb server with docker
```bash
docker-compose -f mongo-docker-compose.yml up -d
```

### 3. run the API server
```bash 
npm run serve
```
### connect to the mongodb server with mongodb compass
### create a collection user in ewsd_db, and import the user.json file to seed user data
