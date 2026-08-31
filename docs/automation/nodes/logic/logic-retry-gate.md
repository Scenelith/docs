---
title: "Retry gate"
description: "Returns corrected information to a check through one explicit bounded retry route. Complete settings, connections, runtime behavior and usage guidance."
---

# Retry gate

`logic.retry-gate@1`

## What this node does

Returns corrected information to a check through one explicit bounded retry route.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Logic | No | Yes |

## When to use it

Use this when a deterministic check can return repair feedback and the corrected value must be checked again through a visible bounded path.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | First attempt `initial` | `data` | Required · Single connection · Connectable |
| Input | Retry feedback `feedback` | `data` | Optional · Single connection · Connectable |
| Output | Current value `current` | `data` | Typed output · Connectable |
| Output | Retry exhausted `exhausted` | `error` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **Maximum retries** `maxRetries`<br/>How many corrected values may return through the Retry route after the first attempt. | `number` | Optional · 1–8 · Fixed only | `2` |
| **Corrected value field** `feedbackPath`<br/>Optional field path inside the feedback package, for example plans. Leave empty when the feedback itself is the corrected value. Placeholder: plans | `text` | Optional · Fixed only · Advanced | `` |

## How to configure it

1. Connect the original value to First attempt.
2. Connect Current value to the check and its success path.
3. Route the check error through an explicit repair step.
4. Connect the repaired package back to Retry feedback using a Retry route.
5. Connect Retry exhausted to a deliberate failed output.

## Example flow

**Slide plans rejected by validation → Repair once, then validate the corrected plans again**

The retry route returns only through this gate, increments a stored counter and stops at the configured limit.

## What happens at run time

- This is the only node that accepts a backward Retry route; ordinary graph cycles remain invalid.
- Retries are bounded, persisted in node outputs and counted against the workflow step-execution limit.
- The feedback field path selects the corrected value without inventing or repairing missing data.

## Practical notes

- Keep generation, publishing and other side effects after the successful check, outside the retry body.
- Include the validator error and repaired value in the feedback package so the final failure remains understandable.
