---
title: Trigger nodes
description: Complete inputs, outputs, settings and runtime guidance for the current nodes in Triggers.
---

# Trigger nodes

This page is generated from the current Automation registry and contains **1 current node** in the **Triggers** category.

## Start workflow {#core-manual-trigger}

`core.manual-trigger@1`

Starts one workflow run from the Automation panel or a configured trigger.

**Registry metadata:** category `trigger`; icon `play`; accent `mint`; terminal no; retry-safe no. Example: Use this once at the beginning. A person, schedule, event or webhook can start the workflow.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | — | — | — |
| Output | Run `run` | `run-context` | Typed output · Connectable |

**Use it when:** Use this as the start of a workflow. A person can press Run, and a configured schedule, event or webhook can start the same saved workflow automatically.

**Setup**

1. Place it at the start of the workflow.
2. Connect its Run output to every input step that must prepare a value before the work begins.
3. Mark changeable fields on later steps as Ask on run so they appear in the Automation panel.

**Example path:** Automation panel → Source and creative inputs. The person presses Run once. This step creates the run context that wakes the connected input steps.

**Tips:** A workflow needs exactly one start card. Schedules, events and webhooks use the published workflow version pinned when the trigger is activated.

**Technical behavior:** Emits one run-context object containing run metadata and the trigger payload when one exists. It does not transform creative data or call an external provider.
