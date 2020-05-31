#!/bin/bash

output=""

while [[ $output != "restart" ]]; do
    output=$(sudo cat /home/thmarinho/Delivery/Eip/backend/restart.log)
    sleep 600
done

echo "" > restart.log
sudo sh restart.sh
