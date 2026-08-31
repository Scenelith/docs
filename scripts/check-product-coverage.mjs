import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const snapshot = JSON.parse(readFileSync(resolve(root, 'product-reference/snapshot.json'), 'utf8'));
const models = readFileSync(resolve(root, 'docs/canvas/models.md'), 'utf8');
const canvasNodes = readFileSync(resolve(root, 'docs/canvas/nodes.md'), 'utf8');
const automation = readFileSync(resolve(root, 'docs/automation/node-reference.md'), 'utf8');
const mcp = readFileSync(resolve(root, 'docs/mcp/tool-reference.md'), 'utf8');
const sidebar = readFileSync(resolve(root, 'sidebars.ts'), 'utf8');

const missing = [];
for (const id of snapshot.canvasNodeKinds) if (!canvasNodes.includes(`\`${id}\``)) missing.push(`canvas:${id}`);
for (const id of [...snapshot.generationModels, ...snapshot.assistantModels]) if (!models.includes(`\`${id}\``)) missing.push(`model:${id}`);
for (const id of snapshot.automationNodes) if (!automation.includes(`\`${id}\``)) missing.push(`automation:${id}`);
for (const id of snapshot.mcpTools) if (!mcp.includes(`\`${id}\``)) missing.push(`mcp:${id}`);

for (const route of [
  'canvas/nodes', 'canvas/models', 'canvas/credits', 'canvas/assistant', 'canvas/tiktok-import', 'canvas/hooks', 'canvas/library', 'canvas/identities',
  'automation/workflow-settings', 'automation/node-reference', 'automation/runs-and-triggers',
  'cloud/plans-and-credits', 'cloud/team-access', 'cloud/notifications-and-tasks', 'cloud/support', 'cloud/feature-board',
  'mcp/tool-domains', 'mcp/canvas-tools', 'mcp/library-identity-tools', 'mcp/automation-tools', 'mcp/tool-reference',
  'self-hosting/providers-and-storage', 'self-hosting/backup-and-update',
]) if (!sidebar.includes(`'${route}'`)) missing.push(`sidebar:${route}`);

if (missing.length) {
  console.error(`Product documentation coverage failed:\n${missing.map((item) => `- ${item}`).join('\n')}`);
  process.exit(1);
}

console.log(`Coverage verified against core ${snapshot.coreRevision}: ${snapshot.canvasNodeKinds.length} Canvas node kinds, ${snapshot.generationModels.length} generation models, ${snapshot.assistantModels.length} Assistant models, ${snapshot.automationNodes.length} Automation nodes, ${snapshot.mcpTools.length} MCP tools.`);
