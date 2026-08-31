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

## Generation model contracts

### Nano Banana 2 Lite {#nano-banana-2-lite}

`nano-banana-2-lite` · image · up to 10 references · prompt up to 20,000 characters.

- Aspect ratios: auto, 1:1, 1:4, 1:8, 2:3, 3:2, 3:4, 4:1, 4:3, 4:5, 5:4, 8:1, 9:16, 16:9, 21:9. Default: `auto`.
- Resolutions: 1K. Default: `1K`.

**Input ports**

- **Reference images** `reference-image` — `image`; optional; maximum 10.

### Nano Banana 2 {#nano-banana-2}

`nano-banana-2` · image · up to 14 references · prompt up to 20,000 characters.

- Aspect ratios: auto, 1:1, 2:3, 3:2, 1:4, 4:1, 3:4, 4:3, 4:5, 5:4, 1:8, 8:1, 9:16, 16:9, 21:9. Default: `auto`.
- Resolutions: 1K, 2K, 4K. Default: `1K`.
- Aspect ratios by resolution: `1K`: `auto`, `1:1`, `2:3`, `3:2`, `1:4`, `4:1`, `3:4`, `4:3`, `4:5`, `5:4`, `1:8`, `8:1`, `9:16`, `16:9`, `21:9`; `2K`: `auto`, `1:1`, `2:3`, `3:2`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16`, `16:9`, `21:9`; `4K`: `auto`, `1:1`, `2:3`, `3:2`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16`, `16:9`, `21:9`.

**Input ports**

- **Reference images** `reference-image` — `image`; optional; maximum 14.

### Nano Banana Pro {#nano-banana-pro}

`nano-banana-pro` · image · up to 8 references · prompt up to 10,000 characters.

- Aspect ratios: 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9, auto. Default: `1:1`.
- Resolutions: 1K, 2K, 4K. Default: `1K`.

**Input ports**

- **Reference images** `reference-image` — `image`; optional; maximum 8.

### GPT Image 2 {#gpt-image-2}

`gpt-image-2` · image · up to 16 references · prompt up to 20,000 characters.

- Aspect ratios: auto, 1:1, 3:2, 2:3, 4:3, 3:4, 5:4, 4:5, 16:9, 9:16, 2:1, 1:2, 3:1, 1:3, 21:9, 9:21. Default: `auto`.
- Resolutions: 1K, 2K, 4K. Default: `1K`.
- Aspect ratios by resolution: `1K`: `auto`, `1:1`, `3:2`, `2:3`, `4:3`, `3:4`, `5:4`, `4:5`, `16:9`, `9:16`, `2:1`, `1:2`, `3:1`, `1:3`, `21:9`, `9:21`; `2K`: `1:1`, `3:2`, `2:3`, `4:3`, `3:4`, `16:9`, `9:16`, `2:1`, `1:2`, `21:9`; `4K`: `3:2`, `2:3`, `4:3`, `3:4`, `16:9`, `9:16`, `2:1`, `1:2`, `21:9`.
- Aspect ratios with reference images: `1K`: `auto`, `1:1`, `3:2`, `2:3`, `4:3`, `3:4`, `5:4`, `4:5`, `16:9`, `9:16`, `2:1`, `1:2`, `3:1`, `1:3`, `21:9`, `9:21`; `2K`: `1:1`, `3:2`, `2:3`, `4:3`, `3:4`, `16:9`, `9:16`, `2:1`, `1:2`, `3:1`, `1:3`, `21:9`, `9:21`; `4K`: `3:2`, `2:3`, `4:3`, `3:4`, `16:9`, `9:16`, `2:1`, `1:2`, `3:1`, `1:3`, `21:9`, `9:21`.

**Input ports**

- **Reference images** `reference-image` — `image`; optional; maximum 16.

### Grok Imagine Image 2.0 {#grok-image-2}

`grok-image-2` · image · up to 1 reference · prompt uses the provider limit.

- Aspect ratios: 1:1, 2:3, 3:2, 16:9, 9:16. Default: `1:1`.
- Resolutions: 1K. Default: `1K`.

**Input ports**

- **Image reference** `reference-image` — `image`; optional; maximum 1.

### Seedream 5 Pro {#seedream-5-pro}

`seedream-5-pro` · image · up to 10 references · prompt uses the provider limit.

- Aspect ratios: 1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2, 21:9. Default: `1:1`.
- Resolutions: 1K, 2K. Default: `1K`.

