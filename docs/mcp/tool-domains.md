---
title: Tool domains
description: How Scenelith organizes Canvas, Library, Identity and Automation tools for AI agents.
---

# Tool domains

Scenelith uses one flat MCP tool namespace for client compatibility, but its server guide divides operations into four domains.

## Canvas

Owns the visible graph, nodes, connections, references, timeline state and generation results.

Typical flow:

```text
list_canvases → get_canvas → semantic Canvas operation with expected_revision
```

Canvas writes require the exact current revision. A stale edit is rejected instead of overwriting newer human or agent work.

## Library

Owns durable image and video assets. Listing is cursor-paginated. Inspection returns a bounded image preview or representative video frame inside the MCP result; private originals do not become public URLs.

Uploading creates a Library asset only. Placing it on Canvas, attaching it as a reference and adding it to an Identity are separate explicit actions.

## Identities

Owns reusable visual evidence:

- `single` accepts the `reference` group;
- `before_after` accepts separate `before` and `after` groups.

Reference order is preserved and can be changed without changing the original Library asset.

## Automations

Owns workflow drafts, immutable versions, triggers, deployment bindings, fixtures and runs.

Typical flow:

```text
get capabilities → create or edit → validate → publish → preview or run → inspect → diagnose
```

Semantic edits require the current draft version ID. New node types become discoverable automatically because MCP reads the same versioned registry as the visual editor.

## Server resources

Before choosing tools, a client can read:

- `scenelith://guide/agent-workflows`
- `scenelith://connection/access`
- `scenelith://automation/guide`
- `scenelith://automation/node-catalog`

These resources explain the approved boundary, object model, exact node fields, port types and safe multi-step workflows without exposing credentials or internal user data.
