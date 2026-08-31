---
title: Configuration reference
description: Every setting shipped in the self-hosted environment template, including secrets, retention, networking, providers and storage.
---

# Configuration reference

The release environment is `deploy/selfhost/.env`. `./scenelith init` creates it from the versioned template, generates the required secrets and refuses to overwrite an existing file. Keep its mode at `0600`.

## Database and internal secrets

| Value | Purpose |
| --- | --- |
| `POSTGRES_DB`, `POSTGRES_USER` | Database name and application role; both default to `scenelith`. |
| `POSTGRES_PASSWORD` | Generated database password. |
| `SESSION_SECRET` | Signs local application sessions. |
| `COLLABORATION_JWT_SECRET` | Signs realtime collaboration access tokens. |
| `COLLABORATION_INTERNAL_SECRET` | Authenticates internal application/collaboration calls. |
| `SCENELITH_INTERNAL_METRICS_SECRET` | Protects internal metrics access. |
| `AUTOMATION_CREDENTIAL_ENCRYPTION_KEY` | Encrypts saved Automation credential slots. Preserve it separately for disaster recovery. |

The launcher requires every generated secret to contain at least 32 characters. Normal Scenelith backups intentionally exclude the `.env` file.

## Automation operations

| Value | Default | Purpose |
| --- | ---: | --- |
| `AUTOMATION_ALERT_WEBHOOK_URL` | empty | Optional operator-owned destination for durable failure and recovery alerts. |
| `AUTOMATION_SUCCESSFUL_RUN_RETENTION_DAYS` | `30` | Successful run history retention. |
| `AUTOMATION_FAILED_RUN_RETENTION_DAYS` | `90` | Failed run history retention. |
| `AUTOMATION_DELIVERY_RETENTION_DAYS` | `90` | Trigger delivery history retention. |
| `AUTOMATION_PRODUCT_EVENT_RETENTION_DAYS` | `30` | Product-event history retention. |
| `AUTOMATION_NOTIFICATION_RETENTION_DAYS` | `30` | In-app Automation notification retention. |
| `AUTOMATION_FIXTURE_RETENTION_DAYS` | empty | Saved fixtures are retained indefinitely when empty. |
| `AUTOMATION_WORKFLOW_CONCURRENCY` | `3` | Instance-wide workflow-run parallelism. |
| `AUTOMATION_WORKSPACE_CONCURRENCY` | `4` | Per-workspace fairness ceiling. |

## Release identity

| Value | Required behavior |
| --- | --- |
| `SCENELITH_VERSION` | Exact installed release version. `doctor` rejects a value that differs from the bundle. |
| `SCENELITH_APP_IMAGE` | Published application image, normally `ghcr.io/scenelith/scenelith`. |
| `SCENELITH_DEPLOYMENT_TYPE` | Locked to `selfhost`. |
| `SCENELITH_USAGE_MODE` | Locked to `bring_your_own`. |

Do not change the version by editing `.env` directly. Use `./scenelith update [VERSION]` so the bundle, image and rollback metadata stay aligned.

## URL, cookies and registration

| Value | Local default | Public server |
| --- | --- | --- |
| `SCENELITH_HOST` | `http://localhost` | Public hostname used by Caddy, for example `scenelith.example.com`. |
| `PUBLIC_URL` | `http://localhost` | Exact external HTTPS origin. |
| `COOKIE_SECURE` | `false` | Must be `true` on HTTPS. |
| `SCENELITH_REGISTRATION_MODE` | `owner_only` | Use `open` only for intentional independent local accounts. |
| `HTTP_PORT` | `80` | Host port mapped to Caddy HTTP. |
| `HTTPS_PORT` | `443` | Host port mapped to Caddy HTTPS. |

`doctor` requires `SCENELITH_HOST` and `PUBLIC_URL` to resolve to the same host and rejects non-local public HTTP origins.

## Providers

| Value | Purpose |
| --- | --- |
| `KIE_API_KEY` | Kie image and video generation. |
| `KIE_WEBHOOK_HMAC_KEY` | Optional verification key for Kie webhook callbacks. |
| `OPENROUTER_API_KEY` | Canvas Assistant and Automation AI. |

Tikwm resolves public TikTok imports and has no configured key.

## Media storage

| Value | Default | Purpose |
| --- | ---: | --- |
| `STORAGE_PROVIDER` | `local` | `local` or `s3`. |
| `S3_ENDPOINT` | empty | Empty for AWS S3; HTTPS endpoint for a compatible service. |
| `S3_REGION` | `us-east-1` | Bucket region. |
| `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | empty | S3 credentials. |
| `S3_PRIVATE_BUCKET` | `scenelith-private` | Private source and generated media. |
| `S3_PUBLIC_BUCKET` | `scenelith-public` | Publicly deliverable media. |
| `S3_FORCE_PATH_STYLE` | `false` | Enable when the compatible service requires path-style requests. |
| `STORAGE_CORS_ORIGINS` | empty | Additional allowed browser origins; `PUBLIC_URL` remains authoritative. |

## Worker concurrency

| Value | Default | Purpose |
| --- | ---: | --- |
| `SELFHOST_GENERATION_CONCURRENCY` | `8` | Parallel self-hosted generation work. |
| `TIKTOK_AUTOMATION_CONCURRENCY` | `3` | Parallel TikTok Automation work. |

Increase concurrency only after checking provider limits, CPU, memory, database capacity and storage throughput.
