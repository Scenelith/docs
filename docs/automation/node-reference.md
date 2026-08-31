---
title: Automation node reference
description: Browse every current Automation node by category and open its complete versioned contract.
---

# Automation node reference

Scenelith currently exposes **25 current Automation node types**. Connections are typed: a port accepts only compatible data. A saved workflow can retain an older node version; this reference describes the latest version offered when adding a node.

| Category | Nodes | Reference |
| --- | ---: | --- |
| Triggers | 1 | [Open triggers](./nodes/triggers.md) |
| Inputs | 5 | [Open inputs](./nodes/inputs.md) |
| AI | 2 | [Open ai](./nodes/ai.md) |
| Logic | 13 | [Open logic](./nodes/logic.md) |
| Integrations | 1 | [Open integrations](./nodes/integrations.md) |
| Generation | 1 | [Open generation](./nodes/generation.md) |
| Outputs | 2 | [Open outputs](./nodes/outputs.md) |

## Complete current inventory

| Node | Version | Category |
| --- | --- | --- |
| [Start workflow](./nodes/triggers.md#core-manual-trigger) | `core.manual-trigger@1` | Triggers |
| [TikTok source](./nodes/inputs.md#input-tiktok-source) | `input.tiktok-source@2` | Inputs |
| [Identity](./nodes/inputs.md#input-identity) | `input.identity@2` | Inputs |
| [Visual references](./nodes/inputs.md#input-visual-references) | `input.visual-references@1` | Inputs |
| [TikTok recreation choices](./nodes/inputs.md#input-creative-settings) | `input.creative-settings@1` | Inputs |
| [Input from another workflow](./nodes/inputs.md#input-workflow-data) | `input.workflow-data@1` | Inputs |
| [AI](./nodes/ai.md#ai-structured-task) | `ai.structured-task@2` | AI |
| [Prepare information](./nodes/logic.md#logic-transform) | `logic.transform@1` | Logic |
| [Continue one path](./nodes/logic.md#logic-select-one) | `logic.select-one@1` | Logic |
| [Retry gate](./nodes/logic.md#logic-retry-gate) | `logic.retry-gate@1` | Logic |
| [Select information](./nodes/logic.md#logic-select-path) | `logic.select-path@1` | Logic |
| [Choose a path](./nodes/logic.md#logic-condition) | `logic.condition@3` | Logic |
| [Prepare creative direction](./nodes/logic.md#logic-prepare-creative-direction) | `logic.prepare-creative-direction@3` | Logic |
| [Interpret creative direction](./nodes/ai.md#ai-interpret-creative-direction) | `ai.interpret-creative-direction@3` | AI |
| [Resolve creative direction](./nodes/logic.md#logic-resolve-creative-direction) | `logic.resolve-creative-direction@4` | Logic |
| [Limit the amount](./nodes/logic.md#logic-limit-batch) | `logic.limit-batch@1` | Logic |
| [Merge paths](./nodes/logic.md#logic-merge) | `logic.merge@1` | Logic |
| [Run another workflow](./nodes/logic.md#logic-run-subworkflow) | `logic.run-subworkflow@1` | Logic |
| [For each item](./nodes/logic.md#logic-map-subworkflow) | `logic.map-subworkflow@1` | Logic |
| [Connect an external service](./nodes/integrations.md#integration-http-request) | `integration.http-request@1` | Integrations |
| [Validate Recreate TikTok plans](./nodes/logic.md#logic-validate-slide-plans) | `logic.validate-slide-plans@2` | Logic |
| [Image Generator](./nodes/generation.md#generation-image) | `generation.image@2` | Generation |
| [Prepare slideshow image requests](./nodes/logic.md#logic-prepare-slideshow-image-requests) | `logic.prepare-slideshow-image-requests@1` | Logic |
| [Add slideshow to canvas](./nodes/outputs.md#output-add-to-canvas) | `output.add-to-canvas@3` | Outputs |
| [Finish without adding to canvas](./nodes/outputs.md#output-finish) | `output.finish@1` | Outputs |

> Each category page is generated from the same versioned node registry used by the visual editor, MCP capabilities and runtime validation.
