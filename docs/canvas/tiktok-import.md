---
title: TikTok import and video scenes
description: What Scenelith stores for slideshows and video posts, and how video cuts remain editable.
---

# TikTok import and video scenes

Paste a direct TikTok post URL into the Canvas import field. The importer resolves the post, downloads its media into the current workspace/project, records post metadata, fires the `tiktok.imported` Automation event and attempts to extract a Hook from the first visual.

Imports are rate-limited to six requests per user in ten minutes.

## Slideshow import

Each source image becomes a stored asset and a separate Scene node in original order.

- First screen role: `hook`
- Last screen role: `cta`
- Middle screens: `slide`

The parent TikTok post node connects to every screen. The original source URL and post statistics remain on the parent.

## Video import

Scenelith stores the full source video, analyzes every decoded frame with FFmpeg scene scoring and creates a scene boundary only when the score reaches the conservative `0.30` threshold. Nearby candidates are clustered; tiny fragments at the beginning or end are absorbed; at most 80 scenes are retained.

The result is one editable Video source node, not dozens of independent clips. It contains:

- start/end time and confidence for every detected scene;
- the first frame thumbnail for every scene;
- a dense timeline sprite sampled up to 15 frames per second;
- immutable import-time cuts;
- current editable cuts.

The first detected scene is a `hook`, the last is a `cta`, and the rest are `scene`.

## Editing cuts

Move cuts in the video timeline or set an exact ordered cut list through MCP. Select **Full video** or one scene as the node output. **Restore detected cuts** returns to the import-time scene map.

When a cut changes, a previously materialized clip is kept only if its exact start and end still match. Replacements are independent: the original source remains available and a replacement can sit on the scene's output path.

## Extracting a frame or scene

**Capture frame** creates a PNG Scene node at an exact time. **Materialize scene** renders a reusable MP4 segment, including source audio when present. A materialized range must be longer than zero and no longer than 30 seconds.

Materialization is idempotent for the same source asset and exact start/end range. If somebody changes the scene boundaries while rendering, the new asset is returned but is not attached to the now-different scene.

## Video Master

Open the source as Video Master to retain every detected scene as an ordered editable sequence. Each sequence entry stays linked to its exact original segment; you can replace or generate scenes without destroying the source lane.

## Hook extraction

Scenelith tries to read visible hook text, angle and language from the first imported visual. Failure does not roll back the media import. The source displays **hook extraction needs retry**, and you can run extraction again from Hook Vault.
