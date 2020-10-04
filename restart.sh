#!/bin/bash

docker-compose down && git pull && chmod 600 acme.json && docker-compose up --build -d
