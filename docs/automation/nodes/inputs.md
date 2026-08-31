---
title: Input nodes
description: Complete inputs, outputs, settings and runtime guidance for the current nodes in Inputs.
---

# Input nodes

This page is generated from the current Automation registry and contains **5 current nodes** in the **Inputs** category.

## TikTok source {#input-tiktok-source}

`input.tiktok-source@2`

Brings the chosen TikTok slideshow and an explicitly selected caption mode into the workflow.

**Registry metadata:** category `input`; icon `source`; accent `amber`; terminal no; retry-safe no. Example: Choose a viral slideshow, then preserve, replace or intentionally clear its caption.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Run `run` | `run-context` | Required · Single connection · Connectable |
| Output | Source `source` | `tiktok-source` | Typed output · Connectable |

| Setting | Kind | Contract | Default / choices |
| --- | --- | --- | --- |
| **Source slideshow** `source`<br/>Choose it now, or ask for a different slideshow whenever this workflow runs. | `select` | Required · Ask on run allowed · Ask on run by default · runtime `tiktok-source` | — |
| **Caption** `captionMode`<br/>Choose explicitly whether to preserve, replace or remove the original caption. | `select` | Optional · Ask on run allowed · runtime `string` | Use original caption (`original`) / Use replacement caption (`replacement`) / Use no caption (`empty`) |
| **Replacement caption** `caption`<br/>Used only when Caption is set to Use replacement caption. Placeholder: Write the replacement caption… | `textarea` | Optional · Ask on run allowed · Required when visible · runtime `string` · visible when `captionMode` is "replacement" | `` |

**Use it when:** Use this when later steps need the original TikTok slideshow, caption and ordered source frames.

**Setup**

1. Connect Start workflow to the Run input.
2. Choose a fixed slideshow, or enable Ask on run so the person can choose one each time.
3. Choose explicitly whether the output keeps the original caption, uses replacement text or contains no caption.
4. Connect Source to the first AI, planning or generation step that studies the original post.

**Example path:** Start workflow → Analyze slideshow. The run starts, this step loads the chosen post, and the analysis step receives the same ordered source package.

**Tips:** Choose Ask on run for reusable workflows. Keep the original caption unless the workflow intentionally starts from different copy.

**Technical behavior:** Outputs a typed tiktok-source package, not only a URL. The package contains ordered assets and source metadata used by downstream reference-aware steps.

## Identity {#input-identity}

`input.identity@2`

Gives later steps the selected saved person or character and requires usable images when one is chosen.

**Registry metadata:** category `input`; icon `identity`; accent `blue`; terminal no; retry-safe no. Example: Choose a person or character when this run must preserve them; leave the choice empty only when the workflow may run without a person.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Run `run` | `run-context` | Required · Single connection · Connectable |
| Output | Identity `identity` | `identity` | Typed output · Connectable |

| Setting | Kind | Contract | Default / choices |
| --- | --- | --- | --- |
| **Person or character** `identity`<br/>If you have added a person or character in the Identities section, choose them here or ask for one before every run. | `select` | Optional · Ask on run allowed · Ask on run by default · runtime `identity` | — |
| **Which references to use** `referenceGroup`<br/>All available passes every saved reference. A chosen group must contain at least one usable image. | `select` | Optional · Fixed only | All available (`auto`) / Reference only (`reference`) / Before only (`before`) / After only (`after`) |
| **Can run without a person** `optional`<br/>When enabled, the step may continue only if no person is selected. A selected person still requires a usable image in the chosen group. | `boolean` | Optional · Fixed only | `true` |

**Use it when:** Use this when AI or generation steps must keep a saved person or character recognizable and consistent.

**Setup**

1. Connect Start workflow to the Run input.
2. If you have added a person or character in the Identities section, choose them here. Otherwise enable Ask on run or allow this step to continue without an identity.
3. Leave the reference choice on All available unless Before, After or Reference has a specific meaning in this workflow.
4. Connect Identity to every step that needs the person, not only to the final image step.

**Example path:** Start workflow → Inspect identity and create images. One selected identity can inform both the reasoning steps and the final visual generation.

**Tips:** Enable Can run without a person for product, place or general-visual workflows. If a person is mandatory, disable that option and mark the identity as required before run.

**Technical behavior:** Outputs identity metadata plus the references allowed by the selected group. Can run without a person applies only when no identity is selected. If a selected identity has no usable images in the selected group, the run stops instead of silently removing that user choice. Provider credentials and private asset storage locations are not embedded in the portable workflow.

## Visual references {#input-visual-references}

`input.visual-references@1`

Brings chosen Canvas, Library or Identity images into the workflow as reusable visual context.

**Registry metadata:** category `input`; icon `references`; accent `mint`; terminal no; retry-safe no. Example: Choose composition, product, place, pose or style images for later AI and image steps.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Run `run` | `run-context` | Required · Single connection · Connectable |
| Output | References `references` | `visual-references` | Typed output · Connectable |

| Setting | Kind | Contract | Default / choices |
| --- | --- | --- | --- |
| **Reference images** `references`<br/>Choose images from this canvas or the workspace Library, or ask for them before every run. | `references` | Optional · maximum 32 · Ask on run allowed · Ask on run by default · runtime `visual-references` | `[]` |
| **Maximum references per run** `maxItems`<br/>Limits how many images this step may resolve and pass to later steps. | `number` | Optional · 1–32 · Fixed only | `8` |
| **Can run without references** `optional`<br/>Keep enabled when references improve the result but are not required for the workflow to continue. | `boolean` | Optional · Fixed only | `true` |

**Use it when:** Use this when later AI or image steps need visual examples that are not a saved person or character: composition, pose, product, place, lighting, style or another scene.

**Setup**

