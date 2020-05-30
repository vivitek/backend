#!/bin/bash

output=""

while [[ $output != "restart" ]]; do
    output=$(sudo cat restart.log)
    sleep 1
done

echo "" > restart.log
sudo sh restart.sh