**Input ports**

- **Reference images** `reference-image` — `image`; optional; maximum 10.

### Seedream 5 Lite {#seedream-5-lite}

`seedream-5-lite` · image · up to 14 references · prompt up to 3,000 characters.

- Aspect ratios: 1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2, 21:9. Default: `1:1`.
- Resolutions: 2K, 3K, 4K. Default: `2K`.

**Input ports**

- **Reference images** `reference-image` — `image`; optional; maximum 14.

### FLUX.2 Flex {#flux-2-flex}

`flux-2-flex` · image · up to 8 references · prompt uses the provider limit.

- Aspect ratios: 1:1, 4:3, 3:4, 16:9, 9:16, 3:2, 2:3, auto. Default: `1:1`.
- Resolutions: 1K, 2K. Default: `1K`.
- Ratios available only when references are connected: `auto`.

**Input ports**

- **Reference images** `reference-image` — `image`; optional; maximum 8.

### Imagen 4 Fast {#imagen4-fast}

`imagen4-fast` · image · up to 0 references · prompt uses the provider limit.

- Aspect ratios: 1:1, 16:9, 9:16, 3:4, 4:3, auto. Default: `16:9`.
- Resolutions: 1K. Default: `1K`.

**Input ports**

- No media input ports; text-to-media only.

### Imagen 4 Ultra {#imagen4-ultra}

`imagen4-ultra` · image · up to 0 references · prompt uses the provider limit.

- Aspect ratios: 1:1, 16:9, 9:16, 3:4, 4:3, auto. Default: `1:1`.
- Resolutions: 1K. Default: `1K`.

**Input ports**

- No media input ports; text-to-media only.

### Seedance 2 Fast {#seedance-2-fast}

`seedance-2-fast` · video · up to 15 references · prompt up to 20,000 characters.

- Aspect ratios: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive. Default: `16:9`.
- Resolutions: 480P, 720P. Default: `720P`.
- Duration: 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 seconds. Default: `5s`.
- Generated audio: supported; default on.
- Input modes are exclusive: use start/end frames or multimodal image/video/audio references, never both. Reference video and audio are 2–15s each and 15s total unless this model states a different limit above.

**Input ports**

- **Start image** `start-frame` — `image`; optional; maximum 1.
- **End image** `end-frame` — `image`; optional; maximum 1.
- **Reference video** `reference-video` — `video`; optional; maximum 3.
- **Audio input** `reference-audio` — `audio`; optional; maximum 3.
- **Reference images** `reference-image` — `image`; optional; maximum 9.

### Seedance 2 Mini {#seedance-2-mini}

`seedance-2-mini` · video · up to 15 references · prompt up to 20,000 characters.

- Aspect ratios: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive. Default: `16:9`.
- Resolutions: 480P, 720P. Default: `720P`.
- Duration: 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 seconds. Default: `5s`.
- Generated audio: supported; default on.
- Input modes are exclusive: use start/end frames or multimodal image/video/audio references, never both. Reference video and audio are 2–15s each and 15s total unless this model states a different limit above.

**Input ports**

- **Start image** `start-frame` — `image`; optional; maximum 1.
- **End image** `end-frame` — `image`; optional; maximum 1.
- **Reference video** `reference-video` — `video`; optional; maximum 3.
- **Audio input** `reference-audio` — `audio`; optional; maximum 3.
- **Reference images** `reference-image` — `image`; optional; maximum 9.

### Seedance 2 {#seedance-2}

`seedance-2` · video · up to 15 references · prompt up to 20,000 characters.

- Aspect ratios: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive. Default: `16:9`.
- Resolutions: 480P, 720P, 1080P, 4K. Default: `720P`.
- Duration: 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 seconds. Default: `5s`.
- Generated audio: supported; default on.
- Input modes are exclusive: use start/end frames or multimodal image/video/audio references, never both. Reference video and audio are 2–15s each and 15s total unless this model states a different limit above.

**Input ports**

- **Start image** `start-frame` — `image`; optional; maximum 1.
- **End image** `end-frame` — `image`; optional; maximum 1.
- **Reference video** `reference-video` — `video`; optional; maximum 3.
- **Audio input** `reference-audio` — `audio`; optional; maximum 3.
- **Reference images** `reference-image` — `image`; optional; maximum 9.

### Seedance 2.5 {#seedance-2-5}

`seedance-2-5` · video · up to 50 references · prompt up to 30,000 characters.

