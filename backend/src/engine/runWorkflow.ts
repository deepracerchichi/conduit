import type { Workflow } from "../domain/workflow.js";
import type { Run, Step } from "../domain/run.js";
import { findStartNodes, findNextNodes } from "./graph.js";
import { executeNode } from "./execute.js";


export async function runWorkflow(workflow: Workflow): Promise<Run> {
    const startNodes = findStartNodes(workflow);


    if (startNodes.length !== 1) {
        throw new Error("Only workflows with exactly one starting node are supported right now. ");
    }

    const run: Run = {
        id: crypto.randomUUID(),
        workflowId: workflow.id,
        status: "running",
        steps: [],
    };

    let currentNode = startNodes[0];
    while (true) {
        const step: Step = {
            nodeId:currentNode.id,
            status: "running",
        };
        run.steps.push(step);

        try {
            const output = await executeNode(currentNode);
            step.status = "succeeded";
            step.output = output;
        } catch (error) {
            step.status = "failed";
            step.error = error instanceof Error ? error.message : String(error);
            run.status = "failed";
            return run;
        }

        const nextNodes = findNextNodes(workflow, currentNode.id);

        if (nextNodes.length === 0) {
            run.status = "succeeded";
            return run;
        }

        if (nextNodes.length > 1) {
            throw new Error("Branching workflows are not supported yet.");
            
        }

        currentNode = nextNodes[0];
    }
}