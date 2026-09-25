import { z } from "zod";

export const createCredentialSchema = z.object({
  name: z.string().min(1),
  provider: z.string().min(1),
  value: z.string().min(1),
});
