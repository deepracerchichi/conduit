import { Router } from "express";
import { WorkflowModel } from "../model/workflowSchema.js";
import { AppError } from "../errors/AppError.js";
import { triggerRun } from "../services/runService.js";

export const webhooksRouter = Router();

webhooksRouter.post("/:token", async (req, res) => {
  const workflow = await WorkflowModel.findOne({ webhookToken: req.params.token });
  if (!workflow) {
    throw new AppError("Webhook not found", 404);
  }

  const run = await triggerRun(workflow.userId, workflow.id);
  return res.status(201).json(run);
});
