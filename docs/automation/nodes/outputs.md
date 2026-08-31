---
title: Output nodes
description: Complete inputs, outputs, settings and runtime guidance for the current nodes in Outputs.
---

# Output nodes

This page is generated from the current Automation registry and contains **2 current nodes** in the **Outputs** category.

## Add slideshow to canvas {#output-add-to-canvas}

`output.add-to-canvas@3`

Places canonical generated-image results on the content canvas and preserves the complete plan without silent truncation.

**Registry metadata:** category `output`; icon `canvas`; accent `mint`; terminal yes; retry-safe no. Example: Put the new slideshow beside its TikTok source so you can compare, edit and continue from either version.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Created images `assets` | `generated-assets` | Required · Single connection · Connectable |
| Input | Original source `source` | `tiktok-source` | Optional · Single connection · Connectable |
| Output | Canvas update receipt `result` | `canvas-result` | Typed output · Run-history value; no graph handle |

| Setting | Kind | Contract | Default / choices |
| --- | --- | --- | --- |
| **Where should results appear?** `layout`<br/>Choose whether to keep the new branch beside the source or place it on a separate row. | `select` | Optional · Fixed only | Beside the source (`beside-source`) / On a new row (`new-row`) |
| **Show the plan beside the images** `includePlanNote`<br/>Adds as many bounded notes as needed to preserve the complete generation plan. | `boolean` | Optional · Fixed only | `true` |

**Use it when:** Use this when generated assets should appear on the main content canvas as an editable result branch.

**Setup**

1. Connect Created images.
2. Optionally connect the original source so the result can be positioned beside it.
3. Choose the layout.
4. Decide whether to include a plan note for future editing.

**Example path:** Created images → Editable canvas branch. The automation run finishes by placing reusable nodes on the canvas instead of returning only hidden data.

**Tips:** Use Finish without adding to canvas for non-visual automations. Keeping the plan note makes later manual edits easier to understand.

**Technical behavior:** Terminal canvas side effect that creates generated-image nodes and lineage links from the connected source when present. The selected layout determines placement; Show the plan determines whether a generated plan note is added. Test and single-step preview runs return a preview receipt and never change the content canvas. Emits a canvas-result receipt but does not accept outgoing workflow connections.

## Finish without adding to canvas {#output-finish}

`output.finish@1`

Ends this path and reports its result without creating new canvas nodes.

**Registry metadata:** category `output`; icon `finish`; accent `neutral`; terminal yes; retry-safe no. Example: Use this after sending data to an external service when there is nothing visual to add to the canvas.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Final information `data` | `data` | Required · Single connection · Connectable |
| Output | Run result receipt `result` | `workflow-result` | Typed output · Run-history value; no graph handle |

| Setting | Kind | Contract | Default / choices |
| --- | --- | --- | --- |
| **How should this path finish?** `outcome`<br/>Finish successfully with the incoming information, or deliberately mark this workflow path as failed. | `select` | Optional · Fixed only | Finish successfully (`completed`) / Stop the workflow with this error (`failed`) |
| **Message shown in the run result** `message`<br/>Use &#123;&#123; data &#125;&#125;, &#123;&#123; run &#125;&#125; or &#123;&#123; trigger &#125;&#125; when the message should include a value from this run. Placeholder: Example: Caption sent for publishing | `text` | Optional · Fixed only | `Workflow finished` |

**Use it when:** Use this to end a non-visual path and expose its final result without adding anything to the content canvas.

**Setup**

1. Connect the final information.
2. Choose whether the path is successful or failed.
3. Write a short result message that an operator will understand.

**Example path:** External service response → Completed run. The workflow records a clear outcome and final data, then stops this path.

**Tips:** Use a specific message such as Caption sent for publishing. Every path should eventually reach a terminal step or an intentional terminal operation.

**Technical behavior:** Terminal result node with no outgoing workflow connection. A successful outcome stores the final data and message as the run result. A failed outcome deliberately throws the message and marks the run as failed instead of producing a success receipt.
