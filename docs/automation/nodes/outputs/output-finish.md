---
title: "Finish without adding to canvas"
description: "Ends this path and reports its result without creating new canvas nodes. Complete settings, connections, runtime behavior and usage guidance."
---

# Finish without adding to canvas

`output.finish@1`

## What this node does

Ends this path and reports its result without creating new canvas nodes.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Outputs | Yes | No |

## When to use it

Use this to end a non-visual path and expose its final result without adding anything to the content canvas.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Final information `data` | `data` | Required · Single connection · Connectable |
| Output | Run result receipt `result` | `workflow-result` | Typed output · Run-history value; no graph handle |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **How should this path finish?** `outcome`<br/>Finish successfully with the incoming information, or deliberately mark this workflow path as failed. | `select` | Optional · Fixed only | Finish successfully (`completed`) / Stop the workflow with this error (`failed`) |
| **Message shown in the run result** `message`<br/>Use &#123;&#123; data &#125;&#125;, &#123;&#123; run &#125;&#125; or &#123;&#123; trigger &#125;&#125; when the message should include a value from this run. Placeholder: Example: Caption sent for publishing | `text` | Optional · Fixed only | `Workflow finished` |

## How to configure it

1. Connect the final information.
2. Choose whether the path is successful or failed.
3. Write a short result message that an operator will understand.

## Example flow

**External service response → Completed run**

The workflow records a clear outcome and final data, then stops this path.

## What happens at run time

- Terminal result node with no outgoing workflow connection.
- A successful outcome stores the final data and message as the run result. A failed outcome deliberately throws the message and marks the run as failed instead of producing a success receipt.

## Practical notes

- Use a specific message such as Caption sent for publishing.
- Every path should eventually reach a terminal step or an intentional terminal operation.
