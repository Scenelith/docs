---
title: Runs, versions and triggers
description: Drafts, immutable versions, retries, cancellation and event delivery.
---

# Runs, versions and triggers

Automation separates an editable draft from the exact graph used by a run.

## Draft and published version

Editing changes the draft. **Save** validates and stores it. **Publish** creates an immutable version that triggers and other workflows can target. Existing runs keep the version and input snapshot they started with; later edits cannot change work already queued.

System templates are protected. You can change the permitted model setting, but duplicate a template to change prompts, connections or other protected configuration.

## Validation

Before publish/run, validation checks:

- required node settings;
- required typed inputs and compatible connections;
- one valid start path;
- unreachable or ambiguous paths;
- runtime inputs marked **Ask on run**;
- credential and subworkflow deployment slots;
- cycles and retry boundaries;
- output contracts.

Use **Preview node** to execute one supported node against supplied sample input without running the entire workflow.

## Run input snapshot

The run panel collects values exposed by nodes through **Ask on run**. When the run starts, Scenelith stores an immutable input snapshot, workflow version, model choices and bound deployment values. Workers read that snapshot, not the live draft.

## Execution states

A run is queued, running, completed, failed or cancelled. Each node records attempts, captured input, produced output, errors and timing. Cancelling is an explicit request; waiting in the UI does not itself cancel a run.

The execution inspector can expand/collapse captured input and produced output. `null` means that attempt produced no output.

## Retry from a node

For an eligible failed or cancelled run, **Retry from this node** starts a new run using completed upstream results and the stored snapshot rather than replaying the whole workflow. Scenelith revalidates that the target node and required prior outputs still exist in the published version.

Node-local retries—such as AI `maxAttempts` or a Retry gate—are attempts inside one run. **Retry from node** is a new run-level continuation and is shown separately.

## Triggers

Triggers attach a published workflow to an automatic start. A trigger is created **paused**. Activation validates its saved run inputs and deployment bindings, then pins the workflow version that is published at that moment.

| Type | Configuration | Delivery input |
| --- | --- | --- |
| Schedule, interval | `everyMinutes` from 1 to 525,600 | A versioned schedule envelope plus the trigger's saved run inputs. |
| Schedule, calendar | Five-field `cron`, an IANA `timezone`, and a misfire policy | A versioned schedule envelope plus saved inputs. |
| Authenticated webhook | No public configuration object; Scenelith returns the secret URL token once | A JSON object up to 1 MB. An optional `Idempotency-Key` prevents duplicate delivery. |
| Canvas event | Event name and exact contract version | The validated product-event envelope plus saved inputs. |

Schedule `misfirePolicy` is `catch-up-once` by default. `skip` advances past a missed occurrence; `catch-up-once` permits one catch-up delivery.

Two Canvas-event contracts currently exist:

- `tiktok.imported@1`: `sourceUrl`, 1–500 `assetIds`, and optional `title`;
- `generation.completed@1`: `generationId`, `nodeId`, `assetId`, `mediaType` (`image` or `video`) and `operation` (`generation` or `edit`).

Each trigger has its own overlap policy (`queue`, `skip`, or `cancel-previous`) and 1–32 concurrent runs. It can override the workflow-level overlap defaults for its deliveries.

Trigger delivery stores an idempotent delivery key, payload, pinned version, run-input snapshot, deployment snapshot and result. Authorized users or agents can pause, activate or delete a trigger, inspect deliveries and replay only a `dead_letter` delivery. Replay uses the original immutable delivery context; it does not silently move to the latest draft.

## Subworkflows and credentials

Published workflows can expose deployment slots:

- a subworkflow slot binds to a compatible published workflow;
- a credential slot binds to a saved workspace credential.

Secret values are never returned to the browser or MCP agent. The agent sees slot metadata and can choose an existing credential only with `automation:credentials` permission.

## Fixtures

Fixtures are saved test inputs for validation and repeatable previews. They are not production triggers and do not change a published version.
