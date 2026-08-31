---
title: "Prepare creative direction"
description: "Creates a path-explicit typed request that defines exactly what the interpreter and resolver may read or write. Complete settings, connections, runtime behavior and usage guidance."
---

# Prepare creative direction

`logic.prepare-creative-direction@3`

## What this node does

Creates a path-explicit typed request that defines exactly what the interpreter and resolver may read or write.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Logic | No | Yes |

## When to use it

Use this before the creative-direction AI step to freeze the exact comment, visible choices, configurable choice map and real source slide indexes into one request contract.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Settings to resolve `settings` | `data` | Required · Single connection · Connectable |
| Input | Source slideshow `source` | `tiktok-source` | Required · Single connection · Connectable |
| Output | Prepared request `request` | `creative-direction-request` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **Choices the comment may affect** `controls`<br/>Define each real setting and explain to the AI what every option means. Only these paths may change. | `creative-controls` | Required · Fixed only | `[&#123;"id":"adaptation-mode","label":"Adaptation mode","path":"mode","options":[&#123;"id":"concept","label":"Rebuild for a new concept","value":"concept","meaning":"Choose when the person wants the central concept, story or creative premise to be substantially redesigned."&#125;,&#123;"id":"identity","label":"Keep concept, change the person","value":"identity","meaning":"Choose when the person wants to preserve the source concept and primarily replace the featured person, character or identity."&#125;]&#125;,&#123;"id":"wardrobe-subjects","label":"Wardrobe or subjects","path":"newOutfit","options":[&#123;"id":"change","label":"Allow a visible change","value":true,"meaning":"Choose when the person permits or requests a different wardrobe, clothing, subject arrangement or visible objects."&#125;,&#123;"id":"preserve","label":"Preserve the source","value":false,"meaning":"Choose when the person requires the source wardrobe, clothing, subjects and visible objects to remain unchanged."&#125;]&#125;,&#123;"id":"location-setting","label":"Location or setting","path":"newLocation","options":[&#123;"id":"change","label":"Allow a visible change","value":true,"meaning":"Choose when the person permits or requests a different location, room, setting, environment or background."&#125;,&#123;"id":"preserve","label":"Preserve the source","value":false,"meaning":"Choose when the person requires the source location, room, setting, environment and background to remain unchanged."&#125;]&#125;,&#123;"id":"on-screen-text","label":"On-screen text","path":"textStrategy","options":[&#123;"id":"keep","label":"Keep original wording","value":"keep","meaning":"Choose when the person wants existing on-screen wording preserved and does not want it removed or rewritten."&#125;,&#123;"id":"rewrite","label":"Rewrite for the new version","value":"rewrite","meaning":"Choose when the person wants on-screen wording replaced, rewritten or newly authored for the adapted version."&#125;,&#123;"id":"remove","label":"Remove all on-screen text","value":"remove","meaning":"Choose when the person wants all visible on-screen words removed without replacement text."&#125;]&#125;]` |
| **Comment field path** `briefPath`<br/>Exact field inside Creative choices containing the written direction. | `text` | Required · Fixed only · Advanced | `creativeBrief` |
| **Policy field path** `policyPath`<br/>Exact field inside Creative choices containing the change policy. | `text` | Required · Fixed only · Advanced | `creativeDirectionPolicy` |
| **Resolution evidence path** `resultPath`<br/>Empty field destination where Resolve creative direction may write verified requirements and evidence. It cannot overlap or replace a choice, comment or policy field. | `text` | Required · Fixed only · Advanced | `direction` |
| **Minimum interpretation confidence** `minConfidence`<br/>Lower-confidence classifications stop for clarification. | `number` | Required · 0.5–1 · Fixed only · Advanced | `0.9` |
| **Maximum comment length** `maxBriefCharacters`<br/>Stops an unexpectedly large comment before it reaches a model. | `number` | Required · 100–20000 · Fixed only · Advanced | `5000` |
| **Requirement categories** `requirementCategories`<br/>Define the category ids and meanings that this workflow accepts. The server does not add its own categories. | `json` | Required · Fixed only · Advanced | `[&#123;"id":"audience","label":"Audience","meaning":"Who the result is intended for."&#125;,&#123;"id":"offer","label":"Offer","meaning":"The proposition, benefit, price or call to action."&#125;,&#123;"id":"tone","label":"Tone","meaning":"The emotional, verbal or visual tone."&#125;,&#123;"id":"visual","label":"Visual direction","meaning":"A visual detail that does not belong to a more specific configured category."&#125;,&#123;"id":"copy","label":"Copy","meaning":"Written or on-screen wording and its treatment."&#125;,&#123;"id":"subject","label":"Subject","meaning":"A person, character, object or other principal subject."&#125;,&#123;"id":"product","label":"Product","meaning":"A product, its attributes or the way it must appear."&#125;,&#123;"id":"pacing","label":"Pacing","meaning":"Sequence timing, rhythm or progression."&#125;,&#123;"id":"other","label":"Other","meaning":"An operational instruction that does not match another configured category."&#125;]` |
| **Requirement destinations** `requirementPlacements`<br/>Define where accepted requirements go and explain each destination to the AI. The server accepts only these configured ids. | `json` | Required · Fixed only · Advanced | `[&#123;"id":"preserve","label":"Preserve","meaning":"The instruction says something must remain unchanged or be retained."&#125;,&#123;"id":"change","label":"Change","meaning":"The instruction says something must be created, replaced or altered."&#125;,&#123;"id":"avoid","label":"Avoid","meaning":"The instruction says something must not appear or happen."&#125;]` |
| **Maximum accepted requirements** `maxRequirements`<br/>Stops a model response that expands the comment into too many instructions. | `number` | Required · 1–80 · Fixed only · Advanced | `24` |
| **Allow explicitly ignored wording** `allowIgnoredClauses`<br/>Keep disabled when every clause must become a choice, requirement or clarification error. | `boolean` | Optional · Fixed only · Advanced | `false` |

## How to configure it

1. Connect Creative choices to Settings.
2. Connect the raw TikTok Source, not an AI summary, to Source.
3. Configure which setting paths and options the interpreter may recognize.
4. Connect Request to both Interpret creative direction and Resolve creative direction.

## Example flow

**Creative choices and source slideshow → Interpret creative direction**

The deterministic step preserves the complete comment unchanged and defines the only choices and requirement taxonomy the model may return.

## What happens at run time

- Hashes and forwards the complete comment without splitting it by words, punctuation or language.
- Verifies every current setting maps to one configured option and provides real source indexes directly from the source node.
- The author-selected comment, policy and resolution paths are part of the typed request; the resolver cannot substitute built-in field names.

## Practical notes

- Keep the default controls or add your own through the visual choice editor.
- Use a strict or confirmation policy unless automatic changes are intentionally allowed.
