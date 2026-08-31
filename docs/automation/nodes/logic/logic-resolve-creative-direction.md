---
title: "Resolve creative direction"
description: "Verifies the current request, changes only configured choices and writes evidence only to its configured destination. Complete settings, connections, runtime behavior and usage guidance."
---

# Resolve creative direction

`logic.resolve-creative-direction@4`

## What this node does

Verifies the current request, changes only configured choices and writes evidence only to its configured destination.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Logic | No | Yes |

## When to use it

Use this after Interpret creative direction to verify that the model classified the exact current comment without omissions or invented evidence.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Prepared request `request` | `creative-direction-request` | Required · Single connection · Connectable |
| Input | Direction analysis `analysis` | `creative-direction-analysis` | Required · Single connection · Connectable |
| Output | Resolved choices `resolved` | `resolved-creative-settings` | Typed output · Connectable |
| Output | Conflict `conflict` | `error` | Typed output · Connectable |

## Settings

This node has no configurable fields. Its behavior is determined by its typed connections and the workflow run context.

## How to configure it

1. Connect the same Prepared request used by the interpreter.
2. Connect its typed Analysis output.
3. Route Resolved choices into the visible branch conditions.
4. Connect Conflict to a failed output that shows what must be clarified.

## Example flow

**Prepared request plus typed analysis → Wardrobe, location, adaptation and text routes**

Only verified configured choices can change; all other accepted meaning becomes an atomic requirement.

## What happens at run time

- This node is deterministic and fail closed: contract mismatch, missing clauses, paraphrased evidence, low confidence, ambiguity and invalid scope all use Conflict.
- Requirements receive content-derived stable IDs and the current node accepts exactly the current prepared-request version.
- It preserves the connected settings, changes only configured control paths under the selected policy, and writes resolution evidence only to the author-selected empty destination.

## Practical notes

- Use Show changes for confirmation when operators should explicitly approve a switch change.
- Automatic changes still require exact evidence, complete clause coverage and high confidence.
