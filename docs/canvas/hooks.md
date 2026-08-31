---
title: Hooks
description: Save, extract, search and generate hook variants without losing the source.
---

# Hooks

Hook Vault stores the opening text and angle separately from the visual nodes that introduced it.

## Sources

| Kind | Created by |
| --- | --- |
| Original | Extracted from the first visual of a TikTok import |
| Manual | Entered by a user, with an optional view count |
| Generated | Produced from an original or manual root with the workspace Hook role |

Generated hooks always point back to an original/manual root. Asking for a variant from an existing generated hook still uses that root, so variants do not drift through a chain of rewrites.

## Browse and search

Search looks at hook text and angle. Filters separate **All**, **Imported**, **Manual** and **AI variants**. The table shows source/result, type and angle, performance, source and date. Copy any hook directly from the row.

## Add a manual hook

Text is required and limited to 1,000 characters. Views are optional but cannot be negative. A manual hook can be associated with the current Canvas.

## Generate a variant

Set the workspace Hook role—product, audience, tone and restrictions—then generate from an original or manual source. The optional brief is limited to 2,000 characters. The API can request 1–10 variants; the current Hook Vault action requests one active compact variant.

Generation tries up to three times to avoid duplicates. After a successful request, previous generated variants for the same root are replaced by the new result set. The original/manual source is never deleted.
