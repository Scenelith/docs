import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';

const docsRoot = resolve(import.meta.dirname, '..');
const coreRoot = resolve(process.argv[2] || process.env.SCENELITH_CORE_DIR || '../.worktrees/scenelith-mcp-platform');

function importJson(modulePath, expression) {
  const program = `const x=await import(${JSON.stringify(modulePath)});const m=x.default||x;console.log(JSON.stringify(${expression}));`;
  const result = spawnSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-e', program], {
    cwd: coreRoot,
    encoding: 'utf8',
  });
  if (result.status !== 0) throw new Error(result.stderr || `Could not read ${modulePath}`);
  return JSON.parse(result.stdout);
}

function text(value) {
  return String(value ?? '')
    .replaceAll('|', '\\|')
    .replaceAll('{', '&#123;')
    .replaceAll('}', '&#125;')
    .replaceAll('\n', ' ')
    .trim();
}

function list(values) {
  return values?.length ? values.map(text).join(', ') : '—';
}

const models = importJson('./src/lib/kie.ts', 'm.kieModels');
const assistantModels = importJson('./src/lib/assistant-models.ts', 'm.assistantModels');
const automationNodes = importJson('./src/lib/automation-workflows/registry.ts', 'm.automationNodeDefinitions()');
const generationPricingCases = [];
const addImagePricing = (model, prices, references = 0) => Object.entries(prices).forEach(([resolution, expected]) => {
  generationPricingCases.push([model, resolution, '1', references, {}, Math.ceil(expected)]);
});
const addVideoPricing = (model, prices, options = {}) => Object.entries(prices).forEach(([resolution, rate]) => {
  generationPricingCases.push([model, resolution, '10', 0, options, Math.ceil(rate * (options.hasVideoInput ? 20 : 10))]);
});
addImagePricing('nano-banana-2-lite', {'1K': 4});
addImagePricing('nano-banana-2', {'1K': 8, '2K': 12, '4K': 18});
addImagePricing('nano-banana-pro', {'1K': 18, '2K': 18, '4K': 24});
addImagePricing('gpt-image-2', {'1K': 6, '2K': 10, '4K': 16});
addImagePricing('grok-image-2', {'1K': 4});
addImagePricing('seedream-5-pro', {'1K': 7, '2K': 14}, 1);
generationPricingCases.push(['seedream-5-pro', '1K', '1', 3, {}, 8]);
addImagePricing('seedream-5-lite', {'2K': 5.5, '3K': 5.5, '4K': 5.5});
addImagePricing('flux-2-flex', {'1K': 14, '2K': 24});
addImagePricing('imagen4-fast', {'1K': 4});
addImagePricing('imagen4-ultra', {'1K': 12});
addVideoPricing('seedance-2-fast', {'480P': 15.5, '720P': 33});
addVideoPricing('seedance-2-mini', {'480P': 9.5, '720P': 20.5});
addVideoPricing('seedance-2', {'480P': 19, '720P': 41, '1080P': 102, '4K': 208});
addVideoPricing('seedance-2-5', {'480P': 28, '720P': 63});
addVideoPricing('kling-3', {'720P': 20, '1080P': 27, '4K': 67}, {generateAudio: true});
addVideoPricing('kling-3', {'720P': 14, '1080P': 18, '4K': 67}, {generateAudio: false});
addVideoPricing('kling-3-turbo-text', {'720P': 18, '1080P': 22.5});
addVideoPricing('kling-3-turbo-image', {'720P': 18, '1080P': 22.5});
for (const [resolution, rate] of Object.entries({'720P': 20, '1080P': 27})) generationPricingCases.push(['kling-3-motion', resolution, '5', 0, {inputVideoDurationSeconds: 10}, rate * 10]);
addVideoPricing('grok-video-text', {'480P': 2.4, '720P': 4.5, '1080P': 8});
addVideoPricing('grok-video-image', {'480P': 2.4, '720P': 4.5, '1080P': 8});
addVideoPricing('grok-video-1-5', {'480P': 2.4, '720P': 4.5});
addVideoPricing('wan-2-7', {'720P': 16, '1080P': 24});
for (const [model, prices] of Object.entries({'veo-3-1-fast': {'720P': 60, '1080P': 65, '4K': 180}, 'veo-3-1': {'720P': 250, '1080P': 255, '4K': 380}})) {
  Object.entries(prices).forEach(([resolution, expected]) => generationPricingCases.push([model, resolution, '8', 0, {}, expected]));
}
generationPricingCases.push(['veo-3-1', '4K', '8', 1, {}, 370]);
addVideoPricing('seedance-2-fast', {'480P': 9, '720P': 20}, {hasVideoInput: true, inputVideoDurationSeconds: 10});
addVideoPricing('seedance-2-mini', {'480P': 6, '720P': 12.5}, {hasVideoInput: true, inputVideoDurationSeconds: 10});
addVideoPricing('seedance-2', {'480P': 11.5, '720P': 25, '1080P': 62, '4K': 128}, {hasVideoInput: true, inputVideoDurationSeconds: 10});
addVideoPricing('seedance-2-5', {'480P': 17, '720P': 38, '1080P': 68.5}, {hasVideoInput: true, inputVideoDurationSeconds: 10});
const actualGenerationPricing = importJson('./src/lib/generation-pricing.ts', `(${JSON.stringify(generationPricingCases)}).map(([model, resolution, duration, references, options]) => m.generationCreditCost(model, resolution, duration, references, options))`);
generationPricingCases.forEach((entry, index) => {
  if (actualGenerationPricing[index] !== entry[5]) throw new Error(`Generation pricing drift for ${entry[0]} ${entry[1]}: docs expect ${entry[5]}, core returns ${actualGenerationPricing[index]}`);
});
const coreRevision = spawnSync('git', ['rev-parse', 'HEAD'], {cwd: coreRoot, encoding: 'utf8'}).stdout.trim();
const coreDirty = Boolean(spawnSync('git', ['status', '--porcelain'], {cwd: coreRoot, encoding: 'utf8'}).stdout.trim());
const sourceHash = (path) => createHash('sha256').update(readFileSync(resolve(coreRoot, path))).digest('hex');
const portableCanvasSource = readFileSync(resolve(coreRoot, 'src/lib/scenelith-document.ts'), 'utf8');
const canvasKindsMatch = portableCanvasSource.match(/const nodeKind = z\.enum\(\[([^\]]+)\]\)/);
if (!canvasKindsMatch) throw new Error('Could not read the Canvas node-kind contract');
const canvasNodeKinds = [...canvasKindsMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);

