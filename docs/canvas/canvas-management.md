---
title: Create, switch and move Canvases
description: Canvas ownership, naming, switching and portable .scenelith.json import/export.
---

# Create, switch and move Canvases

One saved Canvas is one project resource. The Canvas switcher lists only projects the current account can access; switching loads that Canvas's collaborative graph, saved viewport and project-scoped resources.

## Create and rename

Workspace owners can create a Canvas from the **Canvases** panel. An empty name is replaced with the next `Canvas NN` label. The saved name is limited to 120 characters and can be edited from the Canvas header.

Team members cannot create a Canvas in an owner's workspace. Their switcher contains only the exact Canvases granted by that owner.

## Export

Choose **Canvases → Export** to download the current Canvas as `<name>.scenelith.json`. Export is available to anyone who can access that Canvas.

The portable document contains a versioned graph, safe node settings, connections and declared external inputs. It excludes instance IDs, private media URLs, stored media bytes, generated-output files and credentials.

## Import

Workspace owners can choose **Canvases → Import** and select a `.scenelith.json` document up to 5 MB. Import validates the complete document, rejects unknown fields and embedded secrets, assigns fresh Canvas/node/connection/Video Master scene IDs and creates an isolated draft Canvas.

Media and deployment resources are deliberately not smuggled across instances. After import, reconnect any required local media, Identity evidence, credentials or published subworkflows before running the project.

## Concurrent changes

Each Canvas graph has a collaboration revision. A stale whole-graph update is rejected with the latest state instead of overwriting another session. Selection is local UI state; graph content and the saved viewport are the durable shared state.

## Deletion boundary

Deleting a Canvas is an owner-only destructive API operation. It removes the project and its project-owned records and evicts the collaborative document; it is not exposed as a routine button in the current Canvas switcher. Export anything that must be retained before using that operation.
