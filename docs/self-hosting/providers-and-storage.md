---
title: Providers, accounts and storage
description: Bring-your-own providers, registration boundary and local/S3 media storage.
---

# Providers, accounts and storage

## Providers

| Provider | Capability | Environment value |
| --- | --- | --- |
| Kie | Image and video generation | `KIE_API_KEY` |
| OpenRouter | Canvas Assistant and Automation AI planning | `OPENROUTER_API_KEY` |
| Tikwm | Public TikTok post metadata/media resolution | No key |

The stack starts without Kie/OpenRouter keys; only their capabilities remain unavailable. Keys stay in the server environment. The browser and MCP see configured/not-configured status, never the values. Restart after changing a key.

Run `./scenelith doctor` to validate the Compose model, provider presence, storage and disk without printing secrets. `--strict-providers` requires both paid providers; `--json` produces automation-friendly output.

## Local accounts

The first registered account becomes instance owner/admin. Public registration then closes by default. Set `SCENELITH_REGISTRATION_MODE=open` only when independent local accounts are intentional; each owns a separate workspace.

Self-hosted does not include Cloud team invitations, payment services, Google sign-in, email confirmation, email delivery or email password recovery.

## Local media

Default media lives in the persistent `scenelith-data` Docker volume. PostgreSQL and Redis use separate persistent volumes. Removing containers keeps volumes; `docker compose down -v` permanently removes them and must not be used as a routine restart.

## S3-compatible media

Set `STORAGE_PROVIDER=s3` and the `S3_*` environment values. Leave `S3_ENDPOINT` empty for AWS S3; set it for compatible services such as MinIO, Backblaze, Cloudflare R2 or DigitalOcean Spaces.

Create both configured private/public buckets. Their CORS policy must allow origins in `PUBLIC_URL` or `STORAGE_CORS_ORIGINS`, methods `GET`, `HEAD`, `PUT`, request headers `content-type` and `range`, and response headers `etag`, `content-length`, `content-range`.

TikTok import sends a public post URL to Tikwm and does not use a logged-in TikTok account or cookies.
