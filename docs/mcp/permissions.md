---
title: Permissions and project access
description: Control which Scenelith workspaces, projects, Library assets and actions an MCP agent can use.
---

# Permissions and project access

MCP authorization is a second boundary. It can narrow a user's existing Scenelith access, but it can never expand it.

## Resource access

On the consent screen, choose:

- one workspace or every workspace you can currently access;
- every project / Canvas in that scope or an explicit list;
- whether the agent may see Library media belonging to those projects.

When a connection is limited to selected projects, Canvas reads and writes, Automations, run history and Library results are limited to those projects too.

## Capability scopes

| Permission | Allows |
| --- | --- |
| View approved creative resources | Approved workspaces, Canvas graphs, identities, workflows and run history. |
| Edit canvases | Create or change Canvas nodes, edges, names and viewport state. |
| Run creative assistants | Compose prompts and run Assistant nodes; may consume credits or configured provider usage. |
| Generate media | Run image and video models; may consume credits or configured provider usage. |
| Add media to Library | Upload approved images and videos to permitted project Libraries. |
| Import external media | Import supported external media into a permitted Canvas and Library. |
| Manage identities | Create and maintain Character or Before/After identities from approved Library images. |
| Edit automations | Create, configure, validate, publish and archive workflows. |
| Connect saved credentials | Bind already-saved credential records to workflow slots; secret values are never returned. |
| Run automations | Preview, start, retry, inspect, diagnose or cancel permitted workflow runs. |

## Library is explicit

Library visibility is not implied by general read access. It must be enabled separately. Uploading requires Library write permission, while creating an Identity additionally requires Identity write permission.

## Credentials stay sealed

An agent can receive safe credential metadata—name, kind, fingerprint and timestamps—only when that permission is approved. Scenelith never returns decrypted passwords, tokens, headers or provider keys through MCP.
