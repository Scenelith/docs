---
title: Logic nodes
description: Complete inputs, outputs, settings and runtime guidance for the current nodes in Logic.
---

# Logic nodes

This page is generated from the current Automation registry and contains **13 current nodes** in the **Logic** category.

## Prepare information {#logic-transform}

`logic.transform@1`

Renames, selects or combines incoming information for the next step.

**Registry metadata:** category `logic`; icon `transform`; accent `neutral`; terminal no; retry-safe yes. Example: Take an AI answer with many fields and pass only the slide plans to image generation.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Incoming information `data` | `data` | Required · Multiple connections · Connectable |
| Output | Prepared information `result` | `data` | Typed output · Connectable |

| Setting | Kind | Contract | Default / choices |
| --- | --- | --- | --- |
| **What the next step should receive** `template`<br/>Build a JSON result with variables. Use &#123;&#123; byNode.step-id &#125;&#125; for a named card or &#123;&#123; inputs.0 &#125;&#125; for the first connected value. | `json` | Optional · Fixed only | `&#123;&#125;` |

**Use it when:** Use this when the next step needs only part of earlier results, renamed fields, or one combined object.

**Setup**

1. Connect one or more data-producing steps.
2. Describe the smaller result the next step should receive in the structured editor.
3. Connect Prepared information to the consumer step.
4. Test with a saved fixture before using the result in an expensive step.

**Example path:** Several AI answers → Plan every slide. This step removes irrelevant fields and gives the planner one predictable input object.

**Tips:** Do not use an AI step for simple field selection or renaming. Keep transformations small so the data contract remains readable.

**Technical behavior:** Pure deterministic transform with no provider call. Use &#123;&#123; byNode.step-id &#125;&#125; for a stable named source, &#123;&#123; inputs.0 &#125;&#125; for ordered inputs, or &#123;&#123; sources &#125;&#125; to inspect source IDs, names and values.

## Continue one path {#logic-select-one}

`logic.select-one@1`

Joins mutually exclusive paths and passes the one completed value forward unchanged.

**Registry metadata:** category `logic`; icon `select-one`; accent `neutral`; terminal no; retry-safe yes. Example: Continue with either the approved plan or the repaired plan, but never both.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Alternative results `data` | `data` | Required · Multiple connections · Connectable |
| Output | Selected information `result` | `data` | Typed output · Connectable |

**Use it when:** Use this after mutually exclusive branches when exactly one completed result must continue unchanged.

**Setup**

1. Connect every mutually exclusive branch to the same input.
2. Connect Selected information to the next step.
3. Test both branch outcomes before going live.

**Example path:** Approved plan or repaired plan → Validate plans. Exactly one completed branch continues with the same value and field names.

**Tips:** Use this only for alternatives where one and only one path can complete. Use Merge paths when the next step needs several results together.

**Technical behavior:** Fails unless exactly one connected branch produced a value. Passes that value unchanged without wrapping, renaming, coercion or fallback.

## Retry gate {#logic-retry-gate}

`logic.retry-gate@1`

Returns corrected information to a check through one explicit bounded retry route.

**Registry metadata:** category `logic`; icon `retry`; accent `amber`; terminal no; retry-safe yes. Example: When validation rejects a plan, repair it and send it back through this gate up to two times.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | First attempt `initial` | `data` | Required · Single connection · Connectable |
| Input | Retry feedback `feedback` | `data` | Optional · Single connection · Connectable |
| Output | Current value `current` | `data` | Typed output · Connectable |
| Output | Retry exhausted `exhausted` | `error` | Typed output · Connectable |

| Setting | Kind | Contract | Default / choices |
| --- | --- | --- | --- |
| **Maximum retries** `maxRetries`<br/>How many corrected values may return through the Retry route after the first attempt. | `number` | Optional · 1–8 · Fixed only | `2` |
| **Corrected value field** `feedbackPath`<br/>Optional field path inside the feedback package, for example plans. Leave empty when the feedback itself is the corrected value. Placeholder: plans | `text` | Optional · Fixed only · Advanced | `` |

**Use it when:** Use this when a deterministic check can return repair feedback and the corrected value must be checked again through a visible bounded path.

