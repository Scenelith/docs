---
title: Complete MCP tool reference
description: Every current Scenelith MCP tool, grouped by product domain.
---

# Complete MCP tool reference

The server currently registers **91 tools**. The actual list returned to an agent is smaller when the connection lacks an optional permission or is restricted to selected projects.

> Tool names and descriptions below are generated from the MCP server. Use `get_canvas_capabilities` and `get_automation_capabilities` for live schemas, model catalogues and versioned node fields.

## Canvas

| Tool | Permission | What it does |
| --- | --- | --- |
| `list_workspaces`<br/>**List workspaces** | `mcp:read` | List the Scenelith workspaces this connection can access. Use the returned workspace IDs for canvas, library, and identity tools. |
| `list_canvases`<br/>**List canvases** | `mcp:read` | List accessible canvases with IDs, current revisions, status, and compact graph summaries. Optionally limit the result to one workspace. |
| `get_canvas`<br/>**Get canvas** | `mcp:read` | Get one complete canvas graph. Always call this immediately before patch_canvas and pass its revision as expected_revision. |
| `get_canvas_capabilities`<br/>**Get canvas capabilities** | `mcp:read` | Read the exact node types, generation and Assistant models, model settings, semantic input ports, reference roles, and supported agent operations for one canvas. Call this before creating or configuring nodes. |
| `inspect_canvas_node_inputs`<br/>**Inspect canvas node inputs** | `mcp:read` | Resolve one node's exact connected Assistant text and concrete image, video or audio asset references, including identity cards and attached references. Reports video segments that still need materialization. |
| `export_canvas_document`<br/>**Export portable canvas** | `mcp:read` | Export one approved canvas as a credential-free portable .scenelith.json document. Instance asset IDs, media URLs and generated outputs are deliberately removed. |
| `create_canvas`<br/>**Create canvas** | `canvas:write` | Create an empty canvas in a workspace. This changes Scenelith but does not run generation. |
| `import_canvas_document`<br/>**Import portable canvas** | `canvas:write` | Validate and import a portable .scenelith.json document into an approved workspace. Fresh canvas, node, edge and Video Master scene IDs are assigned; embedded secrets and unknown fields fail closed. |
| `patch_canvas`<br/>**Patch canvas** | `canvas:write` | Atomically move or remove nodes, remove connections, rename the canvas, or set its viewport. Use the semantic create, configure, place, connect and duplicate tools for content changes so models, assets and ports are validated. |
| `create_canvas_node`<br/>**Create canvas node** | `canvas:write` | Create a configured Image Generator, Video Generator, Assistant, or Sticky Note using the same defaults as the Canvas UI. Use place_canvas_asset or place_canvas_identity for media and identity nodes. |
| `configure_canvas_node`<br/>**Configure canvas node** | `canvas:write` | Configure a node with semantic fields. Generator model, ratio, resolution, duration, audio and batch values are normalized against the live model catalogue; Assistant and note settings are type checked. |
| `connect_canvas_nodes`<br/>**Connect canvas nodes** | `canvas:write` | Connect one node output to a typed text, image, video or audio input. The server derives semantic handles, validates media compatibility and model capacity, and replaces only single-value inputs. |
| `duplicate_canvas_nodes`<br/>**Duplicate canvas nodes** | `canvas:write` | Duplicate selected nodes and only the connections between them, offsetting the copy and removing automation lineage just like manual Canvas duplication. |
| `select_canvas_output`<br/>**Select generated output** | `canvas:write` | Select one previously generated output as the active media for a generator node or one Video Master scene without deleting output history. |
| `create_canvas_segment_node`<br/>**Add video scene as canvas clip** | `canvas:write` | Materialize one detected source scene when needed and place it as a standalone, frame-accurate video node with source lineage. |
| `create_canvas_remake_branch`<br/>**Create remake branch** | `canvas:write` | Create the same source-aware Image Generator branch as the Canvas 'Create my version' action, with a safe original-content prompt and typed image connection. |
| `import_tiktok_to_canvas`<br/>**Import TikTok to canvas** | `import:write` | Import a direct TikTok slideshow or video, persist its media in the approved canvas Library, extract available hook evidence, detect video scenes, and append the same source/scene graph created by the Canvas UI. This fetches external media and may take several minutes. |
| `refresh_tiktok_source`<br/>**Refresh TikTok source stats** | `import:write` | Refresh the author, publication time and engagement counters for one imported TikTok source node and update matching original-hook views. |