- Aspect ratios: 16:9, 9:16, 1:1, 4:3, 3:4, 21:9, adaptive. Default: `adaptive`.
- Resolutions: 480P, 720P, 1080P. Default: `720P`.
- Duration: 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 seconds. Default: `5s`.
- Generated audio: supported; default on.
- Video input is required at: 1080P.
- Reference media: 2–30s each; 30s total.
- Input modes are exclusive: use start/end frames or multimodal image/video/audio references, never both. Reference video and audio are 2–15s each and 15s total unless this model states a different limit above.

**Input ports**

- **Start image** `start-frame` — `image`; optional; maximum 1.
- **End image** `end-frame` — `image`; optional; maximum 1.
- **Reference videos** `reference-video` — `video`; optional; maximum 10.
- **Audio inputs** `reference-audio` — `audio`; optional; maximum 10.
- **Reference images** `reference-image` — `image`; optional; maximum 30.

### Kling 3.0 {#kling-3}

`kling-3` · video · up to 2 references · prompt uses the provider limit.

- Aspect ratios: 16:9, 9:16, 1:1. Default: `16:9`.
- Resolutions: 720P, 1080P, 4K. Default: `1080P`.
- Duration: 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 seconds. Default: `5s`.
- Generated audio: supported; default off.

**Input ports**

- **Start frame** `start-frame` — `image`; optional; maximum 1.
- **End frame** `end-frame` — `image`; optional; maximum 1.

### Kling 3.0 Turbo · Text {#kling-3-turbo-text}

`kling-3-turbo-text` · video · up to 0 references · prompt up to 2,500 characters.

- Aspect ratios: 16:9, 9:16, 1:1. Default: `16:9`.
- Resolutions: 720P, 1080P. Default: `720P`.
- Duration: 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 seconds. Default: `5s`.
- Generated audio: not exposed.

**Input ports**

- No media input ports; text-to-media only.

### Kling 3.0 Turbo · Image {#kling-3-turbo-image}

`kling-3-turbo-image` · video · up to 1 reference · prompt up to 2,500 characters.

- Aspect ratios: 16:9, 9:16, 1:1. Default: `16:9`.
- Resolutions: 720P, 1080P. Default: `720P`.
- Duration: 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 seconds. Default: `5s`.
- Generated audio: not exposed.

**Input ports**

- **Start image** `start-frame` — `image`; required; maximum 1.

### Kling 3.0 Motion Control {#kling-3-motion}

`kling-3-motion` · video · up to 2 references · prompt up to 2,500 characters.

- Aspect ratios: 16:9, 9:16, 1:1. Default: `16:9`.
- Resolutions: 720P, 1080P. Default: `720P`.
- Duration: taken from the reference video.
- Generated audio: not exposed.
- The reference video must be 3–30 seconds; output duration is inherited from that video and rounded up to a whole second for admission.

**Input ports**

- **Start image** `start-frame` — `image`; required; maximum 1.
- **Reference video** `reference-video` — `video`; required; maximum 1.

### Grok Imagine · Text {#grok-video-text}

`grok-video-text` · video · up to 0 references · prompt uses the provider limit.

- Aspect ratios: 2:3, 3:2, 1:1, 16:9, 9:16. Default: `2:3`.
- Resolutions: 480P, 720P, 1080P. Default: `480P`.
- Duration: 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 seconds. Default: `6s`.
- Generated audio: not exposed.

**Input ports**

- No media input ports; text-to-media only.

### Grok Imagine · Image {#grok-video-image}

`grok-video-image` · video · up to 7 references · prompt uses the provider limit.

- Aspect ratios: 16:9, 9:16, 1:1, 2:3, 3:2. Default: `16:9`.
- Resolutions: 480P, 720P, 1080P. Default: `480P`.
- Duration: 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 seconds. Default: `6s`.
- Generated audio: not exposed.
- At 1080P this model accepts exactly one connected image; lower resolutions accept up to the port maximum.

**Input ports**

- **Reference images** `reference-image` — `image`; required; maximum 7.

### Grok Imagine Video 1.5 Preview {#grok-video-1-5}

`grok-video-1-5` · video · up to 7 references · prompt up to 4,096 characters.

- Aspect ratios: auto, 16:9, 9:16, 1:1, 3:2, 2:3. Default: `auto`.
- Resolutions: 480P, 720P. Default: `480P`.
- Duration: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 seconds. Default: `8s`.
- Generated audio: not exposed.

