---
title: "Start workflow"
description: "Starts one workflow run from the Automation panel or a configured trigger. Complete settings, connections, runtime behavior and usage guidance."
---

# Start workflow

`core.manual-trigger@1`

## What this node does

Starts one workflow run from the Automation panel or a configured trigger.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Triggers | No | No |

## When to use it

Use this as the start of a workflow. A person can press Run, and a configured schedule, event or webhook can start the same saved workflow automatically.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | — | — | — |
| Output | Run `run` | `run-context` | Typed output · Connectable |

## Settings

This node has no configurable fields. Its behavior is determined by its typed connections and the workflow run context.

## How to configure it

1. Place it at the start of the workflow.
2. Connect its Run output to every input step that must prepare a value before the work begins.
3. Mark changeable fields on later steps as Ask on run so they appear in the Automation panel.

## Example flow

**Automation panel → Source and creative inputs**

The person presses Run once. This step creates the run context that wakes the connected input steps.

## What happens at run time

- Emits one run-context object containing run metadata and the trigger payload when one exists.
- It does not transform creative data or call an external provider.

## Practical notes

- A workflow needs exactly one start card.
- Schedules, events and webhooks use the published workflow version pinned when the trigger is activated.
