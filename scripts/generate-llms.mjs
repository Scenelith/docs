import {mkdirSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {relative, resolve} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'docs');
const staticRoot = resolve(root, 'static');
const origin = 'https://docs.scenelith.com';

function walk(directory) {
  return readdirSync(directory, {withFileTypes: true}).flatMap((entry) => entry.isDirectory()
    ? walk(resolve(directory, entry.name))
    : /\.mdx?$/.test(entry.name) ? [resolve(directory, entry.name)] : []);
}

function frontmatter(source) {
  if (!source.startsWith('---\n')) return {attributes: {}, body: source};
  const end = source.indexOf('\n---\n', 4);
  if (end < 0) throw new Error('Unclosed frontmatter block');
  const attributes = Object.fromEntries(source.slice(4, end).split('\n').flatMap((line) => {
    const separator = line.indexOf(':');
    if (separator < 0) return [];
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^(['"])(.*)\1$/, '$2');
    return [[key, value]];
  }));
  return {attributes, body: source.slice(end + 5)};
}

function plainHeading(value) {
  return value.replace(/\s*\{#[^}]+\}\s*$/, '').replace(/[`*_]/g, '').trim();
}

function fallbackDescription(body) {
  return body.split(/\n\s*\n/).map((block) => block.trim()).find((block) =>
    block && !/^(#|<|:::|```|\||[-*] )/.test(block))?.replace(/\s+/g, ' ') || '';
}

function routeFor(id, attributes) {
  if (attributes.slug) return attributes.slug.startsWith('/') ? attributes.slug : `/${attributes.slug}`;
  return `/${id}`;
}

const agentInstructions = `## Client setup summary

| Client | Setup |
| --- | --- |
| Codex | Add a Streamable HTTP server, paste the server URL below, then authenticate in the browser. |
| Claude | Add a custom connector with the Scenelith URL and approve access in the browser. |
| Claude Code | Run \`claude mcp add --transport http scenelith https://scenelith.com/api/mcp\`. |
| ChatGPT | Add a remote MCP server, choose Streamable HTTP, paste the URL and authenticate. |
| Other | Use a Streamable HTTP client that supports OAuth authorization for remote servers. |

Server URL: \`https://scenelith.com/api/mcp\``;

function llmBody(body) {
  return body
    .replace(/^import\s+[^\n]+;?\s*$/gm, '')
    .replace(/<AgentTabs\s*\/>/g, agentInstructions)
    .replace(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, label) => {
      const clean = label.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      return `[${clean}](${href})`;
    })
    .replace(/<h1>([\s\S]*?)<\/h1>/g, '# $1\n')
    .replace(/<p>([\s\S]*?)<\/p>/g, '$1\n')
    .replace(/<strong>([\s\S]*?)<\/strong>/g, '**$1**')
    .replace(/<span[^>]*>([\s\S]*?)<\/span>/g, '$1')
    .replace(/<br\s*\/>/g, ' — ')
    .replace(/<\/?(?:section|div)[^>]*>/g, '')
    .replace(/&#123;/g, '{')
    .replace(/&#125;/g, '}')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s*\{#[^}]+\}/g, '')
    .replace(/\]\(\/(?!\/)/g, `](${origin}/`)
    .replace(/href="\/(?!\/)/g, `href="${origin}/`)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const pages = new Map(walk(docsRoot).map((file) => {
  const id = relative(docsRoot, file).replace(/\.mdx?$/, '').replaceAll('\\', '/');
  const source = readFileSync(file, 'utf8');
  const parsed = frontmatter(source);
  const heading = parsed.body.match(/^#\s+(.+)$/m)?.[1];
  const title = parsed.attributes.title || (heading ? plainHeading(heading) : id);
  const description = parsed.attributes.description || fallbackDescription(parsed.body);
  return [id, {id, file: relative(root, file).replaceAll('\\', '/'), title, description, route: routeFor(id, parsed.attributes), body: llmBody(parsed.body)}];
}));

const sidebarSource = readFileSync(resolve(root, 'sidebars.ts'), 'utf8');
const generatedAutomationSidebar = readFileSync(resolve(root, 'automation-node-sidebars.ts'), 'utf8');
const staticIds = [...sidebarSource.matchAll(/'([^']+)'/g)].map((match) => match[1]);
const generatedIds = [...generatedAutomationSidebar.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
const automationInsertIndex = staticIds.indexOf('automation/nodes') + 1;
const sidebarIds = automationInsertIndex > 0
  ? [...staticIds.slice(0, automationInsertIndex), ...generatedIds, ...staticIds.slice(automationInsertIndex)]
  : [...staticIds, ...generatedIds];
const orderedIds = sidebarIds.filter((id) => pages.has(id));
const missingFromSidebar = [...pages.keys()].filter((id) => !orderedIds.includes(id));
if (missingFromSidebar.length) throw new Error(`Documentation pages missing from the sidebar: ${missingFromSidebar.join(', ')}`);
if (new Set(orderedIds).size !== orderedIds.length) throw new Error('The sidebar contains duplicate documentation routes');

const orderedPages = orderedIds.map((id) => pages.get(id));
const sectionFor = (id) => id === 'intro' || id.startsWith('getting-started/') ? 'Getting started'
  : id.startsWith('canvas/') ? 'Canvas'
    : id.startsWith('automation/') ? 'Automation'
      : id.startsWith('cloud/') ? 'Cloud'
        : id.startsWith('mcp/') ? 'MCP'
          : id.startsWith('self-hosting/') ? 'Self-hosting'
            : 'Other';

const sections = [];
for (const page of orderedPages) {
  const name = sectionFor(page.id);
  let section = sections.find((item) => item.name === name);
  if (!section) {
    section = {name, pages: []};
    sections.push(section);
  }
  section.pages.push(page);
}

const index = [
  '# Scenelith',
  '',
  '> Scenelith documentation for Canvas, Automation, MCP, Cloud and self-hosting.',
  '',
  'Scenelith is a visual AI production workspace. This file is the compact documentation index for language models and agents.',
  '',
  '## Complete documentation',
  '',
  `- [Download all Scenelith documentation as one TXT file](${origin}/llms-full.txt): Full content of every published documentation page in sidebar order.`,
  '',
  ...sections.flatMap((section) => [
    `## ${section.name}`,
    '',
    ...section.pages.map((page) => `- [${page.title}](${origin}${page.route}): ${page.description}`),
    '',
  ]),
].join('\n').trim() + '\n';

const full = [
  '# Scenelith Documentation — Complete LLM Context',
  '',
  '> Full text of every Scenelith documentation page, ordered exactly like the documentation sidebar.',
  '',
  `Canonical documentation: ${origin}/`,
  `Compact index: ${origin}/llms.txt`,
  `Pages included: ${orderedPages.length}`,
  '',
  ...orderedPages.flatMap((page) => [
    '---',
    '',
    `<!-- Source: ${page.file} -->`,
    `<!-- Canonical URL: ${origin}${page.route} -->`,
    '',
    page.body,
    '',
  ]),
].join('\n').trim() + '\n';

mkdirSync(staticRoot, {recursive: true});
writeFileSync(resolve(staticRoot, 'llms.txt'), index, 'utf8');
writeFileSync(resolve(staticRoot, 'llms-full.txt'), full, 'utf8');
console.log(`Generated llms.txt index and llms-full.txt with ${orderedPages.length} documentation pages.`);
