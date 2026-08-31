---
title: Automation nodes
description: Every current Automation node, with its settings, connections, runtime behavior and practical use.
---

# Automation nodes

Scenelith currently exposes **25 current Automation nodes**. Every node below has its own page covering what it does, when to use it, every setting, its typed inputs and outputs, and what happens at run time.

> This catalogue is generated from the same versioned registry used by the Automation editor, MCP and workflow worker. A saved published workflow can retain an older node version; these pages describe the current version offered when adding a node.

## Trigger nodes

**1 node**

| Node | What it does |
| --- | --- |
| [**Start workflow**](./nodes/triggers/core-manual-trigger.md)<br/>`core.manual-trigger@1` | Starts one workflow run from the Automation panel or a configured trigger. |

## Input nodes

**5 nodes**

| Node | What it does |
| --- | --- |
| [**TikTok source**](./nodes/inputs/input-tiktok-source.md)<br/>`input.tiktok-source@2` | Brings the chosen TikTok slideshow and an explicitly selected caption mode into the workflow. |
| [**Identity**](./nodes/inputs/input-identity.md)<br/>`input.identity@2` | Gives later steps the selected saved person or character and requires usable images when one is chosen. |
| [**Visual references**](./nodes/inputs/input-visual-references.md)<br/>`input.visual-references@1` | Brings chosen Canvas, Library or Identity images into the workflow as reusable visual context. |
| [**TikTok recreation choices**](./nodes/inputs/input-creative-settings.md)<br/>`input.creative-settings@1` | Collects the six explicit decisions used by the Recreate TikTok workflow. |
| [**Input from another workflow**](./nodes/inputs/input-workflow-data.md)<br/>`input.workflow-data@1` | Receives information from a trigger or another workflow. |

## AI nodes

**2 nodes**

| Node | What it does |
| --- | --- |
| [**AI**](./nodes/ai/ai-structured-task.md)<br/>`ai.structured-task@2` | Runs one named AI task and returns either readable text or defined data fields. |
| [**Interpret creative direction**](./nodes/ai/ai-interpret-creative-direction.md)<br/>`ai.interpret-creative-direction@3` | Classifies only the current path-explicit request and returns exact evidence spans under visible instructions. |

## Logic nodes

**13 nodes**

| Node | What it does |
| --- | --- |
| [**Prepare information**](./nodes/logic/logic-transform.md)<br/>`logic.transform@1` | Renames, selects or combines incoming information for the next step. |
| [**Continue one path**](./nodes/logic/logic-select-one.md)<br/>`logic.select-one@1` | Joins mutually exclusive paths and passes the one completed value forward unchanged. |
| [**Retry gate**](./nodes/logic/logic-retry-gate.md)<br/>`logic.retry-gate@1` | Returns corrected information to a check through one explicit bounded retry route. |
| [**Select information**](./nodes/logic/logic-select-path.md)<br/>`logic.select-path@1` | Takes one existing field from incoming information and passes its value forward unchanged. |
| [**Choose a path**](./nodes/logic/logic-condition.md)<br/>`logic.condition@3` | Checks one explicit JSON-typed rule without silently converting text, numbers or booleans. |
| [**Prepare creative direction**](./nodes/logic/logic-prepare-creative-direction.md)<br/>`logic.prepare-creative-direction@3` | Creates a path-explicit typed request that defines exactly what the interpreter and resolver may read or write. |
| [**Resolve creative direction**](./nodes/logic/logic-resolve-creative-direction.md)<br/>`logic.resolve-creative-direction@4` | Verifies the current request, changes only configured choices and writes evidence only to its configured destination. |
| [**Limit the amount**](./nodes/logic/logic-limit-batch.md)<br/>`logic.limit-batch@1` | Stops an unexpectedly large list before it reaches expensive or slow steps. |
| [**Merge paths**](./nodes/logic/logic-merge.md)<br/>`logic.merge@1` | Waits for connected paths and creates one clear list or named object for the next step. |
| [**Run another workflow**](./nodes/logic/logic-run-subworkflow.md)<br/>`logic.run-subworkflow@1` | Hands information to another runnable workflow, waits for it, then continues with its result. |
| [**For each item**](./nodes/logic/logic-map-subworkflow.md)<br/>`logic.map-subworkflow@1` | Runs one reusable workflow for every item in a bounded list, then exposes the collected results and failures. |
| [**Validate Recreate TikTok plans**](./nodes/logic/logic-validate-slide-plans.md)<br/>`logic.validate-slide-plans@2` | Checks every plan against the explicit Recreate TikTok v1 contract before images are created. |
| [**Prepare slideshow image requests**](./nodes/logic/logic-prepare-slideshow-image-requests.md)<br/>`logic.prepare-slideshow-image-requests@1` | Converts checked TikTok slide plans into exact generic image requests without changing their prompts. |

## Integration nodes

**1 node**

| Node | What it does |
| --- | --- |
| [**Connect an external service**](./nodes/integrations/integration-http-request.md)<br/>`integration.http-request@1` | Sends information to an external app or API and passes its answer to the next step. |

## Generation nodes

**1 node**

| Node | What it does |
| --- | --- |
| [**Image Generator**](./nodes/generation/generation-image.md)<br/>`generation.image@2` | Creates images from exact prompts and reference roles prepared by connected workflow nodes. |

## Output nodes

**2 nodes**

| Node | What it does |
| --- | --- |
| [**Add slideshow to canvas**](./nodes/outputs/output-add-to-canvas.md)<br/>`output.add-to-canvas@3` | Places canonical generated-image results on the content canvas and preserves the complete plan without silent truncation. |
| [**Finish without adding to canvas**](./nodes/outputs/output-finish.md)<br/>`output.finish@1` | Ends this path and reports its result without creating new canvas nodes. |
