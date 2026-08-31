---
title: Core concepts
description: The project, asset, identity and workflow boundaries used throughout Scenelith.
---

# Core concepts

## Workspace

A workspace contains the projects a user or team can access. Permissions never expand beyond the user's current workspace role.

## Project / Canvas

In the current product model, one saved Canvas is one project resource. The terms are paired in permission screens because limiting access to a Canvas also limits its Library media, Automations and runs.

## Node

A node is a visible unit of work. Source, generator, editor and output nodes retain their own settings and typed relationships instead of collapsing a workflow into an opaque chat history.

## Library asset

An asset is a durable image or video associated with a project. Uploading an asset does not automatically place it on the Canvas or add it to an Identity—those are explicit actions.

## Identity

An Identity is reusable visual evidence, not a prompt. It is one of two strict types:

- **Character** — one `reference` group;
- **Before / After** — two independent `before` and `after` groups.

Scenelith does not silently mix or convert these groups.

## Automation

An Automation has an editable draft and immutable published versions. A run captures the workflow and inputs used at enqueue time, so later edits do not rewrite its history.

## Revision

Canvas and Automation edits use revisions. If a person or another agent changed the same object, a stale edit is rejected instead of overwriting newer work.
