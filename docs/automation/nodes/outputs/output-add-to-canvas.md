---
title: "Add slideshow to canvas"
description: "Places canonical generated-image results on the content canvas and preserves the complete plan without silent truncation. Complete settings, connections, runtime behavior and usage guidance."
---

# Add slideshow to canvas

`output.add-to-canvas@3`

## What this node does

Places canonical generated-image results on the content canvas and preserves the complete plan without silent truncation.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Outputs | Yes | No |

## When to use it

Use this when generated assets should appear on the main content canvas as an editable result branch.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Created images `assets` | `generated-assets` | Required · Single connection · Connectable |
| Input | Original source `source` | `tiktok-source` | Optional · Single connection · Connectable |
| Output | Canvas update receipt `result` | `canvas-result` | Typed output · Run-history value; no graph handle |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **Where should results appear?** `layout`<br/>Choose whether to keep the new branch beside the source or place it on a separate row. | `select` | Optional · Fixed only | Beside the source (`beside-source`) / On a new row (`new-row`) |
| **Show the plan beside the images** `includePlanNote`<br/>Adds as many bounded notes as needed to preserve the complete generation plan. | `boolean` | Optional · Fixed only | `true` |

## How to configure it

1. Connect Created images.
2. Optionally connect the original source so the result can be positioned beside it.
3. Choose the layout.
4. Decide whether to include a plan note for future editing.

## Example flow

**Created images → Editable canvas branch**

The automation run finishes by placing reusable nodes on the canvas instead of returning only hidden data.

## What happens at run time

- Terminal canvas side effect that creates generated-image nodes and lineage links from the connected source when present.
- The selected layout determines placement; Show the plan determines whether a generated plan note is added.
- Test and single-step preview runs return a preview receipt and never change the content canvas.
- Emits a canvas-result receipt but does not accept outgoing workflow connections.

## Practical notes

- Use Finish without adding to canvas for non-visual automations.
- Keeping the plan note makes later manual edits easier to understand.
