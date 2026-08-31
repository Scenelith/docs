---
title: Runtime architecture and boundaries
description: How the public self-hosted release is packaged, isolated and kept aligned with the shared Scenelith core.
---

# Runtime architecture and boundaries

## One versioned application image

The web application, collaboration migrations and all workers run from the same published Scenelith application image and release tag. PostgreSQL, Redis and Caddy use separately pinned infrastructure images. This avoids mixing application revisions across roles.

The release archive contains the launcher, public documentation, provider manifest and allowlisted Compose/configuration files. It does not contain a second application implementation. The installer verifies the outer archive checksum and the internal manifest before copying anything.

## Persistent data

| Volume or service | Data |
| --- | --- |
| `scenelith-postgres` | Application, Automation and collaboration database state. |
| `scenelith-redis` | Append-only Redis persistence for queue/realtime coordination. |
| `scenelith-data` | Uploaded/generated media when `STORAGE_PROVIDER=local`. |
| `scenelith-caddy-data`, `scenelith-caddy-config` | TLS certificates and Caddy state. |
| Operator S3 buckets | Media when `STORAGE_PROVIDER=s3`; protected outside Docker volumes. |

## Security boundary

- containers drop Linux capabilities and enable `no-new-privileges`;
- generated secrets stay in a mode-`0600` environment file;
- provider and Automation credential values are never returned to the browser;
- internal API paths are blocked at the public gateway;
- Caddy sets transport, framing, content-type, referrer and permissions headers;
- the public runtime is locked to `selfhost` plus `bring_your_own` and contains no Cloud billing or managed-provider implementation.

## Cloud and self-hosted parity

Canvas, Automation, MCP, storage contracts and provider abstractions originate in the public Scenelith core. Cloud consumes a reviewed immutable public commit and supplies only Cloud-owned adapters such as billing, managed credentials, teams, email and private operations.

A Cloud deployment does not release self-hosted Scenelith. Self-hosted operators receive shared changes only through a separately published, checksummed and tagged public release.

## Migration and recovery boundary

Application and collaboration migrations complete before serving traffic. Released migrations are expand-only and are never edited after application. Update rollback restores the prior deployment files and application image when health fails; the pre-update backup remains the data-recovery boundary for destructive recovery.
