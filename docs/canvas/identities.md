---
title: Identities
description: Character and Before/After reference groups, ordering and generation use.
---

# Identities

An Identity is a reusable ordered set of image evidence. It can represent one consistent Character or keep separate **Before** and **After** states.

## Reference groups

| Group | Purpose |
| --- | --- |
| Reference | General character/product/location evidence where no transformation state is needed |
| Before | Evidence for the initial state |
| After | Evidence for the resulting state |

These groups are not labels painted onto one mixed list. Each group has its own order, and a Canvas Identity node or model request selects the intended group. The Identity avatar prefers the first After image, then Reference, then the first remaining image.

## Create an Identity

Provide a name and at least one image in any group. Notes are optional.

- Name: stored up to 80 characters
- Notes: stored up to 2,000 characters
- Images: JPG or PNG only
- Maximum: 100 references total across all groups
- Per image: under 25 MB
- Combined upload: at most 280 MB

You can also create an Identity from a generated Library image and choose its initial group.

## Maintain references

Add uploaded or generated images to Reference, Before or After. Adding the same generated asset to the same Identity/group is idempotent. Reorder a whole group by supplying the complete current ordered asset list; if references changed meanwhile, the reorder is rejected rather than silently dropping an image.

You may delete a reference while at least one remains across the Identity. Deleting the final reference is blocked.

## Use on Canvas

Place an Identity node and choose a group. Connect it to a Generator or Assistant. A Generator receives actual selected images as references; the Identity name/notes alone do not establish visual consistency.

For a Before/After creative, keep both groups in the same Identity and explicitly select the state needed by each branch. Do not merge the two groups merely to increase reference count.

## MCP

Agents can list Identities, inspect one reference, create from approved Library image IDs, add references with a role, reorder one role, and remove a reference. All source assets must be inside the connection's approved Library/project scope.
