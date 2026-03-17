export interface Agent {
  name: string;
  description: string;
  version: string;
  provider: {
    organization: string;
  };
  authentication: {
    type: 'none' | 'oauth2';
  };
  endpoints: {
    messages: string;
    tasks: string;
    artifacts: string;
  };
  capabilities: Capability[];
}

export interface Capability {
  name: string;
  description: string;
  input_schema?: object;
}