## Library

| Tool | Permission | What it does |
| --- | --- | --- |
| `list_library_assets`<br/>**List library assets** | `mcp:read` | List one page of generated or uploaded images and videos from the canvases approved for this connection. Returns stable asset IDs, media metadata, counts, and next_cursor. Browser URLs require a signed-in Scenelith session; call inspect_library_asset when the agent needs to see the media. |
| `inspect_library_asset`<br/>**Inspect library asset** | `mcp:read` | Return a bounded visual preview plus exact metadata for one approved Library asset. Images return an image thumbnail; videos return a representative frame. Use this before selecting visual references. |
| `place_canvas_asset`<br/>**Place Library asset on canvas** | `canvas:write` | Place one approved Library image or video on the canvas as a real scene node that can feed generator and Assistant inputs. |
| `attach_canvas_reference`<br/>**Attach Library reference** | `canvas:write` | Attach one approved Library or identity asset directly to a generator or Assistant input. The server validates MIME type, model port, capacity, Assistant vision support and project grants. |
| `detach_canvas_reference`<br/>**Detach Library reference** | `canvas:write` | Detach one directly attached Library or identity reference from a generator, Assistant, or exact Video Master scene. Visible node-to-node connections remain removable through patch_canvas.remove_edge. |
| `upload_library_asset`<br/>**Upload media to Library** | `library:write` | Upload bounded base64-encoded JPG, PNG, MP4, MOV or WebM media into one approved canvas Library. Bytes are format-checked; arbitrary server paths and remote URLs are never accepted. For large video use the Scenelith UI upload flow. |

## Identities

| Tool | Permission | What it does |
| --- | --- | --- |
| `list_identities`<br/>**List identities** | `mcp:read` | List reusable Scenelith identities with explicit single or before_after type, separated Character/Before/After groups, copied identity asset IDs, and accessible Library source lineage. |
| `inspect_identity_reference`<br/>**Inspect identity reference** | `mcp:read` | Return a bounded image preview plus metadata for one Character, Before, or After reference returned by list_identities. Identity references are workspace-level and do not expose their original Library source when that canvas was not approved. |
| `place_canvas_identity`<br/>**Place identity on canvas** | `canvas:write` | Place selected Character, Before, or After identity references on the canvas as one persona node. Omit reference_asset_ids to use every asset in the chosen variant. |
| `create_identity_from_assets`<br/>**Create identity from assets** | `identity:write` | Create one explicit Identity type from approved Library images. A single Identity accepts only Character references; a Before / After Identity accepts only Before and After groups. Use list_library_assets first; videos are not accepted. |
| `add_identity_references`<br/>**Add references to identity** | `identity:write` | Copy approved Library images into an existing identity without changing its type: Character for a single Identity, or Before/After for a transformation Identity. Source assets remain in Library. |
| `reorder_identity_references`<br/>**Reorder identity references** | `identity:write` | Set the complete order of one identity reference group. The full current asset list is required so concurrent changes fail closed. |
| `remove_identity_reference`<br/>**Remove identity reference** | `identity:write` | Remove one saved image from an identity while preserving the rule that every identity keeps at least one reference. |

## Video

