import { runWorkflow } from "./runWorkflow.js";
import type { Workflow } from "../domain/workflow.js";

const testWorkflow: Workflow = {
  id: "wf1",
  userId: "user1",
  name: "Test workflow",
  nodes: [
    {
      id: "step1",
      name: "Fetch a Hacker News item",
      config: { type: "http_request", url: "https://hacker-news.firebaseio.com/v0/item/1.json", method: "GET" },
    },
    {
      id: "step2",
      name: "Summarize it",
      config: { type: "llm_call", prompt: "Summarize this Hacker News post in one sentence: {{previousOutput}}" },
    },
  ],
  edges: [{ from: "step1", to: "step2" }],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const result = await runWorkflow(testWorkflow);
console.log(JSON.stringify(result, null, 2));
