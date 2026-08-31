import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const generatedAutomationNodeSidebars: SidebarsConfig = {
  "automationNodes": [
    {
      "type": "category",
      "label": "Trigger nodes",
      "items": [
        "automation/nodes/triggers/core-manual-trigger"
      ]
    },
    {
      "type": "category",
      "label": "Input nodes",
      "items": [
        "automation/nodes/inputs/input-tiktok-source",
        "automation/nodes/inputs/input-identity",
        "automation/nodes/inputs/input-visual-references",
        "automation/nodes/inputs/input-creative-settings",
        "automation/nodes/inputs/input-workflow-data"
      ]
    },
    {
      "type": "category",
      "label": "AI nodes",
      "items": [
        "automation/nodes/ai/ai-structured-task",
        "automation/nodes/ai/ai-interpret-creative-direction"
      ]
    },
    {
      "type": "category",
      "label": "Logic nodes",
      "items": [
        "automation/nodes/logic/logic-transform",
        "automation/nodes/logic/logic-select-one",
        "automation/nodes/logic/logic-retry-gate",
        "automation/nodes/logic/logic-select-path",
        "automation/nodes/logic/logic-condition",
        "automation/nodes/logic/logic-prepare-creative-direction",
        "automation/nodes/logic/logic-resolve-creative-direction",
        "automation/nodes/logic/logic-limit-batch",
        "automation/nodes/logic/logic-merge",
        "automation/nodes/logic/logic-run-subworkflow",
        "automation/nodes/logic/logic-map-subworkflow",
        "automation/nodes/logic/logic-validate-slide-plans",
        "automation/nodes/logic/logic-prepare-slideshow-image-requests"
      ]
    },
    {
      "type": "category",
      "label": "Integration nodes",
      "items": [
        "automation/nodes/integrations/integration-http-request"
      ]
    },
    {
      "type": "category",
      "label": "Generation nodes",
      "items": [
        "automation/nodes/generation/generation-image"
      ]
    },
    {
      "type": "category",
      "label": "Output nodes",
      "items": [
        "automation/nodes/outputs/output-add-to-canvas",
        "automation/nodes/outputs/output-finish"
      ]
    }
  ]
};

export default generatedAutomationNodeSidebars.automationNodes;