**Setup**

1. Connect the original value to First attempt.
2. Connect Current value to the check and its success path.
3. Route the check error through an explicit repair step.
4. Connect the repaired package back to Retry feedback using a Retry route.
5. Connect Retry exhausted to a deliberate failed output.

**Example path:** Slide plans rejected by validation → Repair once, then validate the corrected plans again. The retry route returns only through this gate, increments a stored counter and stops at the configured limit.

**Tips:** Keep generation, publishing and other side effects after the successful check, outside the retry body. Include the validator error and repaired value in the feedback package so the final failure remains understandable.

**Technical behavior:** This is the only node that accepts a backward Retry route; ordinary graph cycles remain invalid. Retries are bounded, persisted in node outputs and counted against the workflow step-execution limit. The feedback field path selects the corrected value without inventing or repairing missing data.

## Select information {#logic-select-path}

`logic.select-path@1`

Takes one existing field from incoming information and passes its value forward unchanged.

**Registry metadata:** category `logic`; icon `select-path`; accent `neutral`; terminal no; retry-safe yes. Example: Continue with the plans field from a larger review package without reconstructing it.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Incoming information `data` | `data` | Required · Single connection · Connectable |
| Output | Selected information `result` | `data` | Typed output · Connectable |

| Setting | Kind | Contract | Default / choices |
| --- | --- | --- | --- |
| **Field to continue** `path`<br/>Enter the exact field path, for example plans or campaign.brief. The run stops if that field is missing. Placeholder: plans | `text` | Required · Fixed only | `` |

**Use it when:** Use this when the next step needs one existing field from a larger result and that field must stay unchanged.

**Setup**

1. Connect the larger result.
2. Enter the exact field path, such as plans or campaign.brief.
3. Connect Selected information to the next step.

**Example path:** Review package → Continue approved plans. The existing plans field continues as the same value without rebuilding its JSON.

**Tips:** Use Prepare information only when you intentionally need to create a different shape. A missing field stops the run with its exact path.

**Technical behavior:** Reads one exact object path and returns the stored value unchanged. Does not wrap, rename, parse, stringify, coerce or fall back to another field.

## Choose a path {#logic-condition}

`logic.condition@3`

Checks one explicit JSON-typed rule without silently converting text, numbers or booleans.

**Registry metadata:** category `logic`; icon `condition`; accent `amber`; terminal no; retry-safe yes. Example: If review status equals true, generate images. Otherwise, send the plan back for repair.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Information to check `data` | `data` | Required · Single connection · Connectable |
| Output | Rule matches `yes` | `data` | Typed output · Connectable |
| Output | Rule does not match `no` | `data` | Typed output · Connectable |

| Setting | Kind | Contract | Default / choices |
| --- | --- | --- | --- |
| **What should be checked?** `path`<br/>Enter the field name from the incoming result. Leave empty to check the whole result. Placeholder: Example: review.approved | `text` | Optional · Fixed only | `` |
| **What must match?** `operator`<br/>True, false and numeric rules require values of the same real JSON type; text is never converted for comparison. | `select` | Optional · Fixed only | Is exactly true (`is-true`) / Is exactly false (`is-false`) / Is empty (`is-empty`) / Is not empty (`is-not-empty`) / Equals this value (`equals`) / Does not equal this value (`not-equals`) / Contains this value (`contains`) / Is greater than (`greater-than`) / Is less than (`less-than`) |
| **Compare with** `compareValue`<br/>Use text for text rules, a real number for numeric rules, or true/false for boolean equality. Placeholder: Example: approved, 10, or true | `value` | Optional · Fixed only · visible when `operator` is "equals" / "not-equals" / "contains" / "greater-than" / "less-than" | `null` |

**Use it when:** Use this when the workflow must choose between two paths based on one visible rule.

**Setup**

1. Connect the information to inspect.
2. Enter the field to check, such as review.approved.
3. Choose the rule and comparison value when needed.
4. Connect Rule matches and Rule does not match to different next steps.

**Example path:** Review result → Generate images or Repair plan. Approved data follows the yes path. Everything else follows the no path, so no outcome is hidden.

**Tips:** Name the card after the decision, for example Is the plan approved? Always connect or intentionally finish both paths.

