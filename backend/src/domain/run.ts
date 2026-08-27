import type { NodeId } from "./workflow.js";

export type StepStatus = "pending" | "running" | "succeeded" | "failed";

export interface Step {
  nodeId: NodeId;
  status: StepStatus;
  output?: unknown;
  error?: string;
}

export type RunStatus = "pending" | "running" | "succeeded" | "failed";

export interface Run {
  id: string;
  workflowId: string;
  status: RunStatus;
  steps: Step[];
}

