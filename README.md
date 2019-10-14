# WrapOrg
TCC Redes de computadores

## Commands Development
docker-compose -f docker-compose.development.yml up --build

## Commands Production
docker-compose up
docker-compose build
or/ou docker-compose up --build

## Command install dependencies
docker exec WrapOrg npm install nomeDependence

## Commands Clean build
docker-compose down -v
docker-compose build

## Commands run in background
docker-compose up -d
