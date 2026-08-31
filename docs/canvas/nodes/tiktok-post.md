---
title: TikTok post node
description: Imported post metadata, slideshow lineage, statistics refresh and downstream media.
---

# TikTok post node

**Internal kind:** `source`

A TikTok post node is the parent record created by a successful public TikTok import. It is not a generic URL card and cannot be created from the ordinary Add-node menu.

## Stored information

- original post URL and post ID when available;
- author and publication time;
- slideshow or video media type;
- views, likes, comments, shares and saves;
- stable lineage to the media created by that import;
- Hook extraction state.

Refreshing statistics updates the counters without downloading the media again. A refresh does not rewrite connected scenes or selected outputs.

## Output

For a slideshow, the post connects to one [Scene / media node](./scene-media.md) per source image in original order. For a video, it connects to a separate [Video source node](./video-source.md) that owns the editable timeline.

## Automation behavior

After media is stored, a successful import emits the versioned `tiktok.imported@1` Canvas event. Hook extraction is attempted separately; its failure is visible and retryable but does not roll back the imported media.

See [TikTok import and video scenes](../tiktok-import.md) for rate limits and media-processing details.
