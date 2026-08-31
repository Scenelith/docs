import {existsSync, readFileSync, readdirSync} from 'node:fs';
import {relative, resolve} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const docsRoot = resolve(root, 'docs');
const indexPath = resolve(root, 'static/llms.txt');
const fullPath = resolve(root, 'static/llms-full.txt');

function walk(directory) {
  return readdirSync(directory, {withFileTypes: true}).flatMap((entry) => entry.isDirectory()
    ? walk(resolve(directory, entry.name))
    : /\.mdx?$/.test(entry.name) ? [resolve(directory, entry.name)] : []);
}

const failures = [];
if (!existsSync(indexPath)) failures.push('missing:static/llms.txt');
if (!existsSync(fullPath)) failures.push('missing:static/llms-full.txt');

if (!failures.length) {
  const index = readFileSync(indexPath, 'utf8');
  const full = readFileSync(fullPath, 'utf8');
  const files = walk(docsRoot).map((file) => relative(root, file).replaceAll('\\', '/'));
  for (const file of files) {
    if (!full.includes(`<!-- Source: ${file} -->`)) failures.push(`llms-full-page:${file}`);
    const id = file.slice('docs/'.length).replace(/\.mdx?$/, '');
    const route = id === 'intro' ? '/' : `/${id}`;
    if (!index.includes(`https://docs.scenelith.com${route}`)) failures.push(`llms-index-page:${file}`);
  }
  if (!index.includes('https://docs.scenelith.com/llms-full.txt')) failures.push('llms-index-full-download');
  if (!full.includes(`Pages included: ${files.length}`)) failures.push('llms-full-page-count');
  if (/^import\s+/m.test(full)) failures.push('llms-full-mdx-import');
  if (/<AgentTabs\s*\/>/.test(full)) failures.push('llms-full-unexpanded-component');
  if (/<\/?(?:section|div|span|h1|p|strong|a|br)\b/i.test(full)) failures.push('llms-full-html-markup');
  if (!full.includes('claude mcp add --transport http scenelith https://scenelith.com/api/mcp')) failures.push('llms-full-agent-setup');
  const config = readFileSync(resolve(root, 'docusaurus.config.ts'), 'utf8');
  if (!config.includes("label: 'AI-readable docs'")) failures.push('footer-llms-index');
  if ((config.match(/llms-full\.txt/g) || []).length > 0) failures.push('footer-duplicate-llms-link');
}

if (failures.length) {
  console.error(`LLM documentation export failed:\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
  process.exit(1);
}

console.log(`LLM documentation exports cover ${walk(docsRoot).length} pages.`);
