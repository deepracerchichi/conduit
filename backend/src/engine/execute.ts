
import type { WorkflowNode } from "../domain/workflow.js";

export async function executeNode(node: WorkflowNode): Promise<unknown> {
    switch (node.config.type) {
        case "http_request":{
            const response = await fetch(node.config.url, {
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
            const response = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    model: "llama3.2",
                    prompt: node.config.prompt,
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