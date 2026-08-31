---
title: Automation tools
description: Discover, edit, validate, publish, run and recover workflows through MCP.
---

# MCP Automation tools

The Automation editor and MCP use the same versioned node registry. Never guess node fields or ports.

## Discovery

```text
list_automation_workflows
→ get_automation_workflow
→ get_automation_capabilities
```

Capabilities contain current node versions, typed ports, settings/defaults, run bindings, prompt variables, dynamic ports, help and limits. Passing `canvas_id` also returns the live Assistant/image model, ratio and resolution catalogue.

## Build a draft

```text
create_automation_workflow
→ add_automation_node
→ configure_automation_node
→ set_automation_run_input
→ validate_automation_connection
→ connect_automation_nodes
→ validate_automation_workflow
```

Every edit returns a new current draft ID. Re-read/use that ID before the next edit. `set_automation_run_input` chooses whether a runtime-bindable setting is fixed, optional or required in the left Run inputs panel.

`configure_automation_workflow` changes name, description, limits, overlap/concurrency policy, budget or viewport without replacing the graph.

## Save and publish

`save_automation_workflow` creates a new immutable draft version from the current base draft. `publish_automation_workflow` publishes only a valid draft with complete deployment bindings. Active triggers advance to that published version.

Protected system workflows cannot be freely rewritten or archived. `set_system_automation_model` changes only an explicitly editable model override; duplicate the workflow for other changes.

## Test and run

Create a pinned fixture with `create_automation_fixture`, then `preview_automation_node`. Poll `get_automation_run` for exact captured input/output/events.

For production:

```text
run_automation_workflow
→ get_automation_run
→ diagnose_automation_run (when failed)
→ retry_automation_run_from_node (when eligible)
```

The retry tool creates a linked immutable run and reuses only retry-safe upstream outputs. It does not mutate or resume the original run in place.

## Triggers and deliveries

Create a paused schedule, authenticated webhook or Canvas-event trigger with `create_automation_trigger`. The workflow must already have a published version and the fixed inputs must exactly match its Run inputs contract.

Webhook secrets are returned once. Activating a trigger revalidates its bindings and pins the current published version. Failed automatic deliveries can enter dead-letter state; inspect them with `list_automation_trigger_deliveries` and replay only after diagnosis.

## Credentials

With `automation:credentials`, an agent can list safe metadata and bind an existing saved credential to a declared slot. Secret payloads never cross MCP. Without that scope, deployment binding status remains visible but credential names and IDs are redacted.

## Portable workflows and history

Exports are integrity-checked and credential-free. Imported workflows start as isolated drafts and require local deployment slots to be bound again. `restore_automation_version` creates a new draft copied from history; it never overwrites an old version or publishes automatically.
