---
title: Library
description: Durable project media, uploads, generated outputs and Canvas placement.
---

# Library

Library is the durable media layer for accessible Canvases. It combines explicit Library uploads and generated image/video outputs. Imported source media remains project media but is surfaced only where the Library query and access policy allow it.

## Scope

Every asset belongs to a workspace and project/Canvas. A user or MCP connection sees only projects and Canvases it can access. MCP additionally requires **Allow Library access** at consent time.

Library can be filtered by project, image/video type and a search over filename, original name or Canvas. Results are paginated in groups of 72 and include counts for All, Images and Videos.

## Upload limits

| Rule | Library upload | Direct Canvas upload |
| --- | ---: | ---: |
| Files per action | 20 | 12 |
| Image formats | JPG, PNG | JPG, PNG |
| Video formats | MP4, MOV, WebM, M4V | MP4, MOV, WebM, M4V |
| Max image | 25 MB each | 25 MB each |
| Max video | 250 MB each | 250 MB each |
| Combined batch | 280 MB | 280 MB |

The server validates the actual file signature against its declared format. Uploads are also limited by workspace storage capacity.

## Asset metadata

A Library record can include media type, MIME type, original filename, byte size, width, height, aspect ratio, duration, model ID and generation metadata. Thumbnails are derived for efficient browsing; opening or downloading uses the full asset.

## Place on Canvas

Placing an image creates a Scene node. Placing a video creates a video Scene/source node suitable for playback and model-specific video inputs. Placement does not duplicate the underlying Library bytes.

From a generated image you can also create an Identity or add the image to an existing Identity group.

## MCP

Agents can list with a cursor, inspect a single asset, upload a data/remote asset when permitted, place it on a Canvas, or attach/detach it as a Generator/Video Master reference. The asset ID and Canvas node ID are different objects and must not be interchanged.