**Input ports**

- **Reference images** `reference-image` — `image`; optional; maximum 7.

### WAN 2.7 {#wan-2-7}

`wan-2-7` · video · up to 4 references · prompt uses the provider limit.

- Aspect ratios: 16:9, 9:16, 1:1, 4:3, 3:4. Default: `16:9`.
- Resolutions: 720P, 1080P. Default: `1080P`.
- Duration: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 seconds. Default: `5s`.
- Generated audio: not exposed.
- Input modes are exclusive: use start/end frames or one continuation clip, never both.

**Input ports**

- **Start frame** `start-frame` — `image`; optional; maximum 1.
- **End frame** `end-frame` — `image`; optional; maximum 1.
- **Continuation clip** `reference-video` — `video`; optional; maximum 1.
- **Audio input** `reference-audio` — `audio`; optional; maximum 1.

### Veo 3.1 Fast {#veo-3-1-fast}

`veo-3-1-fast` · video · up to 3 references · prompt uses the provider limit.

- Aspect ratios: 16:9, 9:16, auto. Default: `16:9`.
- Resolutions: 720P, 1080P, 4K. Default: `720P`.
- Duration: 4, 6, 8 seconds. Default: `8s`.
- Generated audio: supported; default on.
- Input modes are exclusive: use first/last frames or material references. Material-reference mode supports only an 8-second duration.

**Input ports**

- **Start frame** `start-frame` — `image`; optional; maximum 1.
- **End frame** `end-frame` — `image`; optional; maximum 1.
- **Material references** `reference-image` — `image`; optional; maximum 3.

### Veo 3.1 Quality {#veo-3-1}

`veo-3-1` · video · up to 2 references · prompt uses the provider limit.

- Aspect ratios: 16:9, 9:16, auto. Default: `16:9`.
- Resolutions: 720P, 1080P, 4K. Default: `720P`.
- Duration: 4, 6, 8 seconds. Default: `8s`.
- Generated audio: supported; default on.

**Input ports**

- **Start frame** `start-frame` — `image`; optional; maximum 1.
- **End frame** `end-frame` — `image`; optional; maximum 1.

> For every model, an end frame is valid only when a start frame is also connected. Invalid saved settings fall back to the first compatible registry value at generation admission; missing required ports and excess per-port inputs are rejected.

## Assistant models

| Model | Provider | Visual input | Estimate rate / 1M tokens | Cloud charging |
| --- | --- | --- | --- | --- |
| **Gemini 3.7 Flash**<br/>`google/gemini-3.7-flash` | Google | Yes | $0.375 input / $1.875 output | Included |
| **Qwen 3.8 Max**<br/>`qwen/qwen3.8-max` | Qwen | Yes | $2 input / $6 output | Metered |
| **Qwen 3.7 Flash**<br/>`qwen/qwen3.7-flash` | Qwen | Yes | $0.03 input / $0.13 output | Metered |
| **Gemini 3.6 Flash**<br/>`google/gemini-3.6-flash` | Google | Yes | $1.5 input / $7.5 output | Metered |
| **Kimi K3**<br/>`moonshotai/kimi-k3` | Moonshot AI | Yes | $3 input / $15 output | Metered |
| **GPT-5.6 Luna Pro**<br/>`openai/gpt-5.6-luna-pro` | OpenAI | Yes | $0.1 input / $0.6 output | Metered |
| **GPT-5.6 Terra Pro**<br/>`openai/gpt-5.6-terra-pro` | OpenAI | Yes | $1 input / $6 output | Metered |
| **GPT-5.6 Sol Pro**<br/>`openai/gpt-5.6-sol-pro` | OpenAI | Yes | $5 input / $30 output | Metered |
| **Grok 4.5**<br/>`x-ai/grok-4.5` | xAI | Yes | $2 input / $6 output | Metered |
| **Claude Sonnet 5**<br/>`anthropic/claude-sonnet-5` | Anthropic | Yes | $2 input / $10 output | Metered |
| **GLM 5.2**<br/>`z-ai/glm-5.2` | Z.ai | No | $0.07 input / $0.22 output | Metered |

The default Assistant model is **Gemini 3.7 Flash**. In Cloud it is included; other Assistant models are metered from the provider-reported cost. The registry rates above are used for the up-front estimate; final accounting uses the provider response. In self-hosted Scenelith, Assistant usage is billed by the provider account you configure.
