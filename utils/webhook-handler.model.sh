#!/bin/bash

output=""

while [[ $output != "restart" ]]; do
    output=$(sudo cat {{EXEC_PATH}}/restart.log)
    sleep 600
done

echo "" > restart.log
sudo sh {{EXEC_PATH}}/restart.sh
