import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Getting started',
      collapsible: false,
      items: ['getting-started/quickstart', 'getting-started/core-concepts'],
    },
    {
      type: 'category',
      label: 'Canvas',
      items: ['canvas/overview', 'canvas/library-and-identities'],
    },
    {
      type: 'category',
      label: 'Automation',
      items: ['automation/overview', 'automation/build-and-run'],
    },
    {
      type: 'category',
      label: 'MCP',
      items: ['mcp/connect', 'mcp/permissions', 'mcp/tool-domains', 'mcp/troubleshooting'],
    },
    {
      type: 'category',
      label: 'Self-hosting',
      items: ['self-hosting/overview', 'self-hosting/public-url'],
    },
  ],
};

export default sidebars;
