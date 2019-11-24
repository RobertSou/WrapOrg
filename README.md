# WrapOrg
    TCC Redes de computadores

# Description
    Wraporg is a project that helps ongs and donors to connect easily.

### TODOS: 
    TODO: Add location references points to be used in the API
    TODO: Add QR code

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
    appURI=http://localhost
    servidorURI=192.168.xxx.xxx
    mongodbURI=mongodb://localhost:27017/wraporg
    PORT=80

## Create Upload folders
    ./tmp/uploads