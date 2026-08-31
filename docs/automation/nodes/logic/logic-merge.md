---
title: "Merge paths"
description: "Waits for connected paths and creates one clear list or named object for the next step. Complete settings, connections, runtime behavior and usage guidance."
---

# Merge paths

`logic.merge@1`

## What this node does

Waits for connected paths and creates one clear list or named object for the next step.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Logic | No | Yes |

## When to use it

Use this when two or more paths have produced information and the next step needs one deliberate package instead of several crossing connections.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | First `input-1` | `data` | Required · Single connection · Connectable |
| Input | Second `input-2` | `data` | Required · Single connection · Connectable |
| Output | Combined information `result` | `data` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **How should the results be combined?** `mode`<br/>Use a named object when the next step should receive predictable fields. Use a list when every branch returns the same kind of item. | `select` | Optional · Fixed only | Named object (`named-object`) / One combined list (`append-list`) |
| **Inputs to wait for** `inputs`<br/>Add one named socket for every result this merge must receive. Each socket accepts exactly one connection. | `json` | Optional · Fixed only | `[&#123;"id":"input-1","name":"first"&#125;,&#123;"id":"input-2","name":"second"&#125;]` |

## How to configure it

1. Add one input row for every path the workflow must wait for.
2. Give every input a short, stable name, then connect each earlier result to its own socket on the card.
3. Choose whether the results should stay as a list or become one named object.
4. Connect Combined information to the next step.

## Example flow

**Approved brief, copy and references → Plan every image**

The workflow waits until the connected paths have finished, then creates one predictable package for the planner.

## What happens at run time

- Requires at least two configured inputs. Every input is a stable single-connection port, so removing a connected input is blocked until its edge is disconnected.
- List mode flattens connected lists by one level in configured input order. Named object mode uses the input names as keys and keeps every value intact.
- Branches are not claimed to execute simultaneously; the runtime may schedule them in a deterministic order before the merge.

## Practical notes

- Merge is a real synchronization point, not a visual folder.
- A missing required path means the merge cannot produce its complete package; make optional paths explicit before this step.
