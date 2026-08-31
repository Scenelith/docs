---
title: "Validate Recreate TikTok plans"
description: "Checks every plan against the explicit Recreate TikTok v1 contract before images are created. Complete settings, connections, runtime behavior and usage guidance."
---

# Validate Recreate TikTok plans

`logic.validate-slide-plans@2`

## What this node does

Checks every plan against the explicit Recreate TikTok v1 contract before images are created.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Logic | No | Yes |

## When to use it

Use this as the final deterministic gate for the Recreate TikTok slide-plan contract before image generation.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Slide plans `data` | `data` | Required · Single connection · Connectable |
| Input | Original generation contract `contract` | `data` | Optional · Single connection · Connectable |
| Input | Original slideshow `source` | `tiktok-source` | Optional · Single connection · Connectable |
| Input | Person or character `identity` | `identity` | Optional · Single connection · Connectable |
| Input | Visual references `references` | `visual-references` | Optional · Single connection · Connectable |
| Output | Checked plans `plans` | `slide-plan-set` | Typed output · Connectable |
| Output | Validation error `error` | `error` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **Validation contract** `profile`<br/>This version enforces the visible fields and exact prompt/reference rules of Recreate TikTok v1. It does not infer another workflow profile. | `select` | Required · Fixed only · Read-only | Recreate TikTok v1 (`recreate-tiktok-v1`) |
| **Maximum slides allowed** `maxSlides`<br/>Stops the workflow when the plan unexpectedly contains more slides than you intended. | `number` | Optional · 1–40 · Fixed only | `40` |
| **If validation fails** `failureMode`<br/>Stop the run or send the exact validation error to an explicit repair path. | `select` | Optional · Fixed only · Advanced | Stop and show the error (`stop`) / Send the error to a repair path (`error-output`) |

## How to configure it

1. Connect the completed slide plans.
2. Connect Original generation contract for full choice, copy and prompt enforcement. Without it, this step performs structural checks only.
3. Also connect the original slideshow and optional identity so indexes and reference IDs can be checked.
4. Set the maximum number of slides.
5. Connect Checked plans to image creation.
6. When repair is allowed, set failure behavior to Send the error and connect the error to a repair step and bounded Retry gate.

## Example flow

**Plan and review slides → Image Generator**

Only complete, ordered and bounded plans reach the image provider.

## What happens at run time

- Validates the model-authored Recreate TikTok slide-plan-set contract without adding, rewriting or repairing prompt fields.
- When Original generation contract is connected, it enforces that workflow's visible adaptation, wardrobe, location, text, reference-role and creative-requirement fields. Without that optional connection, validation is explicitly structural: schema, indexes, reference availability and slide limits only.
- Model reference capacity is checked by generation because the model can be chosen at run time.
- Error output contains the exact deterministic failure and never substitutes a fallback plan.

## Practical notes

- Keep this check even when an AI review step already approved the content.
- AI review judges quality; this step enforces the mechanical contract.
