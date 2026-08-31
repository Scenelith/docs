---
title: "TikTok recreation choices"
description: "Collects the six explicit decisions used by the Recreate TikTok workflow. Complete settings, connections, runtime behavior and usage guidance."
---

# TikTok recreation choices

`input.creative-settings@1`

## What this node does

Collects the six explicit decisions used by the Recreate TikTok workflow.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Inputs | No | No |

## When to use it

Use this to collect creative decisions that should be easy to change between runs without editing the workflow graph.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Run `run` | `run-context` | Required · Single connection · Connectable |
| Output | Settings `settings` | `creative-settings` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **What should change** `mode`<br/>Adapt concept rebuilds the idea for a new campaign. Cast identity keeps the idea and mainly replaces the person. | `select` | Optional · Ask on run allowed · Ask on run by default · runtime `string` | Rebuild for a new concept (`concept`) / Keep concept, change the person (`identity`) |
| **Allow new clothes or subjects** `newOutfit`<br/>Disable this when clothing and visible objects must stay close to the source. | `boolean` | Optional · Ask on run allowed · Ask on run by default · runtime `boolean` | `true` |
| **Allow a new location** `newLocation`<br/>Disable this when the setting and background must stay close to the source. | `boolean` | Optional · Ask on run allowed · Ask on run by default · runtime `boolean` | `true` |
| **What to do with on-screen text** `textStrategy`<br/>Keep the original wording, rewrite it for the new concept, or remove it. | `select` | Optional · Ask on run allowed · Ask on run by default · runtime `string` | Keep the original text (`keep`) / Rewrite for the new version (`rewrite`) / Remove on-screen text (`remove`) |
| **Extra creative direction** `creativeBrief`<br/>Optional. Add the audience, offer, tone or anything the new version must include. Placeholder: Example: Make it feel like a casual home transformation for women 25–35… | `textarea` | Optional · Ask on run allowed · Ask on run by default · runtime `string` | `` |
| **How comments affect the choices** `creativeDirectionPolicy`<br/>Choose whether a verified written request proposes a visible change, must already agree, or may update the choice automatically. | `select` | Optional · Ask on run allowed · Ask on run by default · runtime `string` | Show changes for confirmation (`propose`) / Comments must agree with choices (`strict`) / Apply verified explicit changes (`auto-explicit`) |

## How to configure it

1. Connect the run trigger.
2. Choose which values stay fixed and which should be Asked on run.
3. Choose whether explicit creative direction may override the switches or must agree with them.
4. Write optional creative direction in ordinary language.
5. Pass Settings into a direction parser and Resolve creative direction before routing any branches.

## Example flow

**Start workflow → Parse and resolve creative direction**

The user chooses defaults and an explicit conflict policy; later visible steps may resolve an unambiguous written instruction without hiding the branch decision.

## What happens at run time

- Produces a structured data object including the selected creative-direction policy.
- Each runtime-bindable field can be fixed or exposed as a typed run input.

## Practical notes

- Ask only for decisions the operator can understand.
- Never let free text silently override switches without an explicit policy.
- Keep permanent brand rules inside the AI step rather than asking for them every run.
