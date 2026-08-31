# Scenelith Docs

Customer-facing documentation for Scenelith Canvas, Automation, MCP and self-hosting.

## Local development

```bash
npm ci
npm run start
```

The production build is static:

```bash
npm run typecheck
npm run build
npm run serve
```

The root route is the documentation overview. Docusaurus runs in docs-only mode; there is no starter landing page or blog.

## Deployment

`docs.scenelith.com` is served by the Scenelith Cloud edge from a build pinned to a reviewed commit in this repository. Updating this repository does not change production until Cloud promotes that exact commit.