**Technical behavior:** Evaluates one deterministic predicate and passes the original incoming value unchanged. Contains is case-sensitive for text and checks exact items in a list. Empty lists and objects should use the explicit empty rules rather than the yes / true rule.

## Prepare creative direction {#logic-prepare-creative-direction}

`logic.prepare-creative-direction@3`

Creates a path-explicit typed request that defines exactly what the interpreter and resolver may read or write.

**Registry metadata:** category `logic`; icon `prepare-direction`; accent `neutral`; terminal no; retry-safe yes. Example: Freeze the comment, visible choices, output destination and raw source slide indexes before asking a model to classify anything.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Settings to resolve `settings` | `data` | Required · Single connection · Connectable |
| Input | Source slideshow `source` | `tiktok-source` | Required · Single connection · Connectable |
| Output | Prepared request `request` | `creative-direction-request` | Typed output · Connectable |

| Setting | Kind | Contract | Default / choices |
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

**Use it when:** Use this before the creative-direction AI step to freeze the exact comment, visible choices, configurable choice map and real source slide indexes into one request contract.

**Setup**

1. Connect Creative choices to Settings.
2. Connect the raw TikTok Source, not an AI summary, to Source.
3. Configure which setting paths and options the interpreter may recognize.
4. Connect Request to both Interpret creative direction and Resolve creative direction.

**Example path:** Creative choices and source slideshow → Interpret creative direction. The deterministic step preserves the complete comment unchanged and defines the only choices and requirement taxonomy the model may return.

**Tips:** Keep the default controls or add your own through the visual choice editor. Use a strict or confirmation policy unless automatic changes are intentionally allowed.

**Technical behavior:** Hashes and forwards the complete comment without splitting it by words, punctuation or language. Verifies every current setting maps to one configured option and provides real source indexes directly from the source node. The author-selected comment, policy and resolution paths are part of the typed request; the resolver cannot substitute built-in field names.

## Resolve creative direction {#logic-resolve-creative-direction}

`logic.resolve-creative-direction@4`

Verifies the current request, changes only configured choices and writes evidence only to its configured destination.

**Registry metadata:** category `logic`; icon `resolve-direction`; accent `amber`; terminal no; retry-safe yes. Example: Reject missing clauses or invented evidence before any configured route can change.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Prepared request `request` | `creative-direction-request` | Required · Single connection · Connectable |
| Input | Direction analysis `analysis` | `creative-direction-analysis` | Required · Single connection · Connectable |
| Output | Resolved choices `resolved` | `resolved-creative-settings` | Typed output · Connectable |
| Output | Conflict `conflict` | `error` | Typed output · Connectable |

**Use it when:** Use this after Interpret creative direction to verify that the model classified the exact current comment without omissions or invented evidence.

**Setup**

1. Connect the same Prepared request used by the interpreter.
2. Connect its typed Analysis output.
3. Route Resolved choices into the visible branch conditions.
4. Connect Conflict to a failed output that shows what must be clarified.

**Example path:** Prepared request plus typed analysis → Wardrobe, location, adaptation and text routes. Only verified configured choices can change; all other accepted meaning becomes an atomic requirement.

**Tips:** Use Show changes for confirmation when operators should explicitly approve a switch change. Automatic changes still require exact evidence, complete clause coverage and high confidence.

**Technical behavior:** This node is deterministic and fail closed: contract mismatch, missing clauses, paraphrased evidence, low confidence, ambiguity and invalid scope all use Conflict. Requirements receive content-derived stable IDs and the current node accepts exactly the current prepared-request version. It preserves the connected settings, changes only configured control paths under the selected policy, and writes resolution evidence only to the author-selected empty destination.

## Limit the amount {#logic-limit-batch}

`logic.limit-batch@1`

Stops an unexpectedly large list before it reaches expensive or slow steps.

**Registry metadata:** category `logic`; icon `limit`; accent `neutral`; terminal no; retry-safe yes. Example: Allow no more than 20 slide plans to continue to image generation.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Incoming list `items` | `data` | Required · Single connection · Connectable |
| Output | Allowed items `items` | `data` | Typed output · Connectable |
| Output | Count summary `summary` | `data` | Typed output · Connectable |

