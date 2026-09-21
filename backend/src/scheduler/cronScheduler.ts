import cron from "node-cron";
import type { ScheduledTask } from "node-cron";
import { triggerRun } from "../services/runService.js";
import { WorkflowModel } from "../model/workflowSchema.js";

const scheduledJobs = new Map<string, ScheduledTask>();

export function scheduleCronWorkflow(workflowId: string, userId: string, schedule: string) {
  if (scheduledJobs.has(workflowId)) {
    return; // already scheduled — don't register the same workflow twice
  }

  const task = cron.schedule(schedule, () => {
    triggerRun(userId, workflowId).catch((error) => {
      console.error(`Cron trigger failed for workflow ${workflowId}:`, error);
    });
  });

  scheduledJobs.set(workflowId, task);
}



export async function loadCronWorkflowsFromDatabase() {
  const cronWorkflows = await WorkflowModel.find({ "trigger.type": "cron" });
  for (const doc of cronWorkflows) {
    if (doc.trigger.type === "cron") {
      scheduleCronWorkflow(doc.id, doc.userId, doc.trigger.schedule);
    }
  }
}
