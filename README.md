# WrapOrg

TCC Redes de computadores

## Commands Development

docker-compose -f docker-compose.development.yml up --build
sass --watch main.sass:main.css

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

## Development Env

//TODO: Add location references points to be used in the API
//TODO: Add QR code

mongodbURI=mongodb://mongodb:27017/wraporg
mongodbURI=mongodb://localhost:27017/wraporg
PORT=3000
