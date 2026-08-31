import {existsSync, readFileSync, readdirSync} from 'node:fs';
import {resolve} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const snapshot = JSON.parse(readFileSync(resolve(root, 'product-reference/snapshot.json'), 'utf8'));
const models = readFileSync(resolve(root, 'docs/canvas/models.md'), 'utf8');
const mcp = readFileSync(resolve(root, 'docs/mcp/tool-reference.md'), 'utf8');
const sidebar = readFileSync(resolve(root, 'sidebars.ts'), 'utf8');
const generatedAutomationSidebar = readFileSync(resolve(root, 'automation-node-sidebars.ts'), 'utf8');
const completeSidebar = `${sidebar}\n${generatedAutomationSidebar}`;
const selfHostingDocs = docFilesForSelfHosting();

function docFilesForSelfHosting() {
  return readdirSync(resolve(root, 'docs/self-hosting'), {withFileTypes: true})
    .filter((entry) => entry.isFile() && /\.mdx?$/.test(entry.name))
    .map((entry) => readFileSync(resolve(root, 'docs/self-hosting', entry.name), 'utf8'))
    .join('\n');
}

const missing = [];
for (const id of snapshot.canvasNodeKinds) {
  const pages = snapshot.canvasNodePages?.[id] || [];
  if (!pages.length) missing.push(`canvas-page-map:${id}`);
  for (const page of pages) {
    const path = resolve(root, 'docs', page);
    if (!existsSync(path)) missing.push(`canvas-page:${id}:${page}`);
    else if (!readFileSync(path, 'utf8').includes(`\`${id}\``)) missing.push(`canvas-kind:${id}:${page}`);
  }
}
for (const id of [...snapshot.generationModels, ...snapshot.assistantModels]) if (!models.includes(`\`${id}\``)) missing.push(`model:${id}`);
for (const id of snapshot.automationNodes) {
  const page = snapshot.automationNodePages?.[id];
  if (!page) missing.push(`automation-page-map:${id}`);
  else {
    const path = resolve(root, 'docs', page);
    if (!existsSync(path)) missing.push(`automation-page:${id}:${page}`);
    else if (!readFileSync(path, 'utf8').includes(`\`${id}\``)) missing.push(`automation:${id}:${page}`);
  }
}
for (const id of snapshot.mcpTools) if (!mcp.includes(`\`${id}\``)) missing.push(`mcp:${id}`);
for (const variable of snapshot.selfHosting?.environmentVariables || []) if (!selfHostingDocs.includes(`\`${variable}\``)) missing.push(`selfhost-env:${variable}`);
for (const command of snapshot.selfHosting?.launcherCommands || []) if (!selfHostingDocs.includes(`./scenelith ${command}`)) missing.push(`selfhost-command:${command}`);
for (const service of snapshot.selfHosting?.services || []) if (!selfHostingDocs.includes(`\`${service}\``)) missing.push(`selfhost-service:${service}`);
for (const provider of snapshot.selfHosting?.providers || []) if (!selfHostingDocs.includes(provider)) missing.push(`selfhost-provider:${provider}`);

for (const route of [
  'canvas/nodes', 'canvas/nodes/tiktok-post', 'canvas/nodes/video-source', 'canvas/nodes/scene-media', 'canvas/nodes/identity', 'canvas/nodes/hook', 'canvas/nodes/generator', 'canvas/nodes/assistant', 'canvas/nodes/generated-output', 'canvas/nodes/video-master', 'canvas/nodes/note',
  'canvas/canvas-management', 'canvas/models', 'canvas/credits', 'canvas/assistant', 'canvas/tiktok-import', 'canvas/hooks', 'canvas/library', 'canvas/identities',
  'automation/workflow-settings', 'automation/deployment-and-credentials', 'automation/portability-and-fixtures', 'automation/nodes', 'automation/runs-and-triggers',
  'cloud/plans-and-credits', 'cloud/team-access', 'cloud/notifications-and-tasks', 'cloud/support', 'cloud/feature-board',
  'mcp/tool-domains', 'mcp/canvas-tools', 'mcp/library-identity-tools', 'mcp/automation-tools', 'mcp/tool-reference',
  'self-hosting/overview', 'self-hosting/installation', 'self-hosting/configuration', 'self-hosting/providers-and-storage', 'self-hosting/operations', 'self-hosting/backup-and-update', 'self-hosting/public-url', 'self-hosting/runtime-architecture',
]) if (!completeSidebar.includes(`'${route}'`) && !completeSidebar.includes(`"${route}"`)) missing.push(`sidebar:${route}`);

for (const page of Object.values(snapshot.automationNodePages || {})) {
  const route = page.replace(/\.md$/, '');
  if (!completeSidebar.includes(`"${route}"`)) missing.push(`sidebar:${route}`);
}

function docFiles(directory) {
  return readdirSync(directory, {withFileTypes: true}).flatMap((entry) => entry.isDirectory()
    ? docFiles(resolve(directory, entry.name))
    : /\.mdx?$/.test(entry.name) ? [resolve(directory, entry.name)] : []);
}
for (const file of docFiles(resolve(root, 'docs'))) {
  const route = file.slice(resolve(root, 'docs').length + 1).replace(/\.mdx?$/, '').replaceAll('\\', '/');
  if (!completeSidebar.includes(`'${route}'`) && !completeSidebar.includes(`"${route}"`)) missing.push(`orphan:${route}`);
}

if (missing.length) {
  console.error(`Product documentation coverage failed:\n${missing.map((item) => `- ${item}`).join('\n')}`);
  process.exit(1);
}

console.log(`Coverage verified against core ${snapshot.coreRevision}${snapshot.coreDirty ? '+dirty' : ''}: ${snapshot.canvasNodeKinds.length} Canvas node kinds, ${snapshot.generationModels.length} generation models, ${snapshot.assistantModels.length} Assistant models, ${snapshot.automationNodes.length} Automation nodes, ${snapshot.mcpTools.length} MCP tools, ${snapshot.generationPricingCases} pricing cases.`);