1. Connect Start workflow to the Run input.
2. Choose images from the canvas where the automation is opened or from the workspace Library. You can also enable Ask on run so the operator chooses them each time.
3. Connect References to AI context when the model should study the images, and to image planning or generation when their asset IDs may be assigned to a result.
4. Set a clear maximum so one run cannot attach an unexpectedly large reference set.

**Example path:** Start workflow and chosen images → Analyze, plan or create images. The step resolves the selected assets only when the run starts, then passes one stable reference package to every connected consumer.

**Tips:** Use Identity for a recognizable person or character; use Visual references for everything else. Select only images that have a clear job in the workflow. More references do not automatically produce a better result.

**Technical behavior:** The saved workflow stores only stable asset IDs. Temporary URLs and storage paths are resolved server-side for an authorized run. Portable workflow exports clear local asset IDs and ask the installer to choose references in their own workspace.

## TikTok recreation choices {#input-creative-settings}

`input.creative-settings@1`

Collects the six explicit decisions used by the Recreate TikTok workflow.

**Registry metadata:** category `input`; icon `choices`; accent `neutral`; terminal no; retry-safe no. Example: Keep the original idea, replace the person and location, then rewrite the on-screen text for your campaign.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Run `run` | `run-context` | Required · Single connection · Connectable |
| Output | Settings `settings` | `creative-settings` | Typed output · Connectable |

| Setting | Kind | Contract | Default / choices |
| --- | --- | --- | --- |
| **What should change** `mode`<br/>Adapt concept rebuilds the idea for a new campaign. Cast identity keeps the idea and mainly replaces the person. | `select` | Optional · Ask on run allowed · Ask on run by default · runtime `string` | Rebuild for a new concept (`concept`) / Keep concept, change the person (`identity`) |
| **Allow new clothes or subjects** `newOutfit`<br/>Disable this when clothing and visible objects must stay close to the source. | `boolean` | Optional · Ask on run allowed · Ask on run by default · runtime `boolean` | `true` |
| **Allow a new location** `newLocation`<br/>Disable this when the setting and background must stay close to the source. | `boolean` | Optional · Ask on run allowed · Ask on run by default · runtime `boolean` | `true` |
| **What to do with on-screen text** `textStrategy`<br/>Keep the original wording, rewrite it for the new concept, or remove it. | `select` | Optional · Ask on run allowed · Ask on run by default · runtime `string` | Keep the original text (`keep`) / Rewrite for the new version (`rewrite`) / Remove on-screen text (`remove`) |
| **Extra creative direction** `creativeBrief`<br/>Optional. Add the audience, offer, tone or anything the new version must include. Placeholder: Example: Make it feel like a casual home transformation for women 25–35… | `textarea` | Optional · Ask on run allowed · Ask on run by default · runtime `string` | `` |
| **How comments affect the choices** `creativeDirectionPolicy`<br/>Choose whether a verified written request proposes a visible change, must already agree, or may update the choice automatically. | `select` | Optional · Ask on run allowed · Ask on run by default · runtime `string` | Show changes for confirmation (`propose`) / Comments must agree with choices (`strict`) / Apply verified explicit changes (`auto-explicit`) |

**Use it when:** Use this to collect creative decisions that should be easy to change between runs without editing the workflow graph.

**Setup**

1. Connect the run trigger.
2. Choose which values stay fixed and which should be Asked on run.
3. Choose whether explicit creative direction may override the switches or must agree with them.
4. Write optional creative direction in ordinary language.
5. Pass Settings into a direction parser and Resolve creative direction before routing any branches.

**Example path:** Start workflow → Parse and resolve creative direction. The user chooses defaults and an explicit conflict policy; later visible steps may resolve an unambiguous written instruction without hiding the branch decision.

**Tips:** Ask only for decisions the operator can understand. Never let free text silently override switches without an explicit policy. Keep permanent brand rules inside the AI step rather than asking for them every run.

**Technical behavior:** Produces a structured data object including the selected creative-direction policy. Each runtime-bindable field can be fixed or exposed as a typed run input.

## Input from another workflow {#input-workflow-data}

`input.workflow-data@1`

Receives information from a trigger or another workflow.

**Registry metadata:** category `input`; icon `inbox`; accent `amber`; terminal no; retry-safe no. Example: A scheduled workflow can pass a campaign brief into this workflow without asking a person to type it again.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Run `run` | `run-context` | Required · Single connection · Connectable |
| Output | Received information `data` | `data` | Typed output · Connectable |

| Setting | Kind | Contract | Default / choices |
| --- | --- | --- | --- |
| **Manual value** `value`<br/>Used only for a manual run. Automatic triggers and parent workflows supply their own payload instead. Choose Ask on run when a person should enter it. | `json` | Optional · Ask on run allowed · Ask on run by default · runtime `json` | `&#123;&#125;` |
| **Read one field from the payload** `payloadPath`<br/>Optional. Example: campaign.brief returns only that nested value. Leave empty to receive the whole payload. Placeholder: campaign.brief | `text` | Optional · Fixed only · Advanced | `` |

**Use it when:** Use this when another workflow, a schedule or an event should supply structured information automatically.

**Setup**

1. Connect the start card.
2. Use the whole incoming payload, or enter a field path when this workflow needs only one nested value.
3. Use Ask on run only when a person should type the value manually.
4. Connect Received information to the first processing step.

**Example path:** Parent workflow or event → Prepare information. The parent sends a payload once; this step exposes that payload as normal workflow data.

**Tips:** Prefer a small, stable input contract over passing an entire unrelated response. Use Ask on run for human choices and this step for machine-to-machine data.

**Technical behavior:** Reads the trigger or parent-workflow payload directly; it is independent of this card's node ID. A fixed or Ask on run value is used only when the run has no machine payload.
