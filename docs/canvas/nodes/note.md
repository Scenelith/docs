---
title: Note node
description: Freeform Canvas annotation behavior, colors and non-executable semantics.
---

# Note node

**Internal kind:** `note`

A Note is a freeform Canvas annotation. It stores a title/text, size and one of four styles: yellow, blue, rose or gray.

Notes do not run, do not call a provider and do not expose typed image/video/audio output. Their text is not automatically included in Assistant or Generator context.

Automation can add bounded plan notes beside generated results, and MCP can create/configure a Sticky Note. To use note text as model context, copy it into a supported text input explicitly.
