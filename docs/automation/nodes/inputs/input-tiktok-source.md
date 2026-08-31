---
title: "TikTok source"
description: "Brings the chosen TikTok slideshow and an explicitly selected caption mode into the workflow. Complete settings, connections, runtime behavior and usage guidance."
---

# TikTok source

`input.tiktok-source@2`

## What this node does

Brings the chosen TikTok slideshow and an explicitly selected caption mode into the workflow.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Inputs | No | No |

## When to use it

Use this when later steps need the original TikTok slideshow, caption and ordered source frames.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Run `run` | `run-context` | Required · Single connection · Connectable |
| Output | Source `source` | `tiktok-source` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **Source slideshow** `source`<br/>Choose it now, or ask for a different slideshow whenever this workflow runs. | `select` | Required · Ask on run allowed · Ask on run by default · runtime `tiktok-source` | — |
| **Caption** `captionMode`<br/>Choose explicitly whether to preserve, replace or remove the original caption. | `select` | Optional · Ask on run allowed · runtime `string` | Use original caption (`original`) / Use replacement caption (`replacement`) / Use no caption (`empty`) |
| **Replacement caption** `caption`<br/>Used only when Caption is set to Use replacement caption. Placeholder: Write the replacement caption… | `textarea` | Optional · Ask on run allowed · Required when visible · runtime `string` · visible when `captionMode` is "replacement" | `` |

## How to configure it

1. Connect Start workflow to the Run input.
2. Choose a fixed slideshow, or enable Ask on run so the person can choose one each time.
3. Choose explicitly whether the output keeps the original caption, uses replacement text or contains no caption.
4. Connect Source to the first AI, planning or generation step that studies the original post.

## Example flow

**Start workflow → Analyze slideshow**

The run starts, this step loads the chosen post, and the analysis step receives the same ordered source package.

## What happens at run time

- Outputs a typed tiktok-source package, not only a URL.
- The package contains ordered assets and source metadata used by downstream reference-aware steps.

## Practical notes

- Choose Ask on run for reusable workflows.
- Keep the original caption unless the workflow intentionally starts from different copy.
