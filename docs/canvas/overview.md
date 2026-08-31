---
title: Canvas overview
description: How Scenelith keeps source media, references, generations and edits connected.
---

# Canvas overview

The Canvas is the visual source of truth for a creative project. It is designed to answer three questions without opening hidden configuration:

1. What did this result start from?
2. Which references and instructions shaped it?
3. Where can the work continue next?

## Common node paths

### Source to generation

Import or upload media, connect it to a generator, add references, then select one of the generated outputs.

### Image editing

Open an image, describe the change, and keep the original plus each edit available as separate evidence.

### Video work

Use video source and segment nodes to select time ranges. Video Master keeps scenes, versions and the final timeline together instead of flattening them into one irreversible export.

### TikTok adaptation

Import a public slideshow or video as visible source context. Rebuild the format with your own brief, references or Identity while keeping the source and result separate.

## Safe concurrent editing

Canvas writes use a collaboration revision. The interface and MCP both check that revision before applying a mutation. If something changed, refresh the project state and make the edit again against the current revision.

## Portable projects

Canvas projects can be exported as a versioned `.scenelith.json` document. Portable documents contain graph structure and safe settings, but never stored credentials, private media URLs or generated output files.
