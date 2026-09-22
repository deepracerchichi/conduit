import type { Workflow } from "../domain/workflow.js";
import { WorkflowModel } from "../model/workflowSchema.js";
import { RunModel } from "../model/runSchema.js";
import { AppError } from "../errors/AppError.js";
import { runWorkflow } from "../engine/runWorkflow.js";

export async function triggerRun(userId: string, workflowId: string, runId: string) {
  const doc = await WorkflowModel.findOne({ _id: workflowId, userId });
  if (!doc) {
    throw new AppError("Workflow not found", 404);
  }

  const workflow: Workflow = {
    id: doc.id, userId: doc.userId, name: doc.name,
    nodes: doc.nodes, edges: doc.edges,
    createdAt: doc.createdAt, updatedAt: doc.updatedAt,
    trigger: doc.trigger,
  };

  // Upsert, not create — a retry reuses this same runId and must update
  // the same document, not collide trying to insert a duplicate.
  await RunModel.findByIdAndUpdate(
    runId,
    { workflowId: workflow.id, status: "running", steps: [] },
    { upsert: true }
  );

  const run = await runWorkflow(workflow, runId);

  await RunModel.findByIdAndUpdate(runId, { status: run.status, steps: run.steps });

  return run;
}


