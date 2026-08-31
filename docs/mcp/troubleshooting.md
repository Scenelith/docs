---
title: Troubleshooting MCP
description: Resolve Scenelith MCP discovery, authorization and access problems.
---

# Troubleshooting MCP

## The client does not open authorization

- Confirm the server type is **Streamable HTTP**.
- Use the exact endpoint shown in **Profile → MCP**.
- For Scenelith Cloud, use `https://scenelith.com/api/mcp`.
- Remove an older failed server entry before adding it again if the client cached discovery metadata.

## “Authorization request expired”

Start a new connection from the client. Authorization requests are short-lived and single-use; reloading or submitting the same consent page twice cannot reuse the original request.

## The button stays on “Connecting”

Return to the MCP client and check whether the connection was added. Desktop clients receive the authorization code on a loopback callback; the browser cannot complete the client's token exchange by itself.

If the client did not receive the callback, remove the connection attempt and initiate a new one from the client rather than reopening an old consent URL.

## A local “Authentication complete” page appears

That page is served by the desktop MCP client's temporary loopback listener, not by Scenelith. It means the browser delivered the authorization code. The client should finish the exchange and may close the window automatically; some clients ask you to close it manually.

## The agent cannot see Library assets

Reconnect or edit the connection and enable **Library access**. General read access alone does not include Library media.

Also confirm the asset belongs to one of the projects selected on the consent screen.

## A write tool is missing

Only tools covered by approved permissions are exposed. Reauthorize with the required capability, then ask the client to refresh its tool list.

## Self-hosted discovery fails

Set a canonical public origin:

```dotenv
PUBLIC_URL=https://scenelith.example.com
```

The reverse proxy must preserve the original host and protocol. The MCP endpoint, OAuth routes and well-known metadata must resolve to the same Scenelith deployment. Public hosts require HTTPS; plain HTTP is accepted only for loopback development.
