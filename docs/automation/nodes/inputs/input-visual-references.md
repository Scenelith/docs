---
title: "Visual references"
description: "Brings chosen Canvas, Library or Identity images into the workflow as reusable visual context. Complete settings, connections, runtime behavior and usage guidance."
---

# Visual references

`input.visual-references@1`

## What this node does

Brings chosen Canvas, Library or Identity images into the workflow as reusable visual context.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Inputs | No | No |

## When to use it

Use this when later AI or image steps need visual examples that are not a saved person or character: composition, pose, product, place, lighting, style or another scene.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Run `run` | `run-context` | Required · Single connection · Connectable |
| Output | References `references` | `visual-references` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **Reference images** `references`<br/>Choose images from this canvas or the workspace Library, or ask for them before every run. | `references` | Optional · maximum 32 · Ask on run allowed · Ask on run by default · runtime `visual-references` | `[]` |
| **Maximum references per run** `maxItems`<br/>Limits how many images this step may resolve and pass to later steps. | `number` | Optional · 1–32 · Fixed only | `8` |
| **Can run without references** `optional`<br/>Keep enabled when references improve the result but are not required for the workflow to continue. | `boolean` | Optional · Fixed only | `true` |

## How to configure it

1. Connect Start workflow to the Run input.
2. Choose images from the canvas where the automation is opened or from the workspace Library. You can also enable Ask on run so the operator chooses them each time.
3. Connect References to AI context when the model should study the images, and to image planning or generation when their asset IDs may be assigned to a result.
4. Set a clear maximum so one run cannot attach an unexpectedly large reference set.

## Example flow

**Start workflow and chosen images → Analyze, plan or create images**

The step resolves the selected assets only when the run starts, then passes one stable reference package to every connected consumer.

## What happens at run time

- The saved workflow stores only stable asset IDs. Temporary URLs and storage paths are resolved server-side for an authorized run.
- Portable workflow exports clear local asset IDs and ask the installer to choose references in their own workspace.

## Practical notes

- Use Identity for a recognizable person or character; use Visual references for everything else.
- Select only images that have a clear job in the workflow. More references do not automatically produce a better result.