| Tool | Permission | What it does |
| --- | --- | --- |
| `create_video_master`<br/>**Create Video Master** | `canvas:write` | Open a video source with a detected scene map as a complete editable Video Master sequence. Every detected scene is retained and linked to its exact source segment. |
| `configure_video_master_scene`<br/>**Configure Video Master scene** | `canvas:write` | Configure one Video Master scene's order, role, prompt, video model, output ratio mode, resolution, generation duration and audio using the live provider catalogue. |
| `update_canvas_video_timeline`<br/>**Edit source video timeline** | `canvas:write` | Set exact source-scene cut times, select the full video or one resulting scene as the active output, or restore the immutable detected cuts. Changed ranges deliberately discard stale materialized clips. |
| `replace_canvas_video_segment`<br/>**Replace source video scene** | `library:write` | Use an approved Library video as the OUTPUT replacement for one detected source segment and synchronize any related Video Master scene. |
| `add_video_master_asset`<br/>**Add Library video to Video Master** | `library:write` | Append an approved Library video as a standalone Video Master scene using the same model, ratio, duration and ORIGINAL/OUTPUT defaults as a manual upload. |
| `export_video_master_media`<br/>**Export Video Master media** | `library:write` | Render one scene or the full ordered Video Master sequence from OUTPUT or ORIGINAL, save the MP4 into the approved canvas Library, and return its asset ID. |
| `copy_video_master_output`<br/>**Copy Video Master output** | `canvas:write` | Copy one saved generated output from a source Video Master scene into another scene without deleting either scene's output history. |
| `add_video_master_scene`<br/>**Add blank Video Master scene** | `canvas:write` | Append a new generator-only Video Master scene using the selected scene's model and format defaults, ready for a prompt and references. |
| `move_video_master_asset_lane`<br/>**Move uploaded Video Master clip lane** | `canvas:write` | Move one standalone uploaded Library clip between OUTPUT and ORIGINAL, updating the implicit scene video reference exactly like timeline drag-and-drop. |
| `remove_video_master_scene`<br/>**Remove Video Master scene** | `canvas:write` | Remove one Video Master scene, its scene-scoped reference edges, normalize the remaining order, and select the nearest surviving scene. |
| `capture_canvas_video_frame`<br/>**Capture video frame** | `library:write` | Capture an exact still frame from an accessible canvas video, store it in the same canvas Library, and add the resulting image node below the source just like the Canvas editor. |
| `materialize_canvas_video_segment`<br/>**Prepare video segment** | `library:write` | Materialize one detected or edited source scene as an exact zero-based MP4, then update every related canvas node, edge and Video Master scene without losing concurrent unrelated edits. |

## Models

| Tool | Permission | What it does |
| --- | --- | --- |
| `run_canvas_assistant`<br/>**Run Canvas Assistant** | `assistant:run` | Run an Assistant node with its exact connected text, system prompt, model and visual references. This may consume credits or provider resources. The result is saved only if the node inputs did not change while the model was running. |
| `compose_canvas_prompt`<br/>**Build generator prompt with Assistant** | `assistant:run` | Turn a brief into a model-aware Image or Video Generator prompt using the node's exact connected references. This may consume credits or provider resources. The prompt is inserted only if the node inputs did not change during the run. |
| `run_canvas_generation`<br/>**Run canvas generation** | `generation:run` | Start the configured Image or Video Generator node with its exact Assistant text, local prompt, model settings and typed asset references. This consumes credits or provider resources and returns a durable generation ID for get_canvas_generation. |
| `get_canvas_generation`<br/>**Get canvas generation** | `generation:run` | Check and reconcile one generation. Completed media is durably stored in the Library and merged into the target canvas node before the updated canvas is returned. |
| `cancel_canvas_generation`<br/>**Cancel canvas generation** | `generation:run` | Cancel a queued or active generation owned by an approved canvas, settle or release its usage reservation correctly, and clear the node's running state. |
| `edit_canvas_image`<br/>**Edit canvas image in place** | `generation:run` | Edit the active image in one existing canvas node, preserving the base image and output history. Optional approved Library references receive stable prompt tokens. This consumes credits or provider resources. |

## Automation

