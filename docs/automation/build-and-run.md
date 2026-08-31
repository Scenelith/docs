---
title: Build and run a workflow
description: Create, validate, publish and inspect a Scenelith Automation.
---

# Build and run a workflow

## 1. Create a draft

Open Automation from the project and create a workflow. Give it a purpose-based name rather than naming it after one temporary output.

## 2. Add typed steps

Start with a trigger or Run node, add input and processing steps, and finish with an output such as adding generated media back to the Canvas.

Connections are permitted only when the source and destination port types are compatible.

## 3. Configure run inputs

For values that should change on every run, enable **Ask on run** in the node settings. Keep permanent brand, safety and formatting instructions inside the node.

Review the [workflow execution policy and limits](/automation/workflow-settings) when the workflow can generate many assets, call child workflows or receive overlapping automatic starts.

## 4. Validate

Validation checks required fields, port compatibility, reachable paths, run-input bindings and deployment requirements. Resolve blocking errors before publishing.

## 5. Publish

Publishing creates an immutable workflow version. Schedules, webhooks and production runs continue using that version until a newer draft is explicitly published.

## 6. Run and inspect

Start the workflow from the left panel or the bottom Canvas controls. During and after execution, select a node and open **Execution** to inspect:

- captured input;
- produced output;
- attempt status and error code;
- eligible retry actions.

## Continue after a failure

Correct a credential, provider, model or node setting first. When the failed node is retryable, use **Retry from this step**. The new attempt reuses the immutable run context up to that boundary and does not duplicate already-completed upstream work.
