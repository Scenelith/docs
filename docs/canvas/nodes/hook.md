---
title: Hook node
description: Saved hook text placed on Canvas as explicit text context.
---

# Hook node

**Internal kind:** `hook`

A Hook node carries one saved hook's text and lineage from Hook Vault. It can represent imported, manually saved or AI-generated copy.

## Output

The node exposes text. Connect it to Assistant for analysis/rewriting or to a Generator text input when the hook should influence the media prompt.

Placing or connecting a Hook does not regenerate it. Generated variants continue to point to the original/manual root so repeated adaptation does not drift through a rewrite chain.

See [Hooks](../hooks.md) for extraction, search, performance fields and variant generation.
