---
title: Operations and diagnostics
description: Complete launcher command reference, health checks, service layout and safe day-to-day operations.
---

# Operations and diagnostics

Run commands from the installed Scenelith directory. The launcher always uses `deploy/selfhost/.env` and the complete self-hosted Compose model.

## Command reference

| Command | What it does |
| --- | --- |
| `./scenelith install` | Creates missing private configuration and starts the complete stack. |
| `./scenelith init` | Creates the environment and generated secrets without starting services. Refuses to overwrite an existing file. |
| `./scenelith doctor` | Checks Docker/Compose, secret length and permissions, release alignment, runtime profile, provider availability, storage, HTTPS/origin rules, disk space and Compose validity. |
| `./scenelith doctor --strict-providers` | Treats missing Kie or OpenRouter keys as errors instead of warnings. |
| `./scenelith doctor --json` | Emits the diagnostic result as structured JSON for monitoring or provisioning. |
| `./scenelith start` | Runs diagnostics, pulls pinned images and starts all services with health waits. |
| `./scenelith restart` | Recreates services from already installed pinned images and waits for health. |
| `./scenelith stop` | Stops and removes containers without deleting persistent volumes. |
| `./scenelith status` | Shows service and health state. |
| `./scenelith logs [service]` | Follows the last 200 log lines for all services or one named service. |
| `./scenelith config` | Prints the resolved Compose configuration. Protect the output because resolved values can be sensitive. |
| `./scenelith backup [--output DIR]` | Creates a checksummed PostgreSQL and local-media backup. |
| `./scenelith restore --from DIR --confirm` | Verifies and replaces the current database and local media. |
| `./scenelith update [VERSION]` | Backs up and installs the latest or exact release with automatic image/config rollback on failed health. |
| `./scenelith storage configure-cors` | Applies and verifies the managed browser-upload CORS rule on both S3-compatible buckets. |
| `./scenelith storage check-cors` | Checks the managed bucket CORS rule without changing it. |
| `./scenelith help` | Prints the launcher command reference. |

## Services

| Service | Responsibility |
| --- | --- |
| `gateway` | Caddy HTTP/HTTPS entry point and WebSocket routing. |
| `frameflow` | Scenelith web application and API. |
| `generation-worker` | Image/video provider work. |
| `automation-worker` | Durable workflow, trigger and Automation AI execution. |
| `storage-worker` | Storage cleanup and background media work. |
| `collaboration` | Realtime Canvas collaboration. |
| `application-migrate`, `collaboration-migrate` | Ordered one-shot schema migrations before application services start. |
| `postgres` | Application and collaboration persistence. |
| `redis` | Queue/realtime coordination with append-only persistence. |

Application services wait for migrations and dependencies to become healthy. Workers expose internal health endpoints; the public readiness endpoint is served by the application.

## Diagnose a problem

```bash
./scenelith doctor
./scenelith status
./scenelith logs frameflow
./scenelith logs automation-worker
curl --fail http://localhost/api/health/ready
```

Use the service responsible for the failed action: `generation-worker` for image/video work, `automation-worker` for workflow runs and triggers, `storage-worker` for cleanup, and `collaboration` for realtime connection problems.

## Data safety

- `stop` and normal container recreation preserve Docker volumes.
- `backup` pauses writers briefly to produce a consistent database dump and local-media archive.
- `.env` secrets are never included in normal backups.
- S3 media is never copied into a Scenelith backup; preserve matching object versions or snapshots separately.
- `docker compose down -v` deletes persistent volumes and is not an operational restart command.
