import { Router } from "express";
import { WorkflowModel } from "../model/workflowSchema.js";
import { createWorkflowSchema } from "../validation/workflow.js";

export const workflowsRouter = Router();

workflowsRouter.post("/", async (req, res) => {
  // 1. Authenticate — TODO: real JWT auth (milestone 3b)
  const userId = req.header("x-user-id");
  if (!userId) {
    return res.status(401).json({ error: "Missing x-user-id header" });
  }

  // 2. Validate
  const parsed = createWorkflowSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  // 3. Act
  const workflow = await WorkflowModel.create({ userId, ...parsed.data });

  // 4. Respond
  return res.status(201).json(workflow);
});
