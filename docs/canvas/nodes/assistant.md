---
title: Assistant node
description: Text-model tasks, system instructions, connected context and reusable output.
---

# Assistant node

**Internal kind:** `assistant`

Assistant understands connected context and returns text. It does not render image or video media.

## Inputs and settings

- required task/instruction;
- optional persistent system role;
- connected text from Hook or another Assistant;
- connected images or Identity evidence;
- one model from the current Assistant catalogue.

Visual references require a vision-capable model. The current service accepts an instruction up to 10,000 characters, connected text up to 20,000 characters, a system prompt up to 10,000 characters and at most 14 distinct image assets. The browser endpoint is limited to 30 Assistant requests per user per minute. Oversized or unsupported input is rejected before provider dispatch.

## Output

The text result is stored on the node and exposed through its text output. Connect it to a Generator prompt input or another Assistant. The result remains inspectable; Scenelith does not automatically execute it as a media request.

The separate Generator **prompt assistant** composes a generation-ready prompt inside a Generator. It uses the same Assistant model catalogue but is not a second Canvas node.

See [Assistant](../assistant.md) for model and charging behavior.
