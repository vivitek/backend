#!/bin/bash

cd {{EXEC_PATH}} && sudo docker-compose down && git pull && sudo docker-compose up --build -d
