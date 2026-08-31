---
title: Video source node
description: Full imported video, detected and editable cuts, scene outputs and replacement media.
---

# Video source node

**Internal kind:** `source`

A Video source is the editable media node created for an imported video or a placed video asset. It keeps the full source and the scene map together rather than creating disconnected clips for every cut.

## Stored information

- original stored video and measured duration/aspect ratio;
- immutable cuts detected at import;
- current ordered editable cuts;
- confidence and first-frame thumbnail for each detected scene;
- dense timeline sprite;
- optional materialized clip and replacement for each scene;
- current output selection: full video or one scene.

## Actions

Select the full video or one scene, move or replace cuts, restore the detected boundaries, capture an exact frame, materialize a reusable segment, upload/generate a replacement, or open the sequence in Video Master.

Changing a cut invalidates a materialized clip when its exact start/end range no longer matches. Restoring cuts preserves a replacement only where the restored scene still represents the same range.

## Output and connections

The full video uses the video output. Individual scenes use segment-specific outputs that retain segment ID and exact start/end metadata. A compatible Generator can receive the video as motion/reference video; Video Master can receive the ordered source sequence.