const modelLines = [
  '---',
  'title: Models',
  'description: Every image, video and Assistant model currently exposed by Scenelith.',
  '---',
  '',
  '# Models',
  '',
  '> This page is generated from the product registries. Model availability still depends on the configured provider and the selected input shape.',
  '',
  '## Image models',
  '',
  '| Model | Resolution | References | Prompt limit | Notes |',
  '| --- | --- | ---: | ---: | --- |',
  ...models.filter((model) => model.mediaType === 'image').map((model) => `| **${text(model.label)}** \`${model.id}\` | ${list(model.resolutions)} | ${model.maxReferences} | ${model.maxPromptLength ? Number(model.maxPromptLength).toLocaleString('en-US') + ' chars' : 'provider limit'} | ${text(model.description)} |`),
  '',
  '## Video models',
  '',
  '| Model | Resolution | Duration | References | Notes |',
  '| --- | --- | --- | ---: | --- |',
  ...models.filter((model) => model.mediaType === 'video').map((model) => {
    const durations = model.durationSource === 'reference-video' ? 'reference video' : model.durations?.length ? `${model.durations[0]}–${model.durations.at(-1)}s` : 'model-defined';
    return `| **${text(model.label)}** \`${model.id}\` | ${list(model.resolutions)} | ${durations} | ${model.maxReferences} | ${text(model.description)} |`;
  }),
  '',
  '## Generation model contracts',
  '',
  ...models.flatMap((model) => {
    const durations = model.durationSource === 'reference-video' ? 'taken from the reference video' : model.durations?.length ? model.durations.join(', ') + ' seconds' : 'provider-defined';
    const effectivePorts = model.inputPorts?.length
      ? model.inputPorts
      : model.mediaType === 'image' && model.maxReferences > 0
        ? [{id: 'reference-image', label: 'Reference images', kind: 'image', required: false, max: model.maxReferences}]
        : [];
    const ports = effectivePorts.length
      ? effectivePorts.map((port) => `- **${text(port.label)}** \`${port.id}\` — \`${port.kind}\`; ${port.required ? 'required' : 'optional'}; maximum ${port.max ?? 1}.`)
      : ['- No media input ports; text-to-media only.'];
    const formatRatioMap = (mapping) => Object.entries(mapping || {}).map(([resolution, ratios]) => `\`${resolution}\`: ${ratios.map((ratio) => `\`${ratio}\``).join(', ')}`).join('; ');
    const special = [
      model.ratiosByResolution ? `Aspect ratios by resolution: ${formatRatioMap(model.ratiosByResolution)}.` : '',
      model.referenceRatiosByResolution ? `Aspect ratios with reference images: ${formatRatioMap(model.referenceRatiosByResolution)}.` : '',
      model.referenceOnlyRatios?.length ? `Ratios available only when references are connected: ${model.referenceOnlyRatios.map((ratio) => `\`${ratio}\``).join(', ')}.` : '',
      model.videoInputOnlyResolutions?.length ? `Video input is required at: ${model.videoInputOnlyResolutions.join(', ')}.` : '',
      model.referenceMediaDuration ? `Reference media: ${model.referenceMediaDuration.minSeconds}–${model.referenceMediaDuration.maxSeconds}s each; ${model.referenceMediaDuration.maxTotalSeconds}s total.` : '',
      model.id.startsWith('seedance-2') ? 'Input modes are exclusive: use start/end frames or multimodal image/video/audio references, never both. Reference video and audio are 2–15s each and 15s total unless this model states a different limit above.' : '',
      model.id === 'grok-video-image' ? 'At 1080P this model accepts exactly one connected image; lower resolutions accept up to the port maximum.' : '',
      model.id === 'wan-2-7' ? 'Input modes are exclusive: use start/end frames or one continuation clip, never both.' : '',
      model.id === 'veo-3-1-fast' ? 'Input modes are exclusive: use first/last frames or material references. Material-reference mode supports only an 8-second duration.' : '',
      model.id === 'kling-3-motion' ? 'The reference video must be 3–30 seconds; output duration is inherited from that video and rounded up to a whole second for admission.' : '',
    ].filter(Boolean);
    return [
      `### ${text(model.label)} {#${model.id}}`,
      '',
      `\`${model.id}\` · ${model.mediaType} · up to ${model.maxReferences} reference${model.maxReferences === 1 ? '' : 's'} · prompt ${model.maxPromptLength ? `up to ${Number(model.maxPromptLength).toLocaleString('en-US')} characters` : 'uses the provider limit'}.`,
      '',
      `- Aspect ratios: ${list(model.ratios)}. Default: \`${model.defaultRatio || model.ratios?.[0]}\`.`,
      `- Resolutions: ${list(model.resolutions)}. Default: \`${model.defaultResolution || model.resolutions?.[0]}\`.`,
      ...(model.mediaType === 'video' ? [`- Duration: ${durations}.${model.defaultDuration ? ` Default: \`${model.defaultDuration}s\`.` : ''}`, `- Generated audio: ${model.supportsAudio ? `supported; default ${model.defaultGenerateAudio === false ? 'off' : 'on'}` : 'not exposed'}.`] : []),
      ...special.map((value) => `- ${value}`),
      '',
      '**Input ports**',
      '',
      ...ports,
      '',
    ];
  }),
  '> For every model, an end frame is valid only when a start frame is also connected. Invalid saved settings fall back to the first compatible registry value at generation admission; missing required ports and excess per-port inputs are rejected.',
  '',
  '## Assistant models',
  '',
  '| Model | Provider | Visual input | Estimate rate / 1M tokens | Cloud charging |',
  '| --- | --- | --- | --- | --- |',
  ...assistantModels.map((model) => `| **${text(model.label)}**<br/>\`${model.id}\` | ${text(model.provider)} | ${model.supportsVision === false ? 'No' : 'Yes'} | $${(model.promptUsdPerToken * 1_000_000).toLocaleString('en-US')} input / $${(model.completionUsdPerToken * 1_000_000).toLocaleString('en-US')} output | ${model.id === 'google/gemini-3.7-flash' ? 'Included' : 'Metered'} |`),
  '',
  'The default Assistant model is **Gemini 3.7 Flash**. In Cloud it is included; other Assistant models are metered from the provider-reported cost. The registry rates above are used for the up-front estimate; final accounting uses the provider response. In self-hosted Scenelith, Assistant usage is billed by the provider account you configure.',
  '',
];

const categoryNames = {
  trigger: 'Triggers',
  input: 'Inputs',
  ai: 'AI',
  logic: 'Logic',
  integration: 'Integrations',
  generation: 'Generation',
  output: 'Outputs',
};

const categorySlugs = {
  trigger: 'triggers',
  input: 'inputs',
  ai: 'ai',
  logic: 'logic',
  integration: 'integrations',
  generation: 'generation',
  output: 'outputs',
};

const categoryNodeLabels = {
  trigger: 'Trigger nodes',
  input: 'Input nodes',
  ai: 'AI nodes',
  logic: 'Logic nodes',
  integration: 'Integration nodes',
  generation: 'Generation nodes',
  output: 'Output nodes',
};

const automationIndexLines = [
  '---',
  'title: Automation node reference',
  'description: Browse every current Automation node by category and open its complete versioned contract.',
  '---',
  '',
  '# Automation node reference',
  '',
  `Scenelith currently exposes **${automationNodes.length} current Automation node types**. Connections are typed: a port accepts only compatible data. A saved workflow can retain an older node version; this reference describes the latest version offered when adding a node.`,
  '',
  '| Category | Nodes | Reference |',
  '| --- | ---: | --- |',
  ...Object.entries(categoryNames).map(([category, label]) => `| ${label} | ${automationNodes.filter((node) => node.category === category).length} | [Open ${label.toLowerCase()}](./nodes/${categorySlugs[category]}.md) |`),
  '',
  '## Complete current inventory',
  '',
  '| Node | Version | Category |',
  '| --- | --- | --- |',
  ...automationNodes.map((node) => `| [${text(node.title)}](./nodes/${categorySlugs[node.category]}.md#${node.type.replaceAll('.', '-')}) | \`${node.type}@${node.version}\` | ${categoryNames[node.category]} |`),
  '',
  '> Each category page is generated from the same versioned node registry used by the visual editor, MCP capabilities and runtime validation.',
  '',
];

const automationNodePages = {};
const automationCategoryDocuments = new Map();
for (const [category, label] of Object.entries(categoryNames)) {
  const categoryNodes = automationNodes.filter((item) => item.category === category);
  const pageTitle = categoryNodeLabels[category];
  const categoryLines = [
    '---',
    `title: ${pageTitle}`,
    `description: Complete inputs, outputs, settings and runtime guidance for the current nodes in ${label}.`,
    '---',
    '',
    `# ${pageTitle}`,
    '',
    `This page is generated from the current Automation registry and contains **${categoryNodes.length} current node${categoryNodes.length === 1 ? '' : 's'}** in the **${label}** category.`,
    '',
  ];
  for (const node of categoryNodes) {
    automationNodePages[`${node.type}@${node.version}`] = `automation/nodes/${categorySlugs[category]}.md`;
    categoryLines.push(
      `## ${text(node.title)} {#${node.type.replaceAll('.', '-')}}`,
      '',
      `\`${node.type}@${node.version}\``,
      '',
      text(node.description),
      '',
      `**Registry metadata:** category \`${node.category}\`; icon \`${node.icon}\`; accent \`${node.accent}\`; terminal ${node.terminal ? 'yes' : 'no'}; retry-safe ${node.retrySafe ? 'yes' : 'no'}.${node.example ? ` Example: ${text(node.example)}` : ''}`,
      '',
      '| Direction | Port | Type | Contract |',
      '| --- | --- | --- | --- |',
      ...(node.inputs.length ? node.inputs.map((port) => {
        const contract = [port.required ? 'Required' : 'Optional', port.multiple ? 'Multiple connections' : 'Single connection', port.minConnections !== undefined ? `minimum ${port.minConnections}` : '', port.connectable === false ? 'Run-history value; no graph handle' : 'Connectable'].filter(Boolean).join(' · ');
        return `| Input | ${text(port.label)} \`${port.id}\` | \`${port.type}\` | ${contract} |`;
      }) : ['| Input | — | — | — |']),
      ...(node.outputs.length ? node.outputs.map((port) => {
        const contract = [port.multiple ? 'Multiple consumers' : 'Typed output', port.connectable === false ? 'Run-history value; no graph handle' : 'Connectable'].filter(Boolean).join(' · ');
        return `| Output | ${text(port.label)} \`${port.id}\` | \`${port.type}\` | ${contract} |`;
      }) : ['| Output | — | — | — |']),
      '',
    );
    if (node.fields.length) {
      categoryLines.push('| Setting | Kind | Contract | Default / choices |', '| --- | --- | --- | --- |');
      for (const field of node.fields) {
        const choices = field.options?.length
          ? field.options.map((option) => `${option.label} (\`${option.value}\`)`).join(' / ')
          : field.defaultValue !== undefined ? typeof field.defaultValue === 'object' ? `\`${JSON.stringify(field.defaultValue)}\`` : `\`${String(field.defaultValue)}\`` : '—';
        const bounds = field.min !== undefined && field.max !== undefined ? `${field.min}–${field.max}` : field.min !== undefined ? `minimum ${field.min}` : field.max !== undefined ? `maximum ${field.max}` : '';
        const contract = [field.required ? 'Required' : 'Optional', bounds, field.runtimeBindable ? 'Ask on run allowed' : 'Fixed only', field.defaultRunInput ? 'Ask on run by default' : '', field.requiredWhenVisible ? 'Required when visible' : '', field.runtimeValueType ? `runtime \`${field.runtimeValueType}\`` : '', field.readOnly ? 'Read-only' : '', field.advanced ? 'Advanced' : '', field.secret ? 'Secret' : '', field.modelCapability ? `model capability \`${field.modelCapability}\`` : '', field.visibleWhen ? `visible when \`${field.visibleWhen.fieldId}\` is ${field.visibleWhen.values.map((value) => JSON.stringify(value)).join(' / ')}` : ''].filter(Boolean).join(' · ');
        const description = [field.description, field.placeholder ? `Placeholder: ${field.placeholder}` : ''].filter(Boolean).map(text).join(' ');
        categoryLines.push(`| **${text(field.label)}** \`${field.id}\`<br/>${description || '—'} | \`${field.kind}\` | ${contract} | ${text(choices)} |`);
      }
      categoryLines.push('');
    }
    if (node.help) {
      categoryLines.push('**Use it when:** ' + text(node.help.whenToUse), '');
      if (node.help.setup?.length) categoryLines.push('**Setup**', '', ...node.help.setup.map((step, index) => `${index + 1}. ${text(step)}`), '');
      if (node.help.exampleFlow) categoryLines.push(`**Example path:** ${text(node.help.exampleFlow.before)} → ${text(node.help.exampleFlow.after)}. ${text(node.help.exampleFlow.explanation)}`, '');
      if (node.help.tips?.length) categoryLines.push('**Tips:** ' + node.help.tips.map(text).join(' '), '');
      if (node.help.technicalNotes?.length) categoryLines.push('**Technical behavior:** ' + node.help.technicalNotes.map(text).join(' '), '');
    }
  }
  automationCategoryDocuments.set(categorySlugs[category], categoryLines.join('\n'));
}

mkdirSync(resolve(docsRoot, 'docs/canvas'), {recursive: true});
mkdirSync(resolve(docsRoot, 'docs/automation'), {recursive: true});
mkdirSync(resolve(docsRoot, 'docs/automation/nodes'), {recursive: true});
writeFileSync(resolve(docsRoot, 'docs/canvas/models.md'), modelLines.join('\n'));
writeFileSync(resolve(docsRoot, 'docs/automation/node-reference.md'), automationIndexLines.join('\n'));
for (const [slug, document] of automationCategoryDocuments) writeFileSync(resolve(docsRoot, `docs/automation/nodes/${slug}.md`), document);

const serverSource = readFileSync(resolve(coreRoot, 'src/lib/mcp/server.ts'), 'utf8');
const registeredTools = [...serverSource.matchAll(/server\.registerTool\("([^"]+)"/g)].map((match) => match[1]);
if (registeredTools.length < 80) throw new Error(`Expected the full MCP surface, found only ${registeredTools.length} tools`);

const toolCategory = (name) => {
  if (name.includes('automation')) return 'Automation';
  if (name.includes('identity') || name === 'list_identities' || name === 'inspect_identity_reference') return 'Identities';
  if (name.includes('library') || name === 'place_canvas_asset' || name === 'attach_canvas_reference' || name === 'detach_canvas_reference') return 'Library';
  if (name.includes('video_master') || name.includes('video_segment') || name.includes('video_timeline') || name.includes('video_frame')) return 'Video';
  if (name.includes('generation') || name.includes('assistant') || name === 'compose_canvas_prompt' || name === 'edit_canvas_image') return 'Models';
  return 'Canvas';
};

const toolScope = (name) => {
  if (name === 'list_automation_credentials' || name === 'bind_automation_credential') return '`automation:credentials`';
  if (['run_automation_workflow', 'cancel_automation_run', 'retry_automation_run_from_node', 'preview_automation_node'].includes(name)) return '`automation:run`';
  if (['set_automation_trigger_status', 'replay_automation_trigger_delivery'].includes(name)) return '`automation:run` + `automation:write`';
  if (name.includes('automation') && !name.startsWith('list_') && !name.startsWith('get_') && !name.startsWith('diagnose_') && !name.startsWith('validate_') && !name.startsWith('export_')) return '`automation:write`';
  if (name === 'run_canvas_assistant' || name === 'compose_canvas_prompt') return '`assistant:run`';
  if (name === 'run_canvas_generation' || name === 'get_canvas_generation' || name === 'cancel_canvas_generation' || name === 'edit_canvas_image') return '`generation:run`';
  if (name === 'upload_library_asset') return '`library:write`';
  if (name === 'import_tiktok_to_canvas' || name === 'refresh_tiktok_source') return '`import:write`';
  if (name.includes('identity') && !name.startsWith('list_') && !name.startsWith('inspect_') && name !== 'place_canvas_identity') return '`identity:write`';
  if (['replace_canvas_video_segment', 'add_video_master_asset', 'export_video_master_media', 'capture_canvas_video_frame', 'materialize_canvas_video_segment'].includes(name)) return '`library:write`';
  if (['create_canvas', 'import_canvas_document', 'patch_canvas', 'create_canvas_node', 'configure_canvas_node', 'connect_canvas_nodes', 'place_canvas_asset', 'attach_canvas_reference', 'detach_canvas_reference', 'place_canvas_identity', 'duplicate_canvas_nodes', 'select_canvas_output', 'create_video_master', 'configure_video_master_scene', 'create_canvas_segment_node', 'update_canvas_video_timeline', 'create_canvas_remake_branch', 'copy_video_master_output', 'add_video_master_scene', 'move_video_master_asset_lane', 'remove_video_master_scene'].includes(name)) return '`canvas:write`';
  return '`mcp:read`';
};

const toolInfo = registeredTools.map((name) => {
  const start = serverSource.indexOf(`server.registerTool("${name}"`);
  const block = serverSource.slice(start, start + 1800);
  const scope = toolScope(name);
  const readOnly = block.match(/readOnlyHint:\s*(true|false)/)?.[1] === 'true';
  if (!readOnly && scope === '`mcp:read`') throw new Error(`Mutable MCP tool ${name} is missing an explicit permission mapping`);
  return {
    name,
    title: block.match(/title:\s*"([^"]+)"/)?.[1] || name,
    description: block.match(/description:\s*"([^"]+)"/)?.[1] || '',
    category: toolCategory(name),
    scope,
  };
});

