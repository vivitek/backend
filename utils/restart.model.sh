#!/bin/bash

sudo docker-compose down {{EXEC_PATH}}/docker-compose.yml && git pull && sudo docker-compose up --build -d {{EXEC_PATH}}/docker-compose.yml
