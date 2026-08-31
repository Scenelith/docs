---
title: "Prepare information"
description: "Renames, selects or combines incoming information for the next step. Complete settings, connections, runtime behavior and usage guidance."
---

# Prepare information

`logic.transform@1`

## What this node does

Renames, selects or combines incoming information for the next step.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Logic | No | Yes |

## When to use it

Use this when the next step needs only part of earlier results, renamed fields, or one combined object.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Incoming information `data` | `data` | Required · Multiple connections · Connectable |
| Output | Prepared information `result` | `data` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **What the next step should receive** `template`<br/>Build a JSON result with variables. Use &#123;&#123; byNode.step-id &#125;&#125; for a named card or &#123;&#123; inputs.0 &#125;&#125; for the first connected value. | `json` | Optional · Fixed only | `&#123;&#125;` |

## How to configure it

1. Connect one or more data-producing steps.
2. Describe the smaller result the next step should receive in the structured editor.
3. Connect Prepared information to the consumer step.
4. Test with a saved fixture before using the result in an expensive step.

## Example flow

**Several AI answers → Plan every slide**

This step removes irrelevant fields and gives the planner one predictable input object.

## What happens at run time

- Pure deterministic transform with no provider call.
- Use &#123;&#123; byNode.step-id &#125;&#125; for a stable named source, &#123;&#123; inputs.0 &#125;&#125; for ordered inputs, or &#123;&#123; sources &#125;&#125; to inspect source IDs, names and values.

## Practical notes

- Do not use an AI step for simple field selection or renaming.
- Keep transformations small so the data contract remains readable.
