# Mainframe

[![Build Status](https://travis-ci.com/vivitek/backend.svg?branch=master)](https://travis-ci.com/vivitek/backend)
[![codecov](https://codecov.io/gh/vivitek/backend/branch/master/graph/badge.svg)](https://codecov.io/gh/vivitek/backend)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b49ce173f43e49e89951935ef9a868a4)](https://www.codacy.com/gh/vivitek/backend?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=vivitek/backend&amp;utm_campaign=Badge_Grade)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Discord](https://img.shields.io/discord/827167614018650152)](https://discord.gg/SMYDdZfPG6)

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

![Join us on Discord](https://invidget.switchblade.xyz/SMYDdZfPG6)

---

## What

This repository contains the code for [Vincipit](https://vincipit.com)'s backend. It is build to support the federation of all of Vincipit's devices, wherever they may be

---

## How

The entire project is containerized using [Docker Compose](https://docs.docker.com/compose/). To run it, simply type

The tech stack is:

- MongoDB (the main database)
- NestJS (API framework) + GraphQL
- Traefik (Network Proxy)
- InfluxDB (Analytics collection from Traefik)
- Grafana (Analytics data-viz using InfluxDB)

---

## Run Your Own!

Running an instance of this repository is quite simple

- Clone it `git clone git@git.github.com/vivitek/backend.git`
- Add a `DOMAIN` key with the base domain you want your instance to use (for example vivi.local) to the `.env`
- `docker-compose up -d`

And you're all set!