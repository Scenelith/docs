---
title: Assistant
description: Build prompts and analyze connected Canvas context with a selectable text model.
---

# Assistant

Assistant is a Canvas node for understanding media and producing text or structured information. It is separate from image/video generation: Assistant prepares or analyzes; a Generator renders media.

## Inputs

| Input | What it contributes |
| --- | --- |
| Instruction | The job entered in the Assistant node |
| System prompt | Permanent role, brand, safety or formatting rules |
| Text context | Hook text, another Assistant result or other connected text |
| Visual context | Connected image references and supported identity images |
| Model | One model from the current Assistant catalogue |

All Assistant models except GLM 5.2 currently accept visual input. If a selected model cannot see images, the visual context is not a valid substitute for textual instructions.

Current request limits are 10,000 characters for the instruction, 20,000 for connected text, 10,000 for the system prompt and 14 distinct images. The browser endpoint accepts up to 30 Assistant requests per user per minute.

## Running the node

1. Write one clear job.
2. Connect only the evidence needed for that job.
3. Select a model.
4. Run Assistant.
5. Inspect the result before connecting it to a Generator or another step.

The result can be used as a Generator prompt. The **Compose prompt** action can combine the connected scene, Identity and instructions into a generation-ready prompt without rendering media.

## Model and cost behavior

Gemini 3.7 Flash is the default and is included in Cloud. Other models are metered. Scenelith estimates input tokens from text and images before a run, then Cloud settles the provider-reported cost when the response arrives.

Self-hosted Scenelith uses the configured OpenRouter account and does not deduct Scenelith credits.

See [Models](./models.md) for the complete current catalogue.
