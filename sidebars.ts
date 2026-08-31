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
      items: [
        'canvas/overview',
        'canvas/canvas-management',
        {
          type: 'category',
          label: 'Nodes',
          items: [
            'canvas/nodes',
            'canvas/nodes/tiktok-post',
            'canvas/nodes/video-source',
            'canvas/nodes/scene-media',
            'canvas/nodes/identity',
            'canvas/nodes/hook',
            'canvas/nodes/generator',
            'canvas/nodes/assistant',
            'canvas/nodes/generated-output',
            'canvas/nodes/video-master',
            'canvas/nodes/note',
          ],
        },
        'canvas/models',
        'canvas/credits',
        'canvas/assistant',
        'canvas/tiktok-import',
        'canvas/hooks',
        'canvas/library',
        'canvas/identities',
      ],
    },
    {
      type: 'category',
      label: 'Automation',
      items: [
        'automation/overview',
        'automation/build-and-run',
        'automation/workflow-settings',
        'automation/deployment-and-credentials',
        'automation/portability-and-fixtures',
        {
          type: 'category',
          label: 'Node reference',
          items: [
            'automation/node-reference',
            'automation/nodes/triggers',
            'automation/nodes/inputs',
            'automation/nodes/ai',
            'automation/nodes/logic',
            'automation/nodes/integrations',
            'automation/nodes/generation',
            'automation/nodes/outputs',
          ],
        },
        'automation/runs-and-triggers',
      ],
    },
    {
      type: 'category',
      label: 'Cloud',
      items: ['cloud/plans-and-credits', 'cloud/team-access', 'cloud/notifications-and-tasks', 'cloud/support', 'cloud/feature-board'],
    },
    {
      type: 'category',
      label: 'MCP',
      items: ['mcp/connect', 'mcp/permissions', 'mcp/tool-domains', 'mcp/canvas-tools', 'mcp/library-identity-tools', 'mcp/automation-tools', 'mcp/tool-reference', 'mcp/troubleshooting'],
    },
    {
      type: 'category',
      label: 'Self-hosting',
      items: ['self-hosting/overview', 'self-hosting/providers-and-storage', 'self-hosting/backup-and-update', 'self-hosting/public-url'],
    },
  ],
};

export default sidebars;
