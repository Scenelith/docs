---
title: Video Master node
description: Ordered scene editing, source/output lanes, per-scene generation and export.
---

# Video Master node

**Internal kind:** `videoMaster`

Video Master is an ordered multi-scene editor. It keeps original source evidence, replacements and generated versions on one inspectable timeline.

## Scene contract

Each scene stores sequence index, role, origin, timeline duration, prompt, model, ratio, resolution, audio choice, scene-specific references and saved output alternatives. Imported scenes additionally retain their source node, segment ID and exact trim range.

## Lanes and actions

- **Original** lane keeps source or uploaded media.
- **Output** lane keeps selected replacement/generated media.
- Add, remove or reorder scenes.
- Move uploaded media between lanes.
- Configure and generate one scene.
- Select a saved alternative or copy an output to another scene.
- Export one scene or the full ordered sequence from either lane.

Generation duration may differ from the timeline duration; playback/export trims the chosen media to the timeline contract. Model availability is filtered against the scene's source/reference shape.

## Connections

References are attached to a specific scene, not globally to the whole master. Source-video segment connections retain segment IDs and exact range metadata. The node's output represents the selected scene or rendered sequence, depending on the operation.
