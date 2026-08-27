import type {NodeId, Workflow, WorkflowNode } from "../domain/workflow.js";

export function findStartNodes(workflow: Workflow): WorkflowNode[] {
  const startNodes: WorkflowNode[] = [];

  for (const node of workflow.nodes) {
    let hasArrowPointingToIt = false;

    for (const edge of workflow.edges) {
      if (edge.to === node.id) {
        hasArrowPointingToIt = true;
      }
    }

    if (!hasArrowPointingToIt) {
      startNodes.push(node);
    }
  }

  return startNodes;
}


export function findNextNodes(workflow: Workflow, nodeId: NodeId): WorkflowNode[] {
  const nextNodes: WorkflowNode[] = [];

  for (const edge of workflow.edges) {
    if (edge.from === nodeId) {
      for (const node of workflow.nodes) {
        if (node.id === edge.to) {
          nextNodes.push(node);
        }
      }
    }
  }

  return nextNodes;
}
