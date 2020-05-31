#!/bin/bash

output=""

while true; do
    while [[ $output != "restart" ]]; do
        output=$(sudo cat {{EXEC_PATH}}/restart.log)
        sleep 60
    done

    echo "" > {{EXEC_PATH}}/restart.log
    sudo sh {{EXEC_PATH}}/restart.sh
done
