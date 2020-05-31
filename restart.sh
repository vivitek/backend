#!/bin/bash

sudo docker-compose down /home/thmarinho/Delivery/Eip/backend/docker-compose.yml && git pull && sudo docker-compose up --build -d /home/thmarinho/Delivery/Eip/backend/docker-compose.yml
