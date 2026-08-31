---
title: Generated output node
description: Compatibility behavior for explicit generated-media branches and older saved canvases.
---

# Generated output node

**Internal kind:** `generation`

Generated output is a persisted image/video result card used by older Canvas graphs and explicit output branches. New Generator nodes normally keep their alternatives in the Generator's own output history.

## Stored information

The node can retain the selected asset ID, media URL/type, model ID, generation time and the reference asset IDs that produced it. Those reference IDs are provenance; connecting the output forwards the selected output asset, not every hidden provenance asset.

## Output

The node exposes its selected image or video as typed media. It can continue into a compatible Generator, be inspected/downloaded, or—when it is an image with a durable asset ID—be added to an Identity.

This kind remains part of the portable document contract so valid existing projects do not lose their output branches during import/export.
