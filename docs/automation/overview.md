---
title: Automation overview
description: Build typed visual workflows with inspectable inputs, outputs and durable run history.
---

# Automation overview

Automation is a second visual canvas for repeatable work. Each card represents one typed step with explicit inputs, outputs and settings.

## Draft and published versions

- **Draft** is where edits are saved.
- **Published version** is an immutable snapshot used by production triggers and runs.
- **Run history** retains the workflow version, captured inputs, attempts and outputs used by that run.

Editing a draft does not silently change a run that is already queued or running.

## Node catalogue

The editor, MCP and worker use the same versioned node registry. When a new node definition is added, its fields, defaults, port types and help become available to both the visual editor and authorized agents.

## Run inputs

Fields marked **Ask on run** appear in the left Run inputs panel. They can be:

- optional;
- required before the run starts;
- fixed in the node configuration.

The same contract is returned through MCP, so an agent does not have to guess which values a workflow expects.

## Recovery

Failed runs keep captured node inputs, attempts and outputs. After correcting the cause, a permitted user or agent can retry from an eligible failed node instead of rebuilding the whole run from the beginning.
