---
title: Public URL and HTTPS
description: Point a domain at a self-hosted Scenelith instance and enable automatic HTTPS and remote MCP.
---

# Public URL and HTTPS

Set these values in `deploy/selfhost/.env`:

```dotenv
SCENELITH_HOST=scenelith.example.com
PUBLIC_URL=https://scenelith.example.com
COOKIE_SECURE=true
```

## DNS

Point an `A` record for the hostname to the server's public IPv4 address. Add an `AAAA` record only when the host has working public IPv6.

Allow inbound TCP ports 80 and 443. Caddy obtains and renews the TLS certificate automatically after DNS resolves to the server.

## Verify the deployment

Open:

```text
https://scenelith.example.com/api/health/ready
```

Then create the first owner account and check provider status in **Profile → Providers**.

## Remote MCP

The MCP server becomes:

```text
https://scenelith.example.com/api/mcp
```

The endpoint, OAuth authorization routes and well-known metadata must stay on the same public origin. See [Connect an AI agent](/mcp/connect).

## Production checklist

- keep encrypted off-host copies of Scenelith backups;
- monitor readiness and Docker container health;
- alert on disk usage when media is stored locally;
- configure provider budget and rate limits;
- test restore on a separate host before relying on it.