| Setting | Kind | Contract | Default / choices |
| --- | --- | --- | --- |
| **Maximum number to continue** `maxItems`<br/>The workflow stops with a clear error when the incoming list is larger. | `number` | Optional · 1–500 · Fixed only | `40` |

**Use it when:** Use this immediately before a costly repeated operation to prevent an unexpectedly large list from consuming time or credits.

**Setup**

1. Connect the list you want to protect.
2. Set the largest acceptable item count.
3. Connect Allowed items to the expensive step.
4. Optionally connect Count summary to logging or review.

**Example path:** Planned slides → Image Generator. Normal lists continue; an oversized list stops with a clear limit error before generation begins.

**Tips:** Set the limit from the real product constraint, not an arbitrary high number. Use workflow-wide safety limits as a second line of protection.

**Technical behavior:** Validates array length before forwarding data. Outputs the unchanged allowed items plus a count summary.

## Merge paths {#logic-merge}

`logic.merge@1`

Waits for connected paths and creates one clear list or named object for the next step.

**Registry metadata:** category `logic`; icon `merge`; accent `neutral`; terminal no; retry-safe yes. Example: Combine an approved brief, copy and reference plan into one named planning package.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | First `input-1` | `data` | Required · Single connection · Connectable |
| Input | Second `input-2` | `data` | Required · Single connection · Connectable |
| Output | Combined information `result` | `data` | Typed output · Connectable |

| Setting | Kind | Contract | Default / choices |
| --- | --- | --- | --- |
| **How should the results be combined?** `mode`<br/>Use a named object when the next step should receive predictable fields. Use a list when every branch returns the same kind of item. | `select` | Optional · Fixed only | Named object (`named-object`) / One combined list (`append-list`) |
| **Inputs to wait for** `inputs`<br/>Add one named socket for every result this merge must receive. Each socket accepts exactly one connection. | `json` | Optional · Fixed only | `[&#123;"id":"input-1","name":"first"&#125;,&#123;"id":"input-2","name":"second"&#125;]` |

**Use it when:** Use this when two or more paths have produced information and the next step needs one deliberate package instead of several crossing connections.

**Setup**

1. Add one input row for every path the workflow must wait for.
2. Give every input a short, stable name, then connect each earlier result to its own socket on the card.
3. Choose whether the results should stay as a list or become one named object.
4. Connect Combined information to the next step.

**Example path:** Approved brief, copy and references → Plan every image. The workflow waits until the connected paths have finished, then creates one predictable package for the planner.

**Tips:** Merge is a real synchronization point, not a visual folder. A missing required path means the merge cannot produce its complete package; make optional paths explicit before this step.

**Technical behavior:** Requires at least two configured inputs. Every input is a stable single-connection port, so removing a connected input is blocked until its edge is disconnected. List mode flattens connected lists by one level in configured input order. Named object mode uses the input names as keys and keeps every value intact. Branches are not claimed to execute simultaneously; the runtime may schedule them in a deterministic order before the merge.

## Run another workflow {#logic-run-subworkflow}

`logic.run-subworkflow@1`

Hands information to another runnable workflow, waits for it, then continues with its result.

**Registry metadata:** category `logic`; icon `workflow`; accent `mint`; terminal no; retry-safe no. Example: Send a finished image to a separate workflow that writes and schedules the social post.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Information to send `data` | `data` | Required · Single connection · Connectable |
| Output | Workflow result `result` | `data` | Typed output · Connectable |
| Output | Error path `error` | `error` | Typed output · Connectable |

| Setting | Kind | Contract | Default / choices |
| --- | --- | --- | --- |
| **Connection name** `subworkflowSlot`<br/>A safe name for the workflow you will connect below. The connected workflow can be changed after import. Placeholder: Example: publish-content | `text` | Required · Fixed only | `child-workflow` |
| **Extra fixed information** `childInputs`<br/>Advanced. Values that should be sent on every run in addition to the connected input. | `json` | Optional · Fixed only · Advanced | `&#123;&#125;` |
| **If the other workflow fails** `failureMode`<br/>Either stop this run or pass the child-workflow error to a connected recovery path. | `select` | Optional · Fixed only · Advanced | Stop and show the error (`stop`) / Send the error to another path (`error-output`) |

