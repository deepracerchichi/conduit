export function interpolate(template: string, previousOutput: unknown): string {
  if (!template.includes("{{previousOutput}}")) {
    return template;
  }

  const valueAsText = typeof previousOutput === "string"
    ? previousOutput
    : JSON.stringify(previousOutput);

  return template.replaceAll("{{previousOutput}}", valueAsText);
}
