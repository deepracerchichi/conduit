import type { Workflow } from "../domain/workflow.js";
import { WorkflowModel } from "../model/workflowSchema.js";
import { RunModel } from "../model/runSchema.js";
import { AppError } from "../errors/AppError.js";
import { runWorkflow } from "../engine/runWorkflow.js";

export async function triggerRun(userId: string, workflowId: string) {
  const doc = await WorkflowModel.findOne({ _id: workflowId, userId });
  if (!doc) {
    throw new AppError("Workflow not found", 404);
  }

  const workflow: Workflow = {
    id: doc.id,
    userId: doc.userId,
    name: doc.name,
    nodes: doc.nodes,
    edges: doc.edges,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    trigger: doc.trigger
  }

  const runId = crypto.randomUUID();

  // Record intent BEFORE doing the work — a durability breadcrumb.
  await RunModel.create({ _id: runId, workflowId: workflow.id, status: "running", steps: [] });

  const run = await runWorkflow(workflow, runId);

  // Record the outcome AFTER the work finishes.
  await RunModel.findByIdAndUpdate(runId, { status: run.status, steps: run.steps });

  return run;
}

