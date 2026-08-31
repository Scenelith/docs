---
title: Self-hosting overview
description: Install and operate the complete Scenelith runtime on infrastructure you control.
---

# Self-hosting overview

Scenelith self-hosted is the complete public product runtime. It uses your provider credentials and runs on your server, database and media storage.

## Requirements

- Docker Engine with Docker Compose 2.20.3 or newer;
- 4 CPU cores and 8 GB RAM for a small instance;
- at least 10 GB free disk, with 20 GB or more recommended for media;
- optional Kie and OpenRouter provider keys for generation and Assistant features.

## Install the latest release

```bash
curl -fsSL https://github.com/Scenelith/scenelith/releases/latest/download/install.sh | sh
```

The installer verifies the release archive and its internal manifest, creates `./scenelith`, generates unique private secrets, validates Docker and starts pinned images. Git, Node.js and a source checkout are not required.

Add only the provider keys you plan to use to `scenelith/deploy/selfhost/.env`:

```dotenv
KIE_API_KEY=
OPENROUTER_API_KEY=
```

Restart and open the instance:

```bash
cd scenelith
./scenelith restart
```

The first account becomes the instance owner. Public registration closes by default after that account is created.

## Included services

- web application and API;
- generation, Automation and storage workers;
- realtime collaboration;
- PostgreSQL and Redis;
- local persistent media storage or optional S3-compatible storage;
- Caddy routing and automatic HTTPS for public domains;
- migration, backup, restore and installation-health tooling.

## Providers and privacy

Provider keys stay in the server environment. They are sent only to the provider they authenticate against and are never returned to the browser or to Scenelith Cloud.

## Update safely

```bash
./scenelith backup
./scenelith update
```

The updater verifies the new release, preserves the environment and volumes, applies ordered migrations, waits for health checks and restores the prior deployment files and image if startup fails.

Never run `docker compose down -v` unless permanent deletion of database and media volumes is intentional.
