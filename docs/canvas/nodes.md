---
title: Canvas node reference
description: Browse every user-visible Canvas node, its internal kind, creation path and typed output.
---

# Canvas node reference

The Canvas is a typed graph. Text, image, video and audio connections stay explicit; changing a model does not silently convert an incompatible input.

Scenelith currently persists **9 internal node kinds** but exposes **10 user-visible node forms**. TikTok post and Video source both use the internal `source` kind because one imported video produces a post record plus a separate editable video source.

| Node | Internal kind | How it is created | Main output |
| --- | --- | --- | --- |
| [TikTok post](./nodes/tiktok-post.md) | `source` | TikTok import | Post metadata and ordered imported media |
| [Video source](./nodes/video-source.md) | `source` | Video import or video placement | Full video or one selected scene |
| [Scene / media](./nodes/scene-media.md) | `scene` | Import, upload, Library, frame capture or segment materialization | Image or video |
| [Identity](./nodes/identity.md) | `persona` | Identity placement | Ordered reference images from one group |
| [Hook](./nodes/hook.md) | `hook` | Hook Vault | Text |
| [Generator](./nodes/generator.md) | `prompt` | Add/continue menu, remake branch or MCP | Generated image or video |
| [Assistant](./nodes/assistant.md) | `assistant` | Add/continue menu or MCP | Text |
| [Generated output](./nodes/generated-output.md) | `generation` | Older canvases and explicit output branches | Image or video |
| [Video Master](./nodes/video-master.md) | `videoMaster` | Open a video sequence or MCP | Selected scene or rendered sequence |
| [Note](./nodes/note.md) | `note` | Add menu, Automation result or MCP | No typed media output |

## Connection rules

- Text connects to an Assistant or Generator text input.
- Images connect to an image-reference input or to a video model port that accepts a start/end/reference image.
- Videos connect only to model ports that accept video, motion video or reference video.
- Audio connects only to a model reference-audio port.
- Model limits decide whether an input role is available and how many references it accepts.
- A single-value input replaces its previous connection; multi-reference inputs keep entries up to the selected model's capacity.

Direct references attached from Library or Identities are stored separately from visible node-to-node edges. Removing an edge does not remove a direct attachment, and detaching a direct reference does not remove a visible edge.

## Revision safety

The browser persists graph changes through realtime collaboration. API and MCP writes require the current Canvas `revision`; a stale mutation fails instead of overwriting a newer graph.
