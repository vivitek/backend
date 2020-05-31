#!/bin/bash

output=""

while [[ $output != "restart" ]]; do
    output=$(sudo cat {{EXEC_PATH}}/restart.log)
    sleep 60
done

echo "" > restart.log
sudo sh {{EXEC_PATH}}/restart.sh
