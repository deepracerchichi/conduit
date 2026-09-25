export function interpolate(template: string, previousOutput: unknown, credentialValue?:string): string {
  let result = template;

  if (result.includes("{{previousOutput}}")) {
    const valueAsText = typeof previousOutput === "string" ? previousOutput : JSON.stringify(previousOutput);
    result = result.replaceAll("{{previousOutput}}", valueAsText);
  }

  if (result.includes("{{credential}}")) {
    if (!credentialValue) {
      throw new Error("This node references {{credential}} but no credential was resolved");
    }
    result = result.replaceAll("{{credential}}", credentialValue);
  }

  return result;
}
