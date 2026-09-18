import { Router } from "express";
import { WorkflowModel } from "../model/workflowSchema.js";
import { createWorkflowSchema } from "../validation/workflow.js";
import { requireUser } from "../middleware/requireUser.js";
import { AppError } from "../errors/AppError.js";
import { triggerRun } from "../services/runService.js";


export const workflowsRouter = Router();
workflowsRouter.use(requireUser);
workflowsRouter.post("/", async (req, res) => {
  // 1. Authenticate — TODO: real JWT auth (milestone 3b)
  const userId = req.userId!; //guranteed by requireUser middleware
 

  // 2. Validate
  const parsed = createWorkflowSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: { message: "Invalid workflow", details: parsed.error.flatten() } });
  }

  // 3. Act
  const workflow = await WorkflowModel.create({ userId, ...parsed.data });

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
