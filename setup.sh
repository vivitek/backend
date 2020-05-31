#!/bin/bash

# Init git hooks
sh utils/setup-hooks.sh

# Configure webhook-handler
cat utils/webhook-handler.model.sh | sed "s~{{EXEC_PATH}}~$PWD~" > ./webhook-handler.sh

# Add restart-docker service
cat utils/restart-docker.service | sed "s~{{EXEC_PATH}}~$PWD~" > /tmp/restartDockerService
sudo cp /tmp/restartDockerService /etc/systemd/system/restart-docker.service
sudo chmod 777 /etc/systemd/system/restart-docker.service
