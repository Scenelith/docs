---
title: "For each item"
description: "Runs one reusable workflow for every item in a bounded list, then exposes the collected results and failures. Complete settings, connections, runtime behavior and usage guidance."
---

# For each item

`logic.map-subworkflow@1`

## What this node does

Runs one reusable workflow for every item in a bounded list, then exposes the collected results and failures.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Logic | No | No |

## When to use it

Use this as an explicit bounded loop when every item in a list must go through the same reusable workflow.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | List of items `items` | `data` | Required · Single connection · Connectable |
| Output | Successful results `results` | `data` | Typed output · Connectable |
| Output | Failed items `failures` | `data` | Typed output · Connectable |
| Output | Error path `error` | `error` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **Connection name** `subworkflowSlot`<br/>A safe name for the workflow that will handle each item. Placeholder: Example: review-one-slide | `text` | Required · Fixed only | `item-workflow` |
| **Maximum number of items** `maxItems`<br/>Prevents an unexpectedly large list from creating too many runs. | `number` | Optional · 1–500 · Fixed only | `40` |
| **How many may run at once** `concurrency`<br/>Higher is faster but uses more provider capacity at the same time. | `number` | Optional · 1–16 · Fixed only | `3` |
| **If one item fails** `itemFailure`<br/>Choose whether completed items remain available or any failed item makes this whole step fail. | `select` | Optional · Fixed only | Keep the successful results (`keep-successful`) / Stop the whole list (`stop`) |
| **Extra fixed information** `childInputs`<br/>Advanced. Values sent with every item. | `json` | Optional · Fixed only · Advanced | `&#123;&#125;` |
| **If this step cannot finish** `failureMode`<br/>Used when the list cannot be processed, including when every item fails or Stop the whole list is selected. | `select` | Optional · Fixed only · Advanced | Stop and show the error (`stop`) / Send the error to another path (`error-output`) |

## How to configure it

1. Connect the list of items.
2. Choose the child workflow connection.
3. Set maximum items and safe concurrency.
4. Choose whether one failed item stops everything or successful results are kept.
5. Connect Results, Failures or Error to explicit next paths.

## Example flow

**List of slide plans → Collected reviews and failed items**

The loop sends one item at a time to the selected child workflow, keeps its original item number, and emits the collected result only after the bounded list is finished.

## What happens at run time

- Creates bounded child runs and preserves every item's zero-based itemIndex beside its run id, output and warning count.
- The child workflow is the visible loop body. This avoids an unbounded backward canvas connection while still allowing the repeated work to contain any supported steps.
- Each item becomes the child workflow payload. When Keep successful is selected, failed items appear on Failed items; Stop the whole list produces a node error instead.

## Practical notes

- Start with low concurrency when the provider has strict rate limits.
- Use Run another workflow when there is only one item.
