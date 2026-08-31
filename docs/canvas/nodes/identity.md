---
title: Identity node
description: Ordered Character or Before/After evidence placed on the Canvas.
---

# Identity node

**Internal kind:** `persona`

An Identity node points to one saved Identity and one explicit reference group: `reference`, `before` or `after`. It is visual evidence, not a text-only persona description.

## Inputs and settings

The node stores the Identity ID, selected group and the ordered image asset IDs resolved for that group. Character identities use `reference`; Before/After identities keep `before` and `after` independent.

## Output

One visible Identity card can intentionally supply several ordered images. A receiving Generator still applies the selected model's reference capacity. Assistant receives the images only when its selected model supports vision.

The Identity name and notes do not establish visual consistency by themselves. Only the selected images are sent as visual evidence.

See [Identities](../identities.md) for creation, limits and maintenance rules.
