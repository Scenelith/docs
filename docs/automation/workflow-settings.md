---
title: Workflow settings and limits
description: Runtime budget, parallelism, overlap behavior and graph limits for an Automation workflow.
---

# Workflow settings and limits

Every workflow stores one settings object with its graph. The settings are frozen into a published version and therefore stay stable for the whole run.

## Runtime policy

| Setting | Default | Allowed value | What it limits |
| --- | ---: | ---: | --- |
| `timeoutSeconds` | 3,600 | 60–86,400 | Total run lifetime. The worker records a deadline when the run is admitted. |
| `maxNodeExecutions` | 5,000 | 1–100,000 | Total node executions in one run, including repeated paths. |
| `maxGeneratedAssets` | 200 | 1–5,000 | Generated assets admitted across the run. |
| `maxCredits` | No workflow cap | `null` or 0–1,000,000,000 | Stops a new credit reservation when charged + reserved + requested credits would exceed the workflow cap. Workspace balance still applies. |
| `maxParallelism` | 8 | 1–32 | Upper bound for work performed in parallel. A node's own concurrency can be lower, but never raises this ceiling. |
| `maxSubworkflowDepth` | 8 | 1–16 | Maximum nested **Run workflow** / **Map workflow** depth. Cycles are rejected separately. |
| `overlapPolicy` | `queue` | `queue`, `skip`, `cancel-previous` | What a new run does when the workflow already has the allowed number of active runs. |
| `maxConcurrentRuns` | 1 | 1–32 | Number of active runs admitted for the workflow. |

`maxCredits: null` means that the workflow adds no extra credit ceiling. It does not mean free execution.

## Overlap behavior

- **`queue`** admits the new run in queued state.
- **`skip`** records the new run as cancelled with an overlap-skipped decision when the active-run limit is already reached.
- **`cancel-previous`** requests cancellation of active earlier runs, then admits the new run.

An automatic trigger can override `overlapPolicy` and `maxConcurrentRuns` for deliveries from that trigger. Manual and child-workflow starts otherwise use the published workflow policy.

## Where to configure it

The current visual editor uses the defaults above for newly created workflows. An OAuth-authorized agent with `automation:write` can change the stored policy with `configure_automation_workflow`; the edit must include the exact current draft version ID. Revalidate and publish the new draft before automatic triggers use it.

This tool can also update the workflow name (1–120 characters), description (up to 500 characters) and saved editor viewport without changing nodes or connections.

## Graph size limits

A workflow graph can contain at most:

- 500 nodes;
- 2,000 connections;
- 80 groups;
- 80 sticky-note annotations.

A group contains 1 or more node IDs. Its name is 1–120 characters, description up to 500 characters, width 240–2,400 and height 160–1,800. A sticky note has a 1–120 character title, up to 30,000 Markdown characters, width 320–2,400, height 220–1,600 and one of four stored colors: yellow, blue, rose or gray.

These are validation limits, not targets. Split a workflow into published subworkflows when a graph becomes difficult to read or reuse.
