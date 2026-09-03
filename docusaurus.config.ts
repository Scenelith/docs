import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'Scenelith Docs',
  tagline: 'Build visual AI workflows that stay understandable.',
  favicon: 'img/scenelith-mark-mono.svg',
  url: 'https://docs.scenelith.com',
  baseUrl: '/',
  trailingSlash: false,
  organizationName: 'Scenelith',
  projectName: 'docs',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Scenelith/docs/edit/main/',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        blog: false,
        pages: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/scenelith-docs-card-mono.svg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Scenelith',
      logo: {
        alt: 'Scenelith',
        src: 'img/scenelith-mark-mono.svg',
      },
      items: [
        {to: '/canvas/overview', label: 'Canvas', position: 'left'},
        {to: '/automation/overview', label: 'Automation', position: 'left'},
        {to: '/mcp/connect', label: 'MCP', position: 'left'},
        {to: '/self-hosting/overview', label: 'Self-hosting', position: 'left'},
        {
          href: 'https://github.com/Scenelith/scenelith',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://scenelith.com',
          label: 'Open Scenelith',
          position: 'right',
          className: 'navbar__item--app',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Product',
          items: [
            {label: 'Canvas', to: '/canvas/overview'},
            {label: 'Automation', to: '/automation/overview'},
            {label: 'MCP', to: '/mcp/connect'},
            {label: 'Affiliate program', to: '/cloud/affiliate-program'},
          ],
        },
        {
          title: 'Deploy',
          items: [
            {label: 'Self-host Scenelith', to: '/self-hosting/overview'},
            {label: 'Public URL and HTTPS', to: '/self-hosting/public-url'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'GitHub', href: 'https://github.com/Scenelith/scenelith'},
            {label: 'Scenelith Cloud', href: 'https://scenelith.com'},
          ],
        },
        {
          title: 'For AI agents',
          items: [
            {label: 'AI-readable docs', href: 'https://docs.scenelith.com/llms.txt'},
          ],
        },
      ],
      copyright: `Scenelith · ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json'],
    },
    metadata: [
      {name: 'theme-color', content: '#101312'},
      {name: 'description', content: 'Documentation for Scenelith Canvas, Automation, MCP and self-hosting.'},
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
