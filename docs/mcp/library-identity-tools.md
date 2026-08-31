---
title: Library and Identity tools
description: Inspect visual evidence, place assets and maintain separated Identity groups.
---

# MCP Library and Identity tools

## Inspect before choosing

`list_library_assets` returns a cursor-paginated page with stable asset IDs, media metadata and counts. Browser URLs may require an authenticated Scenelith session, so an agent that must visually judge an item should call `inspect_library_asset`; videos return a representative frame.

`list_identities` returns Identity type, separated Character/Before/After groups, order and accessible Library lineage. Call `inspect_identity_reference` to see one reference image.

## Asset operations

| Intent | Tool |
| --- | --- |
| Upload bounded media | `upload_library_asset` |
| Place media as a Canvas node | `place_canvas_asset` |
| Attach a direct reference | `attach_canvas_reference` |
| Remove a direct reference | `detach_canvas_reference` |
| Add Library video to Video Master | `add_video_master_asset` |

MCP upload accepts bounded base64 JPG, PNG, MP4, MOV or WebM. It rejects arbitrary server file paths and remote URLs. Use the product upload UI for large videos.

## Identity operations

`create_identity_from_assets` copies approved Library images into a new explicit Identity type:

- `single`: Character/Reference group only;
- `before_after`: Before and After groups only.

Then use `add_identity_references`, `reorder_identity_references` and `remove_identity_reference`. Videos are never accepted. Reordering requires the complete current list for one group, and an Identity must retain at least one image.

Creating or adding references copies them into the Identity store; the original Library assets remain unchanged.

## Access boundary

The consent screen separately controls project/Canvas access and Library visibility. An agent cannot create an Identity from a Library image outside its approved projects. Workspace-level Identity references can still be listed without leaking source Library lineage that belongs to an unapproved Canvas.