const mcpLines = [
  '---',
  'title: Complete MCP tool reference',
  'description: Every current Scenelith MCP tool, grouped by product domain.',
  '---',
  '',
  '# Complete MCP tool reference',
  '',
  `The server currently registers **${toolInfo.length} tools**. The actual list returned to an agent is smaller when the connection lacks an optional permission or is restricted to selected projects.`,
  '',
  '> Tool names and descriptions below are generated from the MCP server. Use `get_canvas_capabilities` and `get_automation_capabilities` for live schemas, model catalogues and versioned node fields.',
  '',
];

for (const category of ['Canvas', 'Library', 'Identities', 'Video', 'Models', 'Automation']) {
  mcpLines.push(`## ${category}`, '', '| Tool | Permission | What it does |', '| --- | --- | --- |');
  for (const tool of toolInfo.filter((item) => item.category === category)) {
    mcpLines.push(`| \`${tool.name}\`<br/>**${text(tool.title)}** | ${tool.scope} | ${text(tool.description)} |`);
  }
  mcpLines.push('');
}

mkdirSync(resolve(docsRoot, 'docs/mcp'), {recursive: true});
writeFileSync(resolve(docsRoot, 'docs/mcp/tool-reference.md'), mcpLines.join('\n'));
mkdirSync(resolve(docsRoot, 'product-reference'), {recursive: true});
writeFileSync(resolve(docsRoot, 'product-reference/snapshot.json'), JSON.stringify({
  coreRevision,
  coreDirty,
  sourceHashes: {
    canvasContract: sourceHash('src/lib/scenelith-document.ts'),
    generationModels: sourceHash('src/lib/kie.ts'),
    generationPricing: sourceHash('src/lib/generation-pricing.ts'),
    assistantModels: sourceHash('src/lib/assistant-models.ts'),
    automationRegistry: sourceHash('src/lib/automation-workflows/registry.ts'),
    mcpServer: sourceHash('src/lib/mcp/server.ts'),
  },
  generatedAt: new Date().toISOString(),
  canvasNodeKinds,
  generationModels: models.map((model) => model.id),
  assistantModels: assistantModels.map((model) => model.id),
  generationPricingCases: generationPricingCases.length,
  automationNodes: automationNodes.map((node) => `${node.type}@${node.version}`),
  automationNodePages,
  canvasNodePages: {
    source: ['canvas/nodes/tiktok-post.md', 'canvas/nodes/video-source.md'],
    scene: ['canvas/nodes/scene-media.md'],
    persona: ['canvas/nodes/identity.md'],
    hook: ['canvas/nodes/hook.md'],
    prompt: ['canvas/nodes/generator.md'],
    assistant: ['canvas/nodes/assistant.md'],
    generation: ['canvas/nodes/generated-output.md'],
    videoMaster: ['canvas/nodes/video-master.md'],
    note: ['canvas/nodes/note.md'],
  },
  mcpTools: registeredTools,
}, null, 2) + '\n');
console.log(`Generated ${models.length} generation models, ${assistantModels.length} Assistant models, ${automationNodes.length} Automation nodes; verified ${registeredTools.length} MCP tools and ${generationPricingCases.length} pricing cases.`);
