---
title: Feature board
description: Submit ideas, follow moderation and vote on approved requests.
---

# Feature board

The Cloud Feature board collects product proposals, moderates them before publication and lets the community prioritize approved ideas.

## Submit an idea

Write the problem first and the outcome you want.

- Title: 5–120 characters
- Description: 30–5,000 characters

A new request starts **In review** and appears under **My requests** for its author. It is not automatically public or votable.

## Status lifecycle

| UI status | Internal status | Public / votable |
| --- | --- | --- |
| In review | `pending` | Author/admin only; not votable |
| Open for voting | `approved` | Public; votable |
| Planned | `planned` | Public; votable |
| In progress | `in_progress` | Public; votable |
| Completed | `shipped` | Public; voting closed |
| Declined | `rejected` | Author/admin only; not votable |

Moderators can add a note shown with the request or hide/restore it. A hidden request is not shown on the public board.

## Views

- **Popular**: approved, planned and in-progress ideas, ordered by votes.
- **Roadmap**: planned and in-progress ideas.
- **Completed**: shipped ideas.
- **My requests**: all requests you authored, including in-review or declined states.

Voting is a toggle on votable statuses. The vote count updates immediately after the server confirms the change. Roadmap status updates can appear in account notifications.
