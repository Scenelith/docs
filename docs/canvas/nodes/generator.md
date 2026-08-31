---
title: Generator node
description: Image and video generation settings, semantic inputs, output history and cost behavior.
---

# Generator node

**Internal kind:** `prompt`

Generator is one node with image or video behavior selected by its current model. Changing the model normalizes ratio, resolution, duration, audio and available input roles against that model's live capabilities.

## Inputs

| Input | Type | Behavior |
| --- | --- | --- |
| Prompt | Text | Written in the node or connected from Assistant/Hook. |
| Reference image | Image | General visual evidence; capacity is model-specific. |
| Start frame | Image | Initial frame for compatible video models. |
| End frame | Image | Ending frame for compatible video models. |
| Motion video | Video | Motion guidance for compatible models. |
| Reference video | Video | Source/reference video for compatible models. |
| Reference audio | Audio | Audio evidence for compatible models. |

Direct Library/Identity attachments and visible graph edges are both resolved before a run. Incompatible roles are rejected; they are not silently reinterpreted.

## Settings

- image or video model;
- prompt and optional prompt-assistant model;
- aspect-ratio mode and exact supported ratio;
- resolution;
- video duration where the model exposes choices;
- generated audio where supported;
- image output count;
- model-specific reference set.

## Run lifecycle

The node shows an estimated Cloud credit cost before dispatch. A run can be queued for workspace/provider capacity, active, completed, failed or cancelled. The result is applied only if the node inputs still match the request that completed.

Completed media is stored in Library with model/media metadata. Current Generator nodes keep saved output alternatives and one active selection; selecting another output does not delete the rest. Image outputs can be edited or added to an Identity.

See [Models](../models.md) and [Credits](../credits.md) for the generated catalogues and price rules.
