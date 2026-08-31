---
title: Scene and media node
description: Canvas images and videos created by imports, uploads, Library placement, frame capture and materialization.
---

# Scene and media node

**Internal kind:** `scene`

A Scene is a concrete image or video placed on the Canvas. The durable bytes live in project storage/Library; the node owns placement, display metadata, role and graph relationships.

## Creation paths

- one screen from a TikTok slideshow;
- direct Canvas upload;
- Library placement;
- captured frame from a video;
- materialized video segment;
- media placed by MCP.

## Roles

Image scenes can record a semantic screen role such as `hook`, `before`, `after`, `transition`, `proof`, `education`, `checklist`, `infographic`, `comparison`, `app_or_score`, `cta` or general `scene`. The role describes intent and does not alter the asset.

## Output

An image exposes image media. A video exposes video media and duration metadata. Connect it to a Generator as model-compatible evidence, use it as Assistant visual context, add a generated image to an Identity, or continue into another media branch.

Placing an existing Library asset does not duplicate its stored bytes. Deleting the Canvas node does not imply deletion of the Library asset.
