---
title: "Select information"
description: "Takes one existing field from incoming information and passes its value forward unchanged. Complete settings, connections, runtime behavior and usage guidance."
---

# Select information

`logic.select-path@1`

## What this node does

Takes one existing field from incoming information and passes its value forward unchanged.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Logic | No | Yes |

## When to use it

Use this when the next step needs one existing field from a larger result and that field must stay unchanged.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Incoming information `data` | `data` | Required · Single connection · Connectable |
| Output | Selected information `result` | `data` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **Field to continue** `path`<br/>Enter the exact field path, for example plans or campaign.brief. The run stops if that field is missing. Placeholder: plans | `text` | Required · Fixed only | `` |

## How to configure it

1. Connect the larger result.
2. Enter the exact field path, such as plans or campaign.brief.
3. Connect Selected information to the next step.

## Example flow

**Review package → Continue approved plans**

The existing plans field continues as the same value without rebuilding its JSON.

## What happens at run time

- Reads one exact object path and returns the stored value unchanged.
- Does not wrap, rename, parse, stringify, coerce or fall back to another field.

## Practical notes

- Use Prepare information only when you intentionally need to create a different shape.
- A missing field stops the run with its exact path.
