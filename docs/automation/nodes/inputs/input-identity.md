---
title: "Identity"
description: "Gives later steps the selected saved person or character and requires usable images when one is chosen. Complete settings, connections, runtime behavior and usage guidance."
---

# Identity

`input.identity@2`

## What this node does

Gives later steps the selected saved person or character and requires usable images when one is chosen.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Inputs | No | No |

## When to use it

Use this when AI or generation steps must keep a saved person or character recognizable and consistent.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Run `run` | `run-context` | Required · Single connection · Connectable |
| Output | Identity `identity` | `identity` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **Person or character** `identity`<br/>If you have added a person or character in the Identities section, choose them here or ask for one before every run. | `select` | Optional · Ask on run allowed · Ask on run by default · runtime `identity` | — |
| **Which references to use** `referenceGroup`<br/>All available passes every saved reference. A chosen group must contain at least one usable image. | `select` | Optional · Fixed only | All available (`auto`) / Reference only (`reference`) / Before only (`before`) / After only (`after`) |
| **Can run without a person** `optional`<br/>When enabled, the step may continue only if no person is selected. A selected person still requires a usable image in the chosen group. | `boolean` | Optional · Fixed only | `true` |

## How to configure it

1. Connect Start workflow to the Run input.
2. If you have added a person or character in the Identities section, choose them here. Otherwise enable Ask on run or allow this step to continue without an identity.
3. Leave the reference choice on All available unless Before, After or Reference has a specific meaning in this workflow.
4. Connect Identity to every step that needs the person, not only to the final image step.

## Example flow

**Start workflow → Inspect identity and create images**

One selected identity can inform both the reasoning steps and the final visual generation.

## What happens at run time

- Outputs identity metadata plus the references allowed by the selected group.
- Can run without a person applies only when no identity is selected. If a selected identity has no usable images in the selected group, the run stops instead of silently removing that user choice.
- Provider credentials and private asset storage locations are not embedded in the portable workflow.

## Practical notes

- Enable Can run without a person for product, place or general-visual workflows.
- If a person is mandatory, disable that option and mark the identity as required before run.
