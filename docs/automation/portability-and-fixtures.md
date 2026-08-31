---
title: Portability, history and fixtures
description: Export/import workflows, restore immutable versions and preview one node from pinned test data.
---

# Portability, history and fixtures

## Export and import

**Manage → Export JSON** downloads a credential-free `.scenelith-automation.json` package. The visual editor saves and exports the current draft when one exists; otherwise it exports the published version. The API and MCP require the caller to choose `draft` or `published`, and fail when that selected version does not exist.

Packages carry a format/version, workflow graph, declared requirements and an integrity digest. Import verifies the digest, rejects tampering and assigns a new workflow and version ID. Credentials and local deployment bindings are never included and must be connected again.

The visual **Manage → Import workflow** flow accepts packages smaller than 3 MB, creates the isolated workflow and automatically publishes it only when validation passes and the current user has publish permission. MCP `import_automation_workflow` always returns the imported workflow as a draft; publishing remains a separate explicit action.

## Version history and restore

Every saved draft and published release remains an immutable version record. Restoring a historical version creates a new draft with explicit lineage; it never mutates the old version and never publishes automatically. Runs remain pinned to the version they originally captured.

Deleting a user-created workflow removes it from the active Canvas list but retains existing run history. Protected system workflows cannot be deleted; duplicate one to customize its graph.

## Fixtures and one-node preview

A fixture is a named, serializable test payload pinned to one workflow version. It can contain runtime inputs and explicit per-node inputs, or capture the immutable inputs from an accessible prior run. Names are 1–120 characters and the complete fixture is limited to 1 MB.

Preview runs only the selected node against that pinned data. It validates the node's deployment bindings, has one attempt, and caps the preview deadline at 15 minutes even when the workflow timeout is longer. Preview is not a production trigger and does not publish a draft.

Fixtures and historical restore are currently exposed through the Automation API/MCP toolset; the visual editor's **Manage** menu exposes workflow import/export and run history.