**Use it when:** Use this to reuse one runnable workflow as a single step, for example publishing, moderation or asset processing.

**Setup**

1. Connect the information to send.
2. Give the connection a stable name.
3. In Settings, connect that name to a live child workflow.
4. Confirm the child has a compatible Workflow input step.
5. Connect its result or error path.

**Example path:** Finished image and caption → Publishing result. This workflow pauses while the child workflow completes, then continues with the child result.

**Tips:** Use a child workflow for genuinely reusable behavior, not to hide a confusing local graph. Take the child live and test it before connecting it.

**Technical behavior:** Invokes a pinned workflow version through a deployment binding. The connected value becomes the child workflow payload; the child Workflow input reads it without depending on either card's node ID. The output is an envelope with the child run id, its final output and warning count.

## For each item {#logic-map-subworkflow}

`logic.map-subworkflow@1`

Runs one reusable workflow for every item in a bounded list, then exposes the collected results and failures.

**Registry metadata:** category `logic`; icon `repeat`; accent `mint`; terminal no; retry-safe no. Example: Review every planned slide with the same child workflow and collect the answers in the original item order.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | List of items `items` | `data` | Required · Single connection · Connectable |
| Output | Successful results `results` | `data` | Typed output · Connectable |
| Output | Failed items `failures` | `data` | Typed output · Connectable |
| Output | Error path `error` | `error` | Typed output · Connectable |

| Setting | Kind | Contract | Default / choices |
| --- | --- | --- | --- |
| **Connection name** `subworkflowSlot`<br/>A safe name for the workflow that will handle each item. Placeholder: Example: review-one-slide | `text` | Required · Fixed only | `item-workflow` |
| **Maximum number of items** `maxItems`<br/>Prevents an unexpectedly large list from creating too many runs. | `number` | Optional · 1–500 · Fixed only | `40` |
| **How many may run at once** `concurrency`<br/>Higher is faster but uses more provider capacity at the same time. | `number` | Optional · 1–16 · Fixed only | `3` |
| **If one item fails** `itemFailure`<br/>Choose whether completed items remain available or any failed item makes this whole step fail. | `select` | Optional · Fixed only | Keep the successful results (`keep-successful`) / Stop the whole list (`stop`) |
| **Extra fixed information** `childInputs`<br/>Advanced. Values sent with every item. | `json` | Optional · Fixed only · Advanced | `&#123;&#125;` |
| **If this step cannot finish** `failureMode`<br/>Used when the list cannot be processed, including when every item fails or Stop the whole list is selected. | `select` | Optional · Fixed only · Advanced | Stop and show the error (`stop`) / Send the error to another path (`error-output`) |

**Use it when:** Use this as an explicit bounded loop when every item in a list must go through the same reusable workflow.

**Setup**

1. Connect the list of items.
2. Choose the child workflow connection.
3. Set maximum items and safe concurrency.
4. Choose whether one failed item stops everything or successful results are kept.
5. Connect Results, Failures or Error to explicit next paths.

**Example path:** List of slide plans → Collected reviews and failed items. The loop sends one item at a time to the selected child workflow, keeps its original item number, and emits the collected result only after the bounded list is finished.

**Tips:** Start with low concurrency when the provider has strict rate limits. Use Run another workflow when there is only one item.

**Technical behavior:** Creates bounded child runs and preserves every item's zero-based itemIndex beside its run id, output and warning count. The child workflow is the visible loop body. This avoids an unbounded backward canvas connection while still allowing the repeated work to contain any supported steps. Each item becomes the child workflow payload. When Keep successful is selected, failed items appear on Failed items; Stop the whole list produces a node error instead.

## Validate Recreate TikTok plans {#logic-validate-slide-plans}

`logic.validate-slide-plans@2`

Checks every plan against the explicit Recreate TikTok v1 contract before images are created.

