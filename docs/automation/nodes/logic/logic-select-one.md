---
title: "Continue one path"
description: "Joins mutually exclusive paths and passes the one completed value forward unchanged. Complete settings, connections, runtime behavior and usage guidance."
---

# Continue one path

`logic.select-one@1`

## What this node does

Joins mutually exclusive paths and passes the one completed value forward unchanged.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Logic | No | Yes |

## When to use it

Use this after mutually exclusive branches when exactly one completed result must continue unchanged.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Alternative results `data` | `data` | Required · Multiple connections · Connectable |
| Output | Selected information `result` | `data` | Typed output · Connectable |

## Settings

This node has no configurable fields. Its behavior is determined by its typed connections and the workflow run context.

## How to configure it

1. Connect every mutually exclusive branch to the same input.
2. Connect Selected information to the next step.
3. Test both branch outcomes before going live.

## Example flow

**Approved plan or repaired plan → Validate plans**

Exactly one completed branch continues with the same value and field names.

## What happens at run time

- Fails unless exactly one connected branch produced a value.
- Passes that value unchanged without wrapping, renaming, coercion or fallback.

## Practical notes

- Use this only for alternatives where one and only one path can complete.
- Use Merge paths when the next step needs several results together.
