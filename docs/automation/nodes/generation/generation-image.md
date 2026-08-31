---
title: "Image Generator"
description: "Creates images from exact prompts and reference roles prepared by connected workflow nodes. Complete settings, connections, runtime behavior and usage guidance."
---

# Image Generator

`generation.image@2`

## What this node does

Creates images from exact prompts and reference roles prepared by connected workflow nodes.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Generation | No | No |

## When to use it

Use this when one or more explicit image requests should become generated assets with the selected model settings.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Image requests `requests` | `image-request-batch` | Required · Single connection · Connectable |
| Output | Created images `assets` | `generated-assets` | Typed output · Connectable |
| Output | Error path `error` | `error` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **Image model** `modelId`<br/>Choose this step's image model independently from the same models available to Canvas Image Generator. | `model` | Required · Ask on run allowed · runtime `image-model` · model capability `image` | — |
| **Image shape** `ratio`<br/>Choose the format required by the destination, for example 9:16 for TikTok. | `select` | Required · Ask on run allowed · runtime `aspect-ratio` | — |
| **Image quality** `resolution`<br/>Higher resolutions may cost more and take longer, depending on the provider. | `select` | Required · Ask on run allowed · runtime `resolution` | — |
| **If only some images fail** `partialFailure`<br/>Keep the successful images, or stop without adding any result to the canvas. | `select` | Optional · Fixed only | Keep the images that succeeded (`keep-successful`) / Stop without adding results (`stop`) |
| **How many images to create at once** `concurrency`<br/>Higher is faster but uses more provider capacity at the same time. | `number` | Optional · 1–8 · Fixed only · Advanced | `3` |
| **Attempts for each image** `maxAttempts`<br/>Retries a slide when the provider request fails. | `number` | Optional · 1–5 · Fixed only · Advanced | `3` |
| **If every image fails** `failureMode`<br/>Stop the run or send the generation error to a connected recovery path. | `select` | Optional · Fixed only · Advanced | Stop and show the error (`stop`) / Send the error to another path (`error-output`) |

## How to configure it

1. Connect an Image requests package produced by a visible planning or adapter step.
2. Choose the image model, shape and quality.
3. Choose how partial failures should behave.
4. Connect Created images to a canvas or another asset-processing step.

## Example flow

**Prepared image requests → Canvas output**

The generator sends each exact prompt and ordered reference list without interpreting their creative meaning.

## What happens at run time

- Consumes only the canonical image-request batch; it contains no TikTok, wardrobe, location or text-policy logic.
- Model, ratio and resolution are mandatory visible settings. The selected ratio must be supported by every request's actual text or reference mode; incompatible requests stop instead of changing format.
- Per-item retries and partial-failure behavior are explicit. The effective concurrency cannot exceed the deployment's visible workflow execution policy, and model/reference capacity is validated before dispatch; these limits stop work but never rewrite a prompt.
- The provider transport keeps the exact request as USER_REQUEST and may prepend an ordered REFERENCE_MAP containing only the connected reference labels so uploaded images cannot be swapped.
- An explicit retry from this step runs image creation again; only completed upstream nodes before the selected retry point are reused.
- Stopping after a partial failure prevents results from being added to the canvas, but provider work that already completed may still be billed.

## Practical notes

- Build prompts and reference roles upstream so every creative decision stays visible.
- Keep concurrency within the provider capacity configured for the deployment.
