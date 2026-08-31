---
title: Self-hosting overview
description: What the complete public Scenelith distribution includes, owns and deliberately leaves to the operator.
---

# Self-hosting overview

Scenelith self-hosted is the complete public product runtime. Canvas, Library, Identities, generation, Automation, MCP and realtime collaboration run on infrastructure you control with your own provider accounts.

## Choose the page you need

| Goal | Go to |
| --- | --- |
| Install a verified release and create the first owner | [Installation and first run](./installation.md) |
| Understand every environment value | [Configuration reference](./configuration.md) |
| Configure Kie, OpenRouter, local media or S3 | [Providers, accounts and storage](./providers-and-storage.md) |
| Start, stop, diagnose and inspect the stack | [Operations and diagnostics](./operations.md) |
| Back up, upgrade, roll back or restore | [Backup, update and restore](./backup-and-update.md) |
| Put the instance on a domain and enable remote MCP | [Public URL and HTTPS](./public-url.md) |
| Understand services and Cloud boundaries | [Runtime architecture and boundaries](./runtime-architecture.md) |

## What is included

- Scenelith web application and API;
- generation, Automation and storage workers;
- realtime collaboration;
- PostgreSQL 17 and Redis with append-only persistence;
- local persistent media storage or an operator-owned S3-compatible service;
- Caddy routing for HTTP, WebSocket traffic and automatic public TLS;
- versioned migrations, diagnostics, backup, restore and verified update tooling;
- the same shared Canvas, Automation and MCP contracts used by Scenelith Cloud.

## What you operate

You own the server, domain, Docker runtime, database and media retention, provider accounts, secrets, monitoring, backups and recovery tests. Scenelith does not send self-hosted provider keys to Scenelith Cloud.

Self-hosted deliberately excludes Cloud billing, managed credits, team invitations, transactional email, Google sign-in, email confirmation and email-based password recovery. The first local account becomes the instance owner and administrator.

## Safe operating rule

Use the `./scenelith` launcher for ordinary lifecycle operations. It preserves persistent volumes and validates the release profile. Never run `docker compose down -v` unless permanent deletion of the database, Redis and local media volumes is intentional.
