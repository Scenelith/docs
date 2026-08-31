---
title: Models
description: Every image, video and Assistant model currently exposed by Scenelith.
---

# Models

> This page is generated from the product registries. Model availability still depends on the configured provider and the selected input shape.

## Image models

| Model | Resolution | References | Prompt limit | Notes |
| --- | --- | ---: | ---: | --- |
| **Nano Banana 2 Lite** `nano-banana-2-lite` | 1K | 10 | 20,000 chars | Fast Google generation and editing · up to 10 references · 1K |
| **Nano Banana 2** `nano-banana-2` | 1K, 2K, 4K | 14 | 20,000 chars | Google Gemini 3.1 Flash Image · up to 14 references · 1K–4K |
| **Nano Banana Pro** `nano-banana-pro` | 1K, 2K, 4K | 8 | 10,000 chars | Google premium image generation · up to 8 references · 1K–4K |
| **GPT Image 2** `gpt-image-2` | 1K, 2K, 4K | 16 | 20,000 chars | Photorealistic generation and editing · up to 16 references · 1K–4K |
| **Grok Imagine Image 2.0** `grok-image-2` | 1K | 1 | provider limit | Fast image generation and editing · one image reference |
| **Seedream 5 Pro** `seedream-5-pro` | 1K, 2K | 10 | provider limit | High-fidelity generation and editing · up to 10 references · 1K–2K |
| **Seedream 5 Lite** `seedream-5-lite` | 2K, 3K, 4K | 14 | 3,000 chars | Fast photorealistic generation · up to 14 references · 2K–4K |
| **FLUX.2 Flex** `flux-2-flex` | 1K, 2K | 8 | provider limit | Flexible generation and editing · up to 8 references · 1K–2K |
| **Imagen 4 Fast** `imagen4-fast` | 1K | 0 | provider limit | Google Imagen · fast text-to-image iteration |
| **Imagen 4 Ultra** `imagen4-ultra` | 1K | 0 | provider limit | Google Imagen · maximum text-to-image quality |

## Video models

| Model | Resolution | Duration | References | Notes |
| --- | --- | --- | ---: | --- |
| **Seedance 2 Fast** `seedance-2-fast` | 480P, 720P | 4–15s | 15 | Fast multimodal video · 4–15s · frames, image, video and audio references |
| **Seedance 2 Mini** `seedance-2-mini` | 480P, 720P | 4–15s | 15 | Efficient multimodal video · 4–15s · frames and reference media |
| **Seedance 2** `seedance-2` | 480P, 720P, 1080P, 4K | 4–15s | 15 | Cinematic multimodal video · 4–15s · up to 4K |
| **Seedance 2.5** `seedance-2-5` | 480P, 720P, 1080P | 4–30s | 50 | Latest multimodal video · 4–30s · up to 1080p with video input |
| **Kling 3.0** `kling-3` | 720P, 1080P, 4K | 3–15s | 2 | Regular Kling · 3–15s · 720p, 1080p or 4K |
| **Kling 3.0 Turbo · Text** `kling-3-turbo-text` | 720P, 1080P | 3–15s | 0 | Fast text-to-video · 3–15s · 720p or 1080p |
| **Kling 3.0 Turbo · Image** `kling-3-turbo-image` | 720P, 1080P | 3–15s | 1 | Fast image-to-video · 3–15s · 720p or 1080p |
| **Kling 3.0 Motion Control** `kling-3-motion` | 720P, 1080P | reference video | 2 | Transfer movement from a 3–30s reference video to a start image |
| **Grok Imagine · Text** `grok-video-text` | 480P, 720P, 1080P | 6–30s | 0 | Text-to-video · 6–30s · up to 1080p |
| **Grok Imagine · Image** `grok-video-image` | 480P, 720P, 1080P | 6–30s | 7 | Image-to-video · 6–30s · up to 7 images |
| **Grok Imagine Video 1.5 Preview** `grok-video-1-5` | 480P, 720P | 1–15s | 7 | Text or image-to-video · 1–15s · 480p or 720p · up to 7 images |
| **WAN 2.7** `wan-2-7` | 720P, 1080P | 2–15s | 4 | Text, first/last-frame or continuation video · 2–15s |
| **Veo 3.1 Fast** `veo-3-1-fast` | 720P, 1080P, 4K | 4–8s | 3 | Google video with native audio · 4, 6 or 8s · frames or material references |
| **Veo 3.1 Quality** `veo-3-1` | 720P, 1080P, 4K | 4–8s | 2 | Google flagship video with native audio · 4, 6 or 8s · text or first/last frames |

## Assistant models

| Model | ID | Visual input | Cloud charging |
| --- | --- | --- | --- |
| **Gemini 3.7 Flash** | `google/gemini-3.7-flash` | Yes | Included |
| **Qwen 3.8 Max** | `qwen/qwen3.8-max` | Yes | Metered |
| **Qwen 3.7 Flash** | `qwen/qwen3.7-flash` | Yes | Metered |
| **Gemini 3.6 Flash** | `google/gemini-3.6-flash` | Yes | Metered |
| **Kimi K3** | `moonshotai/kimi-k3` | Yes | Metered |
| **GPT-5.6 Luna Pro** | `openai/gpt-5.6-luna-pro` | Yes | Metered |
| **GPT-5.6 Terra Pro** | `openai/gpt-5.6-terra-pro` | Yes | Metered |
| **GPT-5.6 Sol Pro** | `openai/gpt-5.6-sol-pro` | Yes | Metered |
| **Grok 4.5** | `x-ai/grok-4.5` | Yes | Metered |
| **Claude Sonnet 5** | `anthropic/claude-sonnet-5` | Yes | Metered |
| **GLM 5.2** | `z-ai/glm-5.2` | No | Metered |

The default Assistant model is **Gemini 3.7 Flash**. In Cloud it is included; other Assistant models are metered from the provider-reported cost. In self-hosted Scenelith, Assistant usage is billed by the provider account you configure.
