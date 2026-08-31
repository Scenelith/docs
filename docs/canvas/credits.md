---
title: Credits and generation cost
description: How Cloud credits are estimated, reserved, settled and refunded.
---

# Credits and generation cost

Credits apply to **Scenelith Cloud**. A self-hosted installation does not maintain a Scenelith credit balance; its operator pays the configured model providers directly.

## Before a run

The Generator shows an estimate derived from the selected model, resolution, duration, reference count and options such as audio or video input. Workspace balances use whole credits, so fractional provider charges are rounded up.

Image pricing is fixed per output. Video pricing is normally a per-second rate; Veo uses a fixed per-generation price. Seedance with a video input bills both output duration and input-video duration at its video-input rate. Kling Motion bills the reference-video duration.

## Image cost per output

| Model | 1K | 2K | 3K | 4K | Extra rule |
| --- | ---: | ---: | ---: | ---: | --- |
| Nano Banana 2 Lite | 4 | — | — | — | — |
| Nano Banana 2 | 8 | 12 | — | 18 | — |
| Nano Banana Pro | 18 | 18 | — | 24 | — |
| GPT Image 2 | 6 | 10 | — | 16 | — |
| Grok Imagine Image 2.0 | 4 | — | — | — | — |
| Seedream 5 Pro | 7 | 14 | — | — | First reference included; each additional reference adds 0.5 before rounding |
| Seedream 5 Lite | — | 6 | 6 | 6 | Provider rate 5.5, rounded to 6 |
| FLUX.2 Flex | 14 | 24 | — | — | — |
| Imagen 4 Fast | 4 | — | — | — | Text-to-image only |
| Imagen 4 Ultra | 12 | — | — | — | Text-to-image only |

## Video cost

Except where marked fixed, multiply the rate by billed seconds and round up.

| Model | 480p | 720p | 1080p | 4K | Billing |
| --- | ---: | ---: | ---: | ---: | --- |
| Seedance 2 Fast | 15.5/s | 33/s | — | — | output seconds |
| Seedance 2 Mini | 9.5/s | 20.5/s | — | — | output seconds |
| Seedance 2 | 19/s | 41/s | 102/s | 208/s | output seconds |
| Seedance 2.5 | 28/s | 63/s | video input only | — | output seconds |
| Kling 3.0, audio | — | 20/s | 27/s | 67/s | output seconds |
| Kling 3.0, silent | — | 14/s | 18/s | 67/s | output seconds |
| Kling 3.0 Turbo Text / Image | — | 18/s | 22.5/s | — | output seconds |
| Kling 3.0 Motion Control | — | 20/s | 27/s | — | reference-video seconds |
| Grok Imagine Text / Image | 2.4/s | 4.5/s | 8/s | — | output seconds |
| Grok Imagine Video 1.5 Preview | 2.4/s | 4.5/s | — | — | output seconds |
| WAN 2.7 | — | 16/s | 24/s | — | output seconds |
| Veo 3.1 Fast | — | 60 | 65 | 180 | fixed per output |
| Veo 3.1 Quality | — | 250 | 255 | 380 | fixed; 4K image-to-video is 370 |

### Seedance with video input

When a Seedance model receives video, billed seconds are `output duration + input-video duration`.

| Model | 480p | 720p | 1080p | 4K |
| --- | ---: | ---: | ---: | ---: |
| Seedance 2 Fast | 9/s | 20/s | — | — |
| Seedance 2 Mini | 6/s | 12.5/s | — | — |
| Seedance 2 | 11.5/s | 25/s | 62/s | 128/s |
| Seedance 2.5 | 17/s | 38/s | 68.5/s | — |

## Reservation and settlement

Cloud reserves the estimate before dispatch so concurrent jobs cannot overspend the same balance. Subscription credits are consumed first, then purchased credits.

- A successful generation settles its reservation at the final cost.
- A failed or cancelled generation refunds its active reservation.
- Subscription credits are refunded only into the same subscription allowance period; purchased credits remain refundable across renewal boundaries.
- Automation reserves an estimate and settles actual usage. Underuse is refunded. Overuse can take more available balance; if the full amount cannot be covered, settlement is capped and debt prevents new paid work until repaid.

Purchased credit packs first repay any credit debt; only the remainder becomes spendable purchased balance. Subscription renewal resets the subscription allowance but preserves purchased credits.

## Assistant cost

Gemini 3.7 Flash is included in Cloud. Other Assistant models are metered from the provider-reported cost, multiplied by the Cloud markup and converted to whole credits. The final charge comes from the provider response, not only the pre-run token estimate.
