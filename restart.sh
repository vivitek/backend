#!/bin/bash

docker-compose down && git pull && sudo docker-compose up --build -d
