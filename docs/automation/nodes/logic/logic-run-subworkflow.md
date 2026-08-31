---
title: "Run another workflow"
description: "Hands information to another runnable workflow, waits for it, then continues with its result. Complete settings, connections, runtime behavior and usage guidance."
---

# Run another workflow

`logic.run-subworkflow@1`

## What this node does

Hands information to another runnable workflow, waits for it, then continues with its result.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Logic | No | No |

## When to use it

Use this to reuse one runnable workflow as a single step, for example publishing, moderation or asset processing.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Information to send `data` | `data` | Required · Single connection · Connectable |
| Output | Workflow result `result` | `data` | Typed output · Connectable |
| Output | Error path `error` | `error` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **Connection name** `subworkflowSlot`<br/>A safe name for the workflow you will connect below. The connected workflow can be changed after import. Placeholder: Example: publish-content | `text` | Required · Fixed only | `child-workflow` |
| **Extra fixed information** `childInputs`<br/>Advanced. Values that should be sent on every run in addition to the connected input. | `json` | Optional · Fixed only · Advanced | `&#123;&#125;` |
| **If the other workflow fails** `failureMode`<br/>Either stop this run or pass the child-workflow error to a connected recovery path. | `select` | Optional · Fixed only · Advanced | Stop and show the error (`stop`) / Send the error to another path (`error-output`) |

## How to configure it

1. Connect the information to send.
2. Give the connection a stable name.
3. In Settings, connect that name to a live child workflow.
4. Confirm the child has a compatible Workflow input step.
5. Connect its result or error path.

## Example flow

**Finished image and caption → Publishing result**

This workflow pauses while the child workflow completes, then continues with the child result.

## What happens at run time

- Invokes a pinned workflow version through a deployment binding.
- The connected value becomes the child workflow payload; the child Workflow input reads it without depending on either card's node ID.
- The output is an envelope with the child run id, its final output and warning count.

## Practical notes

- Use a child workflow for genuinely reusable behavior, not to hide a confusing local graph.
- Take the child live and test it before connecting it.
