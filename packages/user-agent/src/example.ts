import { AgentClient } from './client';

const AGENT_URL = 'http://localhost:8080/.well-known/agent.json';

async function main() {
  console.log('Creating agent client...');
  const client = await AgentClient.create(AGENT_URL);

  console.log('Agent capabilities:', client.getCapabilities());

  console.log('Calling hello capability...');
  const response = await client.hello({ from: 'user-agent' });

  console.log('Response from hello capability:', response);
}

main().catch(console.error);
