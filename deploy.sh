#!/bin/bash
git pull
# Generating JSON GraphQL Schema
docker run -it --rm --env-file .env -v $PWD/backend:/app -w /app ruby bash -c "bundle install && rails graphql:schema:dump"
# Transform GraphQL Schema to JS files
docker run -it --rm -v $PWD:/app -w /app/frontend node:10 bash -c "yarn install && yarn relay"

# Launching services with production docker-compose
docker-compose -f docker-compose.yml -f docker-compose.production.yml up --build -d
