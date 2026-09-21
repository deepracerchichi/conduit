import { Router } from "express";
import { WorkflowModel } from "../model/workflowSchema.js";
import { createWorkflowSchema } from "../validation/workflow.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { AppError } from "../errors/AppError.js";
import { triggerRun } from "../services/runService.js";
import { RunModel } from "../model/runSchema.js";
import { scheduleCronWorkflow } from "../scheduler/cronScheduler.js";


export const workflowsRouter = Router();
workflowsRouter.use(requireAuth);
workflowsRouter.post("/", async (req, res) => {
  // 1. Authenticate — TODO: real JWT auth (milestone 3b)
  const userId = req.userId!; //guranteed by requireUser middleware
 

  // 2. Validate
  const parsed = createWorkflowSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: { message: "Invalid workflow", details: parsed.error.flatten() } });
  }

  
// 3. Act
const webhookToken = parsed.data.trigger.type === "webhook" ? crypto.randomUUID() : undefined;
const workflow = await WorkflowModel.create({ userId, ...parsed.data, webhookToken });

if (workflow.trigger.type === "cron") {
  scheduleCronWorkflow(workflow.id, workflow.userId, workflow.trigger.schedule);
}
  // 4. Respond
  return res.status(201).json(workflow);
});

// GET /workflows — list the current user's workflows
workflowsRouter.get("/", async (req, res) => {
  const userId = req.userId!;
  const workflows = await WorkflowModel.find({ userId }).sort({ createdAt: -1 });
  return res.json(workflows);
});

// GET /workflows/:id — one workflow, only if this user owns it
workflowsRouter.get("/:id", async (req, res) => {
  const userId = req.userId!;
  const workflow = await WorkflowModel.findOne({ _id: req.params.id, userId });
  if (!workflow) {
    throw new AppError("Workflow not found", 404);
  }
  return res.json(workflow);
});

// POST /workflows/:id/runs — execute a workflow now
workflowsRouter.post("/:id/runs", async (req, res) => {
  const userId = req.userId!;
  const run = await triggerRun(userId, req.params.id);
  return res.status(201).json(run);
});

// GET /workflows/:id/runs — list every run for this workflow
workflowsRouter.get("/:id/runs", async (req, res) => {
  const userId = req.userId!;
  const workflow = await WorkflowModel.findOne({ _id: req.params.id, userId });
  if (!workflow) {
    throw new AppError("Workflow not found", 404);
  }

  const runs = await RunModel.find({ workflowId: workflow.id }).sort({ createdAt: -1 });
  return res.json(runs);
});

// GET /workflows/:id/runs/:runId — one run's full detail
workflowsRouter.get("/:id/runs/:runId", async (req, res) => {
  const userId = req.userId!;
  const workflow = await WorkflowModel.findOne({ _id: req.params.id, userId });
  if (!workflow) {
    throw new AppError("Workflow not found", 404);
  }

  const run = await RunModel.findOne({ _id: req.params.runId, workflowId: workflow.id });
  if (!run) {
    throw new AppError("Run not found", 404);
  }
  return res.json(run);
});
