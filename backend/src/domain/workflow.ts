export type NodeId = string;

export interface HttpRequestNodeConfig {
  type: "http_request";
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
  credentialId?: string;
}

export interface LlmCallNodeConfig {
  type: "llm_call";
  prompt: string;
  systemPrompt?: string;
}

export type NodeConfig = HttpRequestNodeConfig | LlmCallNodeConfig;

export interface WorkflowNode {
  id: NodeId;
  name: string;
  config: NodeConfig;
}

export interface WorkflowEdge {
  from: NodeId;
  to: NodeId;
}

export interface Workflow {
  id: string;
  userId: string;
  name: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: Date;
  updatedAt: Date;
  trigger: Trigger; 
}

export type Trigger =
  | { type: "manual" }
  | { type: "webhook" }
  | { type: "cron"; schedule: string };
