---
title: "Limit the amount"
description: "Stops an unexpectedly large list before it reaches expensive or slow steps. Complete settings, connections, runtime behavior and usage guidance."
---

# Limit the amount

`logic.limit-batch@1`

## What this node does

Stops an unexpectedly large list before it reaches expensive or slow steps.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Logic | No | Yes |

## When to use it

Use this immediately before a costly repeated operation to prevent an unexpectedly large list from consuming time or credits.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Incoming list `items` | `data` | Required · Single connection · Connectable |
| Output | Allowed items `items` | `data` | Typed output · Connectable |
| Output | Count summary `summary` | `data` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **Maximum number to continue** `maxItems`<br/>The workflow stops with a clear error when the incoming list is larger. | `number` | Optional · 1–500 · Fixed only | `40` |

## How to configure it

1. Connect the list you want to protect.
2. Set the largest acceptable item count.
3. Connect Allowed items to the expensive step.
4. Optionally connect Count summary to logging or review.

## Example flow

**Planned slides → Image Generator**

Normal lists continue; an oversized list stops with a clear limit error before generation begins.

## What happens at run time

- Validates array length before forwarding data.
- Outputs the unchanged allowed items plus a count summary.

## Practical notes

- Set the limit from the real product constraint, not an arbitrary high number.
- Use workflow-wide safety limits as a second line of protection.
