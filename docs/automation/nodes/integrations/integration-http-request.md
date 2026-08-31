---
title: "Connect an external service"
description: "Sends information to an external app or API and passes its answer to the next step. Complete settings, connections, runtime behavior and usage guidance."
---

# Connect an external service

`integration.http-request@1`

## What this node does

Sends information to an external app or API and passes its answer to the next step.

| Category | Terminal step | Safe to retry |
| --- | --- | --- |
| Integrations | No | No |

## When to use it

Use this to exchange data with an external service that provides an HTTP API, such as publishing, enrichment or a custom backend.

## Connections

| Direction | Port | Type | Contract |
| --- | --- | --- | --- |
| Input | Information to send `data` | `data` | Optional · Single connection · Connectable |
| Output | Service response `response` | `data` | Typed output · Connectable |
| Output | Error path `error` | `error` | Typed output · Connectable |

## Settings

These are the settings shown by the current Automation editor. Conditional and advanced fields are called out explicitly.

| Setting | Control | Rules | Default or choices |
| --- | --- | --- | --- |
| **Where should the request go?** `url`<br/>Paste a complete public HTTP or HTTPS address. Private-network and credential-in-URL addresses are blocked. Placeholder: https://api.example.com/v1/action | `text` | Required · Fixed only | `` |
| **What should the service do?** `method`<br/>GET reads data, HEAD checks metadata, and POST usually creates or sends data. Match the service documentation. | `select` | Optional · Fixed only | GET (`GET`) / HEAD (`HEAD`) / POST (`POST`) / PUT (`PUT`) / PATCH (`PATCH`) / DELETE (`DELETE`) |
| **Information to send** `body`<br/>The JSON content sent to the service. Use &#123;&#123; data &#125;&#125;, &#123;&#123; run &#125;&#125; or &#123;&#123; trigger &#125;&#125; to insert connected or run-time values. | `json` | Optional · Fixed only · visible when `method` is "POST" / "PUT" / "PATCH" / "DELETE" | `&#123;&#125;` |
| **Connection name** `credentialSlot`<br/>Give this secret connection a safe name. The actual key is selected below and never exported. Placeholder: Example: post-bridge | `text` | Optional · Fixed only | — |
| **How the service checks the key** `credentialKind`<br/>Choose the method required by the service. Bearer token is the most common. | `select` | Optional · Fixed only | API key (`api-key`) / Bearer token (`bearer`) / Username and password (`basic`) / Custom header (`header`) |
| **Extra request headers** `headers`<br/>Advanced. Add only headers required by the external service; secrets belong in the saved connection below. | `json` | Optional · Fixed only · Advanced | `&#123;&#125;` |
| **Stop waiting after, seconds** `timeoutSeconds`<br/>How long to wait before treating the service as unavailable. | `number` | Optional · 1–120 · Fixed only · Advanced | `30` |
| **How many times to try** `maxAttempts`<br/>Retries temporary network or service failures. Create or change requests need an explicit Idempotency-Key header before more than one attempt is allowed. | `number` | Optional · 1–5 · Fixed only · Advanced | `1` |
| **If the service still fails** `failureMode`<br/>Stop, route a safe error response to a recovery path, or continue with an empty service response. | `select` | Optional · Fixed only · Advanced | Stop and show the error (`stop`) / Send the error to another path (`error-output`) / Continue without an answer (`continue-empty`) |

## How to configure it

1. Read the service API documentation and choose the URL and method it requires.
2. Build the request body from earlier workflow data.
3. Name the secret connection without pasting the secret into the workflow.
4. In Settings, connect a saved credential.
5. Connect Service response and decide whether an error should stop or follow a recovery path.

## Example flow

**Approved caption → Publishing service response**

The request runs on the server with the saved credential; only the service response enters the workflow.

## What happens at run time

- Server-side HTTP transport blocks private-network targets and applies timeout, retry and response-size policies. Only network failures, rate limits, selected conflict statuses and server errors are retried.
- POST, PUT, PATCH and DELETE send JSON; GET and HEAD send no body. Successful responses include status, success flag, safe headers and parsed JSON or text body. Redirects are not followed and count as unsuccessful responses.
- When Send the error to another path is enabled, that path receives the safe response status, headers and body when the service returned one.
- Credential bindings stay local and are excluded from exports.

## Practical notes

- Never paste API keys into URL, headers or body fields.
- Test with a non-production endpoint or fixture first.
