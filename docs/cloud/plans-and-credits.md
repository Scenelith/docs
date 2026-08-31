---
title: Plans and credit balance
description: Cloud plan allowances, concurrency and purchased-credit behavior.
---

# Plans and credit balance

This page applies to **Scenelith Cloud**. Self-hosted Scenelith uses operator-supplied provider accounts instead.

## Current plans

| Plan | Monthly | Annual equivalent | Included credits | Parallel generations | Seats |
| --- | ---: | ---: | ---: | ---: | ---: |
| Solo | $19.99/mo | $15/mo | 1,200 | 2 | 1 |
| Creator | $49.99/mo | $39/mo | 4,000 | 4 | 1 |
| Studio | $99.99/mo | $79/mo | 8,000 | 8 | 5 |

Solo includes all available image/video models, TikTok import, visual references, saved Identities and automatic credit return for failed generations. Creator adds higher parallelism and priority queue behavior. Studio adds a shared team credit pool, project/Canvas access controls, eight parallel generations and priority support.

## Balance buckets

The usage view separates:

- subscription allowance remaining;
- purchased credits remaining;
- credit debt, if settlement exceeded available balance;
- total used/limit/remaining;
- renewal time and plan/billing status.

Subscription credits are spent before purchased credits. A renewal resets only the subscription allowance; purchased credits stay in the workspace.

## Extra credit packs

Default Cloud configuration offers:

| Pack | Default price |
| --- | ---: |
| 1,000 credits | $17.99 |
| 3,000 credits | $44.99 |
| 8,000 credits | $109.99 |
| 20,000 credits | $249.99 |

An installation can configure a different validated pack catalogue, so the checkout UI is the final source for packs available to that account.

Purchased credits first repay any existing credit debt. A workspace with debt cannot start new paid generation or Automation work.

See [Credits and generation cost](../canvas/credits.md) for per-model estimates, settlement and refunds.
