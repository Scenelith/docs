---
title: "Input from another workflow"
description: "Receives information from a trigger or another workflow. Complete settings, connections, runtime behavior and usage guidance."
---

# Input from another workflow

`input.workflow-data@1`

## What this node does

Receives information from a trigger or another workflow.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Inputs | No | No |

## When to use it

Use this when another workflow, a schedule or an event should supply structured information automatically.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Run `run` | `run-context` | Required · Single connection · Connectable |
| Output | Received information `data` | `data` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **Manual value** `value`<br/>Used only for a manual run. Automatic triggers and parent workflows supply their own payload instead. Choose Ask on run when a person should enter it. | `json` | Optional · Ask on run allowed · Ask on run by default · runtime `json` | `&#123;&#125;` |
| **Read one field from the payload** `payloadPath`<br/>Optional. Example: campaign.brief returns only that nested value. Leave empty to receive the whole payload. Placeholder: campaign.brief | `text` | Optional · Fixed only · Advanced | `` |

## How to configure it

1. Connect the start card.
2. Use the whole incoming payload, or enter a field path when this workflow needs only one nested value.
3. Use Ask on run only when a person should type the value manually.
4. Connect Received information to the first processing step.

## Example flow

**Parent workflow or event → Prepare information**

The parent sends a payload once; this step exposes that payload as normal workflow data.

## What happens at run time

- Reads the trigger or parent-workflow payload directly; it is independent of this card's node ID.
- A fixed or Ask on run value is used only when the run has no machine payload.

## Practical notes

- Prefer a small, stable input contract over passing an entire unrelated response.
- Use Ask on run for human choices and this step for machine-to-machine data.
