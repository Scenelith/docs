---
title: Canvas tools
description: Safe read-before-write flows for nodes, connections, media, Assistant and generation.
---

# MCP Canvas tools

Agents should use semantic tools instead of constructing raw graph records. Semantic tools apply the same model, media, port and reference validation as the Canvas UI.

## Start every task with reads

```text
list_workspaces
→ list_canvases
→ get_canvas
→ get_canvas_capabilities
```

`get_canvas` returns the complete graph and its `revision`. Every content write must use that current revision. After a successful write, use the revision in the returned Canvas for the next write.

## Create and configure

`create_canvas_node` creates an Image Generator, Video Generator, Assistant or Sticky Note. `configure_canvas_node` changes semantic settings and normalizes model, ratio, resolution, duration, audio and batch choices against the live catalogue.

Use `place_canvas_asset` for media and `place_canvas_identity` for Identity evidence. Do not emulate those objects with `create_canvas_node`.

`connect_canvas_nodes` derives exact handles from the requested role and validates text/image/video/audio compatibility. Single-value inputs replace only their prior connection; multi-reference ports preserve permitted entries up to model capacity.

## References

- `attach_canvas_reference`: attach an approved Library or Identity image/video/audio directly to a target input.
- `detach_canvas_reference`: remove one direct attachment.
- `inspect_canvas_node_inputs`: resolve connected Assistant text and concrete asset IDs, including video segments that still need materialization.

Visible node-to-node edges are removed with `patch_canvas` using `remove_edge`; direct reference attachments use `detach_canvas_reference`.

## Assistant and generation

```text
get_canvas → inspect_canvas_node_inputs
→ run_canvas_assistant or compose_canvas_prompt
→ run_canvas_generation
→ get_canvas_generation until terminal
```

Assistant and model runs can consume Cloud credits or self-hosted provider usage. A result is saved only if the node inputs still match when the provider returns. Completed generation media is stored in Library and merged into output history. `select_canvas_output` switches the active saved output without deleting alternatives.

Use `cancel_canvas_generation` only for a queued/active generation. Cancellation settles or releases the reservation and clears running state.

## Low-level patching

`patch_canvas` is for atomic viewport, position, removal and Canvas-name changes. Content creation/configuration belongs to semantic tools. This division prevents an agent from inventing invalid model fields or bypassing reference policy.

## Portable documents

`export_canvas_document` removes instance IDs, private URLs and generated output bytes. `import_canvas_document` validates the portable package and assigns fresh Canvas/node/edge/Video Master scene IDs. Unknown fields and embedded secrets fail closed.
