---
title: "AI"
description: "Runs one named AI task and returns either readable text or defined data fields. Complete settings, connections, runtime behavior and usage guidance."
---

# AI

`ai.structured-task@2`

## What this node does

Runs one named AI task and returns either readable text or defined data fields.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| AI | No | Yes |

## When to use it

Use this for a visible AI job such as analysis, rewriting, planning, classification or review. One card should have one clear responsibility.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Main information `primary` | `data` | Required · Single connection · Connectable |
| Input | Extra context `context` | `data` | Optional · Multiple connections · Connectable |
| Input | Person or character `identity` | `identity` | Optional · Single connection · Connectable |
| Output | AI answer `result` | `data` | Typed output · Connectable |
| Output | Error path `error` | `error` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **AI model** `modelId`<br/>Choose this step's text model independently from the same models available to Canvas Assistant. | `model` | Required · Ask on run allowed · runtime `assistant-model` · model capability `assistant` | Gemini 3.7 Flash (`google/gemini-3.7-flash`) / Qwen 3.8 Max (`qwen/qwen3.8-max`) / Qwen 3.7 Flash (`qwen/qwen3.7-flash`) / Gemini 3.6 Flash (`google/gemini-3.6-flash`) / Kimi K3 (`moonshotai/kimi-k3`) / GPT-5.6 Luna Pro (`openai/gpt-5.6-luna-pro`) / GPT-5.6 Terra Pro (`openai/gpt-5.6-terra-pro`) / GPT-5.6 Sol Pro (`openai/gpt-5.6-sol-pro`) / Grok 4.5 (`x-ai/grok-4.5`) / Claude Sonnet 5 (`anthropic/claude-sonnet-5`) / GLM 5.2 (`z-ai/glm-5.2`) |
| **What should the AI do?** `userPrompt`<br/>Describe one clear job and the result you want. Connected cards are included automatically; variables place an exact connected value. Placeholder: Example: Study every slide and explain its hook, message and visual purpose… | `prompt` | Required · Fixed only | `` |
| **What should this step return?** `outputMode`<br/>Choose readable text for writing and summaries. Choose defined fields when later steps must read exact values. | `select` | Optional · Fixed only | Readable text (`text`) / Defined data fields (`structured`) |
| **Fields in the AI answer** `responseSchema`<br/>Add the named fields that later steps need. The answer is checked before it can continue. | `schema` | Optional · Fixed only · visible when `outputMode` is "structured" | `&#123;"type":"object","additionalProperties":false,"properties":&#123;&#125;,"required":[]&#125;` |
| **When should this step run?** `runWhen`<br/>Usually every time. Skip it only when the main information is absent and that is a valid workflow path. | `select` | Optional · Fixed only | Every time (`always`) / Only when the main information exists (`primary != null`) |
| **Permanent instructions** `systemPrompt`<br/>Optional. Put role, safety, brand and formatting rules that apply every time here. Put the actual job above. Placeholder: Example: Preserve the source meaning. Do not invent facts. Use concise language… | `prompt` | Optional · Fixed only · Advanced | `` |
| **Variation** `creativity`<br/>Consistent is best for analysis and checks. Balanced suits most writing. Exploratory produces more varied ideas. | `select` | Optional · Fixed only · Advanced | Consistent (`consistent`) / Balanced (`balanced`) / More exploratory (`exploratory`) |
| **How many times to retry** `maxAttempts`<br/>Retries the AI task when the request fails or a structured answer cannot be used. | `number` | Optional · 1–8 · Fixed only · Advanced | `3` |
| **Backup AI model** `fallbackModelId`<br/>Optional. Used on a later attempt when the main model cannot complete the task. | `model` | Optional · Fixed only · Advanced · model capability `assistant` | No backup model (``) / Gemini 3.7 Flash (`google/gemini-3.7-flash`) / Qwen 3.8 Max (`qwen/qwen3.8-max`) / Qwen 3.7 Flash (`qwen/qwen3.7-flash`) / Gemini 3.6 Flash (`google/gemini-3.6-flash`) / Kimi K3 (`moonshotai/kimi-k3`) / GPT-5.6 Luna Pro (`openai/gpt-5.6-luna-pro`) / GPT-5.6 Terra Pro (`openai/gpt-5.6-terra-pro`) / GPT-5.6 Sol Pro (`openai/gpt-5.6-sol-pro`) / Grok 4.5 (`x-ai/grok-4.5`) / Claude Sonnet 5 (`anthropic/claude-sonnet-5`) / GLM 5.2 (`z-ai/glm-5.2`) |
| **If this step still fails** `failureMode`<br/>Stop the run, route a safe error to a recovery path, or continue with an empty answer. | `select` | Optional · Fixed only · Advanced | Stop and show the error (`stop`) / Send the error to another path (`error-output`) / Continue without an answer (`continue-empty`) |

## How to configure it

1. Connect the main information the AI must work on.
2. Connect optional context or identity only when the job needs it.
3. Write the task in What should the AI do? and describe the expected result, not implementation details.
4. Choose a model.
5. If later steps need exact fields, open Advanced settings and define the answer format.
6. Connect AI answer to the next step; connect Error path only when the workflow has an explicit recovery branch.

## Example flow

**Source analysis and creative choices → Review copy**

The AI receives connected context, performs one named job, and passes a reusable answer to the reviewer.

## What happens at run time

- Runs a server-side multimodal AI task. Text mode returns plain text; Structured data mode validates the result against the configured field contract.
- Connected values are included automatically; &#123;&#123; primary &#125;&#125;, &#123;&#123; context &#125;&#125;, &#123;&#123; identity &#125;&#125;, &#123;&#123; run &#125;&#125; and &#123;&#123; trigger &#125;&#125; place exact values in the task.
- Automatically appended connected JSON is limited to 80,000 characters, the completed task prompt to 200,000 characters and connected media to 24 images. Exceeding a limit stops the step and never truncates an input.
- Permanent instructions are kept separate from connected content and cannot contain workflow variables in the current node version.
- Answer consistency maps visibly selected modes to provider creativity: Consistent 0.2, Balanced 0.65 and Exploratory 1.0.
- The runtime prepends only immutable execution-safety instructions: connected data cannot rewrite the node instructions, and the node cannot claim actions outside its visible step. These instructions do not classify or alter creative content.

## Practical notes

- Split analyze, write and review into separate AI steps so failures are understandable.
- Use a strict answer format only when downstream steps depend on named fields.
