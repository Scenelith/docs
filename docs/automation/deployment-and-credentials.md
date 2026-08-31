---
title: Deployment bindings and credentials
description: Connect portable workflow slots to local credentials and published child workflows without exposing secrets.
---

# Deployment bindings and credentials

Automation graphs are portable; instance-specific secrets and child-workflow IDs are not. Nodes that need either resource declare a named deployment slot, and each Scenelith installation binds that slot locally.

## Credential slots

Scenelith supports four saved HTTP credential kinds:

| Kind | Stored fields |
| --- | --- |
| API key | `apiKey` |
| Bearer | `token` |
| Basic | `username`, `password` |
| Custom header | `headerName`, `value` |

Names are limited to 120 characters. Values cannot be empty or contain line breaks. A custom header name must be a valid HTTP token and cannot replace headers managed by Scenelith, including `Host`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Proxy-Authorization` or `Upgrade`.

Credential payloads are encrypted at rest with the configured Automation credential key ring. Lists, the browser and MCP expose only safe metadata such as name, kind, fingerprint and timestamps. A credential must belong to the same workspace as the workflow, and cannot be deleted until every binding to it is removed.

## Child-workflow slots

A **Run workflow** or **Map workflow** slot binds to a published workflow in the same workspace. Direct self-binding and recursive dependency cycles are rejected. The root run's `maxSubworkflowDepth` policy still governs the complete nested tree.

## Publish and run checks

Validation can describe an unbound slot, but publishing or starting work that depends on it requires a complete compatible binding. Run admission snapshots the selected credential ID and the exact published child-workflow version. Rebinding a slot later does not move queued work to another resource. The encrypted credential value itself is resolved from that pinned credential record when the HTTP step executes, so rotating the same credential intentionally changes what later executions of that record use.

## Permissions

Editing a workflow and connecting a child workflow require Automation edit access. Listing or connecting saved credentials requires the separate credential-management capability. An MCP connection needs `automation:credentials`; the secret payload is never returned even with that scope.
