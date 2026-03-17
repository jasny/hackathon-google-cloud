import { Agent } from './types';

export class AgentClient {
  private baseUrl: string;

  constructor(private agent: Agent, agentUrl: string) {
    this.baseUrl = new URL(agentUrl).origin;
  }

  static async create(url: string): Promise<AgentClient> {
    const agent = await AgentClient.fetchAgent(url);
    return new AgentClient(agent, url);
  }

  private static async fetchAgent(url: string): Promise<Agent> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch agent definition from ${url}`);
    }
    return response.json();
  }

  getCapabilities() {
    return this.agent.capabilities;
  }

  async hello(payload: object): Promise<any> {
    const endpoint = this.agent.endpoints.messages;
    const url = new URL(endpoint, this.baseUrl).toString();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        capability: 'hello',
        payload,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to call hello capability: ${response.statusText}`);
    }

    return response.json();
  }
}
