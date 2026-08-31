import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

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
const coreRevision = spawnSync('git', ['rev-parse', 'HEAD'], {cwd: coreRoot, encoding: 'utf8'}).stdout.trim();
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
  '## Assistant models',
  '',
  '| Model | ID | Visual input | Cloud charging |',
  '| --- | --- | --- | --- |',
  ...assistantModels.map((model) => `| **${text(model.label)}** | \`${model.id}\` | ${model.supportsVision === false ? 'No' : 'Yes'} | ${model.id === 'google/gemini-3.7-flash' ? 'Included' : 'Metered'} |`),
  '',
  'The default Assistant model is **Gemini 3.7 Flash**. In Cloud it is included; other Assistant models are metered from the provider-reported cost. In self-hosted Scenelith, Assistant usage is billed by the provider account you configure.',
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

const automationLines = [
  '---',
  'title: Automation node reference',
  'description: Inputs, outputs, settings and operating guidance for every current Automation node.',
  '---',
  '',
  '# Automation node reference',
  '',
  `Scenelith currently exposes **${automationNodes.length} current Automation node types**. Connections are typed: a port accepts only compatible data. A saved workflow can retain an older node version; this page describes the latest version offered when adding a node.`,
  '',
];

for (const [category, label] of Object.entries(categoryNames)) {
  automationLines.push(`## ${label}`, '');
  for (const node of automationNodes.filter((item) => item.category === category)) {
    automationLines.push(
      `### ${text(node.title)}`,
      '',
      `\`${node.type}@${node.version}\``,
      '',
      text(node.description),
      '',
      '| Direction | Port | Type | Required |',
      '| --- | --- | --- | --- |',
      ...(node.inputs.length ? node.inputs.map((port) => `| Input | ${text(port.label)} \`${port.id}\` | \`${port.type}\` | ${port.required ? 'Yes' : 'No'} |`) : ['| Input | — | — | — |']),
      ...(node.outputs.length ? node.outputs.map((port) => `| Output | ${text(port.label)} \`${port.id}\` | \`${port.type}\` | — |`) : ['| Output | — | — | — |']),
      '',
    );
    if (node.fields.length) {
      automationLines.push('| Setting | Kind | Required | Default / choices |', '| --- | --- | --- | --- |');
      for (const field of node.fields) {
        const choices = field.options?.length ? field.options.map((option) => option.label).join(' / ') : field.defaultValue !== undefined ? typeof field.defaultValue === 'object' ? 'structured value' : String(field.defaultValue) : '—';
        automationLines.push(`| **${text(field.label)}** \`${field.id}\`<br/>${text(field.description)} | \`${field.kind}\` | ${field.required ? 'Yes' : 'No'} | ${text(choices)} |`);
      }
      automationLines.push('');
    }
    if (node.help) {
      automationLines.push('**Use it when:** ' + text(node.help.whenToUse), '');
      if (node.help.setup?.length) automationLines.push('**Setup**', '', ...node.help.setup.map((step, index) => `${index + 1}. ${text(step)}`), '');
      if (node.help.exampleFlow) automationLines.push(`**Example path:** ${text(node.help.exampleFlow.before)} → ${text(node.help.exampleFlow.after)}. ${text(node.help.exampleFlow.explanation)}`, '');
      if (node.help.tips?.length) automationLines.push('**Tips:** ' + node.help.tips.map(text).join(' '), '');
      if (node.help.technicalNotes?.length) automationLines.push('**Technical behavior:** ' + node.help.technicalNotes.map(text).join(' '), '');
    }
  }
}

mkdirSync(resolve(docsRoot, 'docs/canvas'), {recursive: true});
mkdirSync(resolve(docsRoot, 'docs/automation'), {recursive: true});
writeFileSync(resolve(docsRoot, 'docs/canvas/models.md'), modelLines.join('\n'));
writeFileSync(resolve(docsRoot, 'docs/automation/node-reference.md'), automationLines.join('\n'));

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
  if (name === 'run_automation_workflow' || name === 'cancel_automation_run' || name === 'retry_automation_run_from_node' || name === 'preview_automation_node') return '`automation:run`';
  if (name.startsWith('create_automation_') || name.startsWith('configure_automation_') || name.startsWith('set_automation_') || name.startsWith('connect_automation_') || name.startsWith('remove_automation_') || name.startsWith('save_automation_') || name.startsWith('publish_automation_') || name.startsWith('archive_automation_') || name.startsWith('import_automation_') || name.startsWith('restore_automation_') || name.startsWith('bind_automation_') || name.startsWith('unbind_automation_') || name.startsWith('delete_automation_') || name.startsWith('replay_automation_')) return '`automation:write`';
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
  return {
    name,
    title: block.match(/title:\s*"([^"]+)"/)?.[1] || name,
    description: block.match(/description:\s*"([^"]+)"/)?.[1] || '',
    category: toolCategory(name),
    scope: toolScope(name),
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
  generatedAt: new Date().toISOString(),
  canvasNodeKinds,
  generationModels: models.map((model) => model.id),
  assistantModels: assistantModels.map((model) => model.id),
  automationNodes: automationNodes.map((node) => `${node.type}@${node.version}`),
  mcpTools: registeredTools,
}, null, 2) + '\n');
console.log(`Generated ${models.length} generation models, ${assistantModels.length} Assistant models, ${automationNodes.length} Automation nodes; verified ${registeredTools.length} MCP tools.`);
