
import type { WorkflowNode } from "../domain/workflow.js";
import { interpolate } from "./interpolate.js";

export async function executeNode(node: WorkflowNode, previousOutput?: unknown): Promise<unknown> {
    switch (node.config.type) {
        case "http_request":{
            const url = interpolate(node.config.url, previousOutput)
            const response = await fetch(url, {
                method: node.config.method,
                headers: node.config.headers
            });
            if(!response.ok) {
                throw new Error(`HTTP request failed: ${response.status} ${response.statusText}`);
                
            }

            const data = await response.json();
            return data;
        }
        
        case "llm_call":{
            const prompt = interpolate(node.config.prompt, previousOutput)
             console.log("--- PROMPT SENT TO OLLAMA ---");
             console.log(prompt);
             console.log("-----------------------------");
            const response = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    model: "llama3.2",
                    prompt: prompt,
                    stream: false,
                }),
            });
            if (!response.ok) {
                throw new Error(`LLM call failed: ${response.status} ${response.statusText}`);
                
            }

            const data = await response.json();
            return data.response;

        }
        default: {
            const impossibleCase: never = node.config;
            throw new Error(`Unknown node type: ${JSON.stringify(impossibleCase)}`);
            }

    }
}