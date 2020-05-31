#!/bin/bash

# Init git hooks
#sh utils/setup-hooks.sh

# Configure restart.sh
cat utils/restart.model.sh | sed "s~{{EXEC_PATH}}~$PWD~" > ./restart.sh
chmod 777 ./restart.sh

# Configure webhook-handler
cat utils/webhook-handler.model.sh | sed "s~{{EXEC_PATH}}~$PWD~" > ./webhook-handler.sh
chmod 777 ./webhook-handler.sh

# Add restart-docker service
cat utils/restart-docker.service | sed "s~{{EXEC_PATH}}~$PWD~" > /tmp/restartDockerService
sudo cp /tmp/restartDockerService /etc/systemd/system/restart-docker.service
sudo chmod 777 /etc/systemd/system/restart-docker.service