**Registry metadata:** category `logic`; icon `validate`; accent `blue`; terminal no; retry-safe yes. Example: Catch a lost location rule, wrong text strategy or reference-role leak before it spends image credits.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Slide plans `data` | `data` | Required · Single connection · Connectable |
| Input | Original generation contract `contract` | `data` | Optional · Single connection · Connectable |
| Input | Original slideshow `source` | `tiktok-source` | Optional · Single connection · Connectable |
| Input | Person or character `identity` | `identity` | Optional · Single connection · Connectable |
| Input | Visual references `references` | `visual-references` | Optional · Single connection · Connectable |
| Output | Checked plans `plans` | `slide-plan-set` | Typed output · Connectable |
| Output | Validation error `error` | `error` | Typed output · Connectable |

| Setting | Kind | Contract | Default / choices |
| --- | --- | --- | --- |
| **Validation contract** `profile`<br/>This version enforces the visible fields and exact prompt/reference rules of Recreate TikTok v1. It does not infer another workflow profile. | `select` | Required · Fixed only · Read-only | Recreate TikTok v1 (`recreate-tiktok-v1`) |
| **Maximum slides allowed** `maxSlides`<br/>Stops the workflow when the plan unexpectedly contains more slides than you intended. | `number` | Optional · 1–40 · Fixed only | `40` |
| **If validation fails** `failureMode`<br/>Stop the run or send the exact validation error to an explicit repair path. | `select` | Optional · Fixed only · Advanced | Stop and show the error (`stop`) / Send the error to a repair path (`error-output`) |

**Use it when:** Use this as the final deterministic gate for the Recreate TikTok slide-plan contract before image generation.

**Setup**

1. Connect the completed slide plans.
2. Connect Original generation contract for full choice, copy and prompt enforcement. Without it, this step performs structural checks only.
3. Also connect the original slideshow and optional identity so indexes and reference IDs can be checked.
4. Set the maximum number of slides.
5. Connect Checked plans to image creation.
6. When repair is allowed, set failure behavior to Send the error and connect the error to a repair step and bounded Retry gate.

**Example path:** Plan and review slides → Image Generator. Only complete, ordered and bounded plans reach the image provider.

**Tips:** Keep this check even when an AI review step already approved the content. AI review judges quality; this step enforces the mechanical contract.

**Technical behavior:** Validates the model-authored Recreate TikTok slide-plan-set contract without adding, rewriting or repairing prompt fields. When Original generation contract is connected, it enforces that workflow's visible adaptation, wardrobe, location, text, reference-role and creative-requirement fields. Without that optional connection, validation is explicitly structural: schema, indexes, reference availability and slide limits only. Model reference capacity is checked by generation because the model can be chosen at run time. Error output contains the exact deterministic failure and never substitutes a fallback plan.

## Prepare slideshow image requests {#logic-prepare-slideshow-image-requests}

`logic.prepare-slideshow-image-requests@1`

Converts checked TikTok slide plans into exact generic image requests without changing their prompts.

**Registry metadata:** category `logic`; icon `image-requests`; accent `neutral`; terminal no; retry-safe yes. Example: Serialize every approved slide prompt and its ordered references before provider execution.

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Checked slide plans `plans` | `slide-plan-set` | Required · Single connection · Connectable |
| Input | Original slideshow `source` | `tiktok-source` | Required · Single connection · Connectable |
| Input | Person or character `identity` | `identity` | Optional · Single connection · Connectable |
| Input | Visual references `references` | `visual-references` | Optional · Single connection · Connectable |
| Output | Image requests `requests` | `image-request-batch` | Typed output · Connectable |

**Use it when:** Use this after TikTok slide-plan validation to turn the checked domain contract into the one generic image-request contract.

**Setup**

1. Connect Checked plans and the original slideshow.
2. Connect the same optional identity and visual-reference packages used by validation.
3. Connect Image requests to the generic Image Generator.

**Example path:** Validated TikTok slide plans → Image Generator. This visible adapter serializes each approved prompt and exact reference list; the generator itself does not know about TikTok, clothing, locations or text policy.

**Tips:** Keep domain-specific transformations in explicit adapter nodes. Do not bypass validation when the source plans came from an AI step.

**Technical behavior:** Outputs schemaVersion 1 image requests with one exact prompt, ordered asset ids, roles and labels per item. It does not call a provider or choose model settings.
