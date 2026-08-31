---
title: Canvas nodes
description: Every node type that can exist on a Scenelith Canvas and how it connects.
---

# Canvas nodes

The Canvas is a typed graph. A connection is valid only when the source output and target input are compatible. Image, video, audio and text do not silently convert into one another.

## Node inventory

| Node | Internal kind | Created by | Main output |
| --- | --- | --- | --- |
| TikTok post | `source` | TikTok import | Source metadata and imported media |
| Video source | `source` | Video TikTok import or upload | Full video or selected detected scene |
| Scene / media | `scene` | Slideshow import, upload, Library placement or frame capture | Image or video |
| Identity | `persona` | Identities panel or MCP placement | Ordered visual references |
| Hook | `hook` | Hook Vault | Text |
| Generator | `prompt` | Add menu or a remake branch | Generated image or video |
| Assistant | `assistant` | Add menu | Text or structured result |
| Generated output | `generation` | Older saved canvases and completed output branches | Image or video |
| Video Master | `videoMaster` | Open a video sequence or add through MCP | Selected scene or rendered sequence |
| Note | `note` | Add menu | No typed media output |

`generation` is retained for existing graphs and explicit output branches. Current Generator nodes can also keep their own saved output history.

## TikTok post

The post node records the original URL, post ID when available, author, publication time, media type and the latest imported statistics: views, likes, comments, shares and saves. Refreshing statistics updates those values without importing the media again.

For a slideshow it connects to one Scene node per ordered screen. For a video it connects to a second editable Video source node that owns the scene map.

## Video source

A video source owns:

- the original stored video;
- the immutable cuts detected at import;
- the current editable cuts;
- a dense thumbnail sprite for the timeline;
- a selected output: the full video or one scene;
- optional materialized clip and replacement media for each scene.

Changing a cut invalidates a materialized clip whose exact start/end range no longer matches. **Restore detected cuts** restores the import-time boundaries while preserving replacements where the same scene still matches.

## Scene / media

A Scene can hold an image or a video. Common origins are imported slideshow screens, Library assets, Canvas uploads, captured video frames and materialized source-video segments.

Image scenes can be assigned a semantic role such as `hook`, `before`, `after`, `transition`, `proof`, `education`, `checklist`, `infographic`, `comparison`, `app_or_score`, `cta` or general `scene`. The role describes the screen; it does not change the media bytes.

Connect a scene to a Generator as a visual reference. A video scene can also supply a video input accepted by the selected model.

## Identity

An Identity node points to a saved Identity and one of its reference groups: `reference`, `before` or `after`. It sends ordered image evidence, not a textual description of a person. The receiving Generator or Assistant sees only the selected group or the explicitly attached references.

## Hook

A Hook node carries saved hook text. It can be copied, connected as text context, or used to preserve a proven angle while producing a new visual branch.

## Generator

One Generator changes between image and video behavior when its model changes. Its settings are validated against that model.

Common inputs:

- prompt text from the node or a connected Assistant;
- visual reference images;
- an Identity reference group;
- model-specific start frame, end frame, motion video, reference video and reference audio ports.

Common settings:

- model;
- aspect ratio;
- resolution;
- duration for video models that expose one;
- native audio when supported;
- output count for images;
- prompt.

The node shows an estimated credit cost before a Cloud run. Completed outputs are saved with their model and media metadata and appear in the Library.

## Assistant

The Assistant receives instructions plus connected text and visual context. It can return text for the next Generator or structured data for inspection. See [Assistant](./assistant.md).

## Video Master

Video Master is an ordered multi-scene editor. Each scene has:

- sequence order and role;
- original lane and output lane;
- prompt, model, ratio, resolution, duration and audio setting;
- references attached specifically to that scene;
- saved generated alternatives.

Imported source scenes keep their exact source node, segment ID and trim range. Uploaded Library clips can move between Original and Output lanes. You can generate one scene, select a saved version, copy an output to another scene, add/remove/reorder scenes, or export one scene or the full sequence from either lane.

## Note

Notes are freeform Canvas annotations with yellow, blue, rose or gray styling. They do not run and do not count as model context unless their text is deliberately passed through another supported input.

## Revision safety

The browser saves the current graph as it changes. MCP mutations require the exact `revision` returned by `get_canvas`. If somebody edits nodes or connections after the agent read the Canvas, the mutation is rejected with a revision conflict; the agent must read again and reapply its intent.
