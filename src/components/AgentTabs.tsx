import React, {useState} from 'react';

type Agent = 'Codex' | 'Claude' | 'Claude Code' | 'ChatGPT' | 'Other';

const agents: Agent[] = ['Codex', 'Claude', 'Claude Code', 'ChatGPT', 'Other'];

const instructions: Record<Agent, React.ReactNode> = {
  Codex: <><strong>Add a Streamable HTTP server</strong><span>Open MCP settings, add a server, paste the URL below, then authenticate in the browser.</span></>,
  Claude: <><strong>Add a custom connector</strong><span>Open connector settings, add the Scenelith URL, and approve access in the browser.</span></>,
  'Claude Code': <><strong>Run one command</strong><span><code>claude mcp add --transport http scenelith https://scenelith.com/api/mcp</code></span></>,
  ChatGPT: <><strong>Add a remote MCP server</strong><span>Choose Streamable HTTP, paste the URL below, save, then authenticate.</span></>,
  Other: <><strong>Use a compatible MCP client</strong><span>Choose Streamable HTTP. The client must support OAuth authorization for remote servers.</span></>,
};

export default function AgentTabs(): React.JSX.Element {
  const [agent, setAgent] = useState<Agent>('Codex');

  return <div className="agent-connect">
    <div className="agent-connect__tabs" role="tablist" aria-label="AI agent">
      {agents.map((item) => <button key={item} type="button" role="tab" aria-selected={agent === item} className={agent === item ? 'is-active' : ''} onClick={() => setAgent(item)}>{item}</button>)}
    </div>
    <div className="agent-connect__body" role="tabpanel">{instructions[agent]}</div>
    <div className="agent-connect__endpoint"><span>Server URL</span><code>https://scenelith.com/api/mcp</code></div>
  </div>;
}
