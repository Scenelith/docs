---
title: "Prepare slideshow image requests"
description: "Converts checked TikTok slide plans into exact generic image requests without changing their prompts. Complete settings, connections, runtime behavior and usage guidance."
---

# Prepare slideshow image requests

`logic.prepare-slideshow-image-requests@1`

## What this node does

Converts checked TikTok slide plans into exact generic image requests without changing their prompts.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Logic | No | Yes |

## When to use it

Use this after TikTok slide-plan validation to turn the checked domain contract into the one generic image-request contract.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Checked slide plans `plans` | `slide-plan-set` | Required · Single connection · Connectable |
| Input | Original slideshow `source` | `tiktok-source` | Required · Single connection · Connectable |
| Input | Person or character `identity` | `identity` | Optional · Single connection · Connectable |
| Input | Visual references `references` | `visual-references` | Optional · Single connection · Connectable |
| Output | Image requests `requests` | `image-request-batch` | Typed output · Connectable |

## Settings

This node has no configurable fields. Its behavior is determined by its typed connections and the workflow run context.

## How to configure it

1. Connect Checked plans and the original slideshow.
2. Connect the same optional identity and visual-reference packages used by validation.
3. Connect Image requests to the generic Image Generator.

## Example flow

**Validated TikTok slide plans → Image Generator**

This visible adapter serializes each approved prompt and exact reference list; the generator itself does not know about TikTok, clothing, locations or text policy.

## What happens at run time

- Outputs schemaVersion 1 image requests with one exact prompt, ordered asset ids, roles and labels per item.
- It does not call a provider or choose model settings.

## Practical notes

- Keep domain-specific transformations in explicit adapter nodes.
- Do not bypass validation when the source plans came from an AI step.
