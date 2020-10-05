# Mainframe

[![Build Status](https://travis-ci.com/vivitek/backend.svg?branch=master)](https://travis-ci.com/vivitek/backend)
[![codecov](https://codecov.io/gh/vivitek/backend/branch/master/graph/badge.svg)](https://codecov.io/gh/vivitek/backend)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b49ce173f43e49e89951935ef9a868a4)](https://www.codacy.com/gh/vivitek/backend?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=vivitek/backend&amp;utm_campaign=Badge_Grade)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)


## the all-knowing service for configurating your router

---

## What

This is the brain of [Vincipit](https://vincipit.com), where all the important decisions happen. It is used as the medium to communicate with all dashboards and routers. It is built with toughts towards scalability and reduced load

---

## How

The entire project is containerized using [Docker Compose](https://docs.docker.com/compose/). To run it, simply type

```sh
docker-compose build
docker-compose up -d
```

This will spawn a series of containers including :

- A MongoDB instance with data persistency
- A RabbitMQ instance
- The actual API

---

## Features

- User creation
  - [x] create a user
  - [x] sign in a user
  - [ ] basic user fonctionnalities (password reset etc...)
- Router association
  - [ ] create a router (i.e insert his id and link it to the current user's account)
  - [x] allow or deny user connection based on user's input
  - [x] see the router logs
- Configurations creation
  - [ ] determine which services are allowed to pass through
  - [ ] determine how much bandwith to allocate to each service
- Realtime events between server and dashboard
  - [x] Sending connection requests from server to dashboard
  - [ ] Accepting response for connection requests from dashboard to server
  - [ ] Sending service connections from server to dashboard
  - [ ] Accepting response for services requests from dashboard to server
---