| Tool | Permission | What it does |
| --- | --- | --- |
| `list_automation_workflows`<br/>**List automation workflows** | `mcp:read` | List workflows available to a canvas, including system workflows and user workflows. Use get_automation_workflow for the graph and current draft version ID. |
| `get_automation_workflow`<br/>**Get automation workflow** | `mcp:read` | Get a workflow, its draft and published immutable versions, graph validation, and system-model issues. |
| `list_automation_triggers`<br/>**List Automation triggers** | `mcp:read` | List paused or active schedules, webhooks, and Canvas-event triggers for one workflow, including pinned version, fixed run inputs, overlap policy, concurrency, and next/last fire times. Webhook secrets are never re-exposed. |
| `list_automation_trigger_deliveries`<br/>**List Automation trigger deliveries** | `mcp:read` | Inspect automatic trigger delivery attempts, immutable version and input snapshots, retry state, errors, resulting run IDs, and open dead-letter alerts for one approved canvas. |
| `list_automation_deployment_bindings`<br/>**List Automation deployment bindings** | `mcp:read` | List credential and child-workflow slots connected to one workflow. Without the separately approved automation:credentials scope, credential names and IDs stay redacted while connection status remains visible. |
| `list_automation_versions`<br/>**List Automation versions** | `mcp:read` | List immutable draft, published, superseded, restored, and named-checkpoint version metadata for one workflow. |
| `export_automation_workflow`<br/>**Export portable Automation workflow** | `mcp:read` | Export a draft or published workflow as an integrity-checked credential-free package. Instance credentials and deployment bindings are never embedded. |
| `list_automation_fixtures`<br/>**List Automation test fixtures** | `mcp:read` | List pinned test fixtures for single-node previews, including immutable version, runtime inputs, and captured per-node inputs. |
| `list_automation_credentials`<br/>**List saved Automation credentials** | `automation:credentials` | List safe metadata for existing workspace credentials: ID, name, kind, fingerprint, and timestamps. Secret payloads are never returned to MCP. |
| `get_automation_capabilities`<br/>**Get Automation capabilities** | `mcp:read` | Read the canonical versioned node catalog: exact inputs, outputs, settings, defaults, RUN INPUTS sidebar bindings, prompt variables, dynamic ports, help, triggers, edge roles, and limits. Pass canvas_id to include the live model/ratio/resolution catalogue. |
| `validate_automation_workflow`<br/>**Validate Automation workflow** | `mcp:read` | Validate a complete draft without saving it. Returns every structural, node-setting, prompt-variable, port, route, retry, secret, and terminal-path issue plus ordered nodes and the exact run-input contract when parseable. |
| `validate_automation_connection`<br/>**Validate Automation connection** | `mcp:read` | Validate one proposed typed connection against the current graph before saving it, including exact ports, compatibility, edge role, duplicate inputs, disabled nodes, cycles, terminal nodes, error routes, and bounded retry rules. |
| `list_automation_runs`<br/>**List automation runs** | `mcp:read` | List recent top-level automation runs for a canvas, optionally filtered to one workflow. |
| `get_automation_run`<br/>**Get automation run** | `mcp:read` | Get one automation run with captured inputs, node outputs, events, costs, warnings, and exact immutable workflow version. |
| `diagnose_automation_run`<br/>**Diagnose Automation run** | `mcp:read` | Explain one run from its immutable workflow version, captured runtime inputs and asset snapshot, exact failed node attempts, error codes, outputs, and events. Returns targeted repair guidance and never retries automatically. |
| `create_automation_workflow`<br/>**Create automation workflow** | `automation:write` | Create a new draft workflow, optionally duplicating an existing workflow graph. This does not run or publish it. |
| `import_automation_workflow`<br/>**Import portable Automation workflow** | `automation:write` | Integrity-check and import a credential-free Automation package as an isolated draft on one approved canvas. Deployment slots must be connected again. |
| `restore_automation_version`<br/>**Restore Automation version** | `automation:write` | Create a new immutable draft copied from one historical version. Existing versions and run history remain preserved; it is not published automatically. |
| `set_system_automation_model`<br/>**Set system Automation model** | `mcp:read` | Change or reset one explicitly editable AI/image model override in a protected system workflow. Use null to reset to its template default. |
| `create_automation_fixture`<br/>**Create Automation test fixture** | `automation:write` | Save a bounded fixture pinned to the current workflow version for safe single-node previews, using explicit inputs or captured input from an accessible run. |
| `delete_automation_fixture`<br/>**Delete Automation test fixture** | `automation:write` | Delete one saved test fixture. Workflow versions and run history remain unchanged. |
| `create_automation_trigger`<br/>**Create Automation trigger** | `automation:write` | Create a paused schedule, authenticated webhook, or versioned Canvas-event trigger for a published workflow. Inputs must exactly match its published RUN INPUTS contract. Webhook URL secret is returned once. |
| `add_automation_node`<br/>**Add Automation node** | `mcp:read` | Add one canonical versioned node to the current draft using registry defaults. Optional config and run bindings are merged over those defaults; the returned draft includes validation issues that remain to be fixed. |
| `configure_automation_node`<br/>**Configure Automation node** | `automation:write` | Patch one existing node without replacing its type or version. Config keys merge, remove_config_fields deletes selected overrides, and a null binding removes that run binding. Re-read the returned draft ID before the next edit. |
| `set_automation_run_input`<br/>**Set Automation Run input** | `automation:write` | Control whether one runtime-bindable node setting is saved in the step or appears in the left RUN INPUTS sidebar. optional/required adds it immediately with key node-id.field-id; fixed removes it while preserving its current value. |
| `connect_automation_nodes`<br/>**Connect Automation nodes** | `automation:write` | Validate and add one exact typed connection. Invalid ports, roles, duplicate inputs, terminal continuations, cycles, and unsafe Retry routes are rejected before any draft is saved. |
| `remove_automation_connection`<br/>**Remove Automation connection** | `automation:write` | Remove one exact connection from the current draft. The run history and published version are unchanged. |
| `remove_automation_node`<br/>**Remove Automation node** | `automation:write` | Remove one node, its incident connections, and group membership from the current draft. The published version and previous run history are unchanged. |
| `configure_automation_workflow`<br/>**Configure Automation workflow** | `automation:write` | Patch workflow name, description, execution limits, overlap policy, concurrency, budget, or editor viewport while preserving the current graph. Re-read the returned draft ID before the next edit. |
| `bind_automation_subworkflow`<br/>**Bind Automation child workflow** | `automation:write` | Connect one deployment slot used by Run workflow or Map workflow to a published workflow in the same workspace. Recursive dependency cycles are rejected. |
| `unbind_automation_deployment_slot`<br/>**Unbind Automation deployment slot** | `automation:write` | Disconnect one child-workflow or credential slot. Disconnecting a credential additionally requires the automation:credentials OAuth permission. Secret values are never exposed. |
| `bind_automation_credential`<br/>**Bind saved Automation credential** | `automation:credentials` | Connect one existing saved workspace credential to an HTTP node deployment slot. Only credential metadata crosses MCP; the encrypted secret remains inside Scenelith. |
| `delete_automation_trigger`<br/>**Delete Automation trigger** | `automation:write` | Permanently remove one automatic trigger. Existing runs and their immutable history remain available. |
| `archive_automation_workflow`<br/>**Archive Automation workflow** | `automation:write` | Archive one user workflow and disable its automatic triggers. Protected system workflows cannot be archived; immutable versions and run history remain stored. |
| `save_automation_workflow`<br/>**Save automation workflow** | `automation:write` | Save a new immutable draft version of a user workflow. Pass the current draft ID from get_automation_workflow as base_draft_version_id; conflicts are rejected. |
| `publish_automation_workflow`<br/>**Publish automation workflow** | `automation:write` | Publish the current valid draft. Active triggers advance to the published immutable version. Invalid graphs or missing bindings are rejected. |
| `run_automation_workflow`<br/>**Run automation workflow** | `automation:run` | Queue an immutable workflow run with explicit run inputs. Production mode may consume provider resources or Cloud credits and can call external integrations configured in the workflow. |
| `cancel_automation_run`<br/>**Cancel automation run** | `automation:run` | Cancel a queued or running automation and its active child runs. Completed runs and their history are not deleted. |
| `preview_automation_node`<br/>**Preview one Automation node** | `automation:run` | Queue a side-effect-aware single-node preview using one pinned fixture. Poll get_automation_run for captured input, exact output, events, and errors. |
| `retry_automation_run_from_node`<br/>**Retry Automation run from node** | `automation:run` | Create a linked immutable retry run from one failed node. Only retry-safe upstream outputs are reused; diagnose the original run before calling this. |
| `set_automation_trigger_status`<br/>**Activate or pause Automation trigger** | `automation:write` | Activate or pause one trigger. Activation revalidates its exact inputs and deployment bindings, then pins the workflow's current published immutable version. |
| `replay_automation_trigger_delivery`<br/>**Replay failed Automation trigger delivery** | `automation:write` | Replay one dead-letter delivery from its immutable workflow version, runtime inputs, payload, deployment snapshot, and admission policy. Diagnose the original failure first; non-dead-letter deliveries are rejected. |
