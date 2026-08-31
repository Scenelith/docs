---
title: Installation and first run
description: Requirements, verified installation, provider setup and creation of the first self-hosted owner.
---

# Installation and first run

## Requirements

- Docker Engine with Docker Compose **2.20.3 or newer**; the distribution uses Compose `include`;
- 4 CPU cores and 8 GB RAM for a small instance;
- at least 10 GB free disk; `./scenelith doctor` warns below the recommended 20 GB;
- `curl` or `wget` for the installer;
- optional Kie and OpenRouter keys when generation or AI features are required.

Git, Node.js, npm and a source checkout are not required for the release bundle.

## Install the latest stable release

```bash
curl -fsSL https://github.com/Scenelith/scenelith/releases/latest/download/install.sh | sh
```

The installer downloads the release archive and its SHA-256 checksum from GitHub Releases, rejects unsafe archive paths, verifies the bundle's internal file manifest, copies only the allowlisted deployment files, creates private secrets with mode `0600`, validates the complete Compose model and starts the pinned images.

By default it creates `./scenelith`. Select another empty directory or an exact published version before running it:

```bash
curl -fsSLo install.sh https://github.com/Scenelith/scenelith/releases/download/v0.5.17/install.sh
SCENELITH_INSTALL_DIR=/opt/scenelith SCENELITH_VERSION=0.5.17 sh install.sh
```

The version value uses `MAJOR.MINOR.PATCH` without a leading `v`.

## Review the installer before running it

```bash
curl -fsSLO https://github.com/Scenelith/scenelith/releases/latest/download/install.sh
less install.sh
sh install.sh
```

## Enable providers

Open `scenelith/deploy/selfhost/.env` and add only the keys you use:

```dotenv
KIE_API_KEY=
OPENROUTER_API_KEY=
```

The stack can run without those keys. Image/video generation remains unavailable without Kie; Canvas Assistant and Automation AI remain unavailable without OpenRouter.

After editing the environment:

```bash
cd scenelith
./scenelith doctor
./scenelith restart
```

## Create the owner

Open the `PUBLIC_URL` printed by the launcher. On a default local installation this is `http://localhost`.

The first registered account becomes the instance owner and administrator. Registration then closes under the default `owner_only` mode. Self-hosted accounts are local; there is no email confirmation or email password recovery.

## Confirm readiness

```bash
./scenelith status
curl --fail http://localhost/api/health/ready
```

The readiness response must report the application and collaboration schemas as ready before the instance is treated as healthy.
