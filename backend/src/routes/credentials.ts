import { Router } from "express";
import { CredentialModel } from "../model/credentialSchema.js";
import { createCredentialSchema } from "../validation/credential.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { AppError } from "../errors/AppError.js";
import { encrypt } from "../crypto/encryption.js";

export const credentialsRouter = Router();
credentialsRouter.use(requireAuth);

credentialsRouter.post("/", async (req, res) => {
  const userId = req.userId!;
  const parsed = createCredentialSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: { message: "Invalid credential", details: parsed.error.flatten() } });
  }

  const encryptedValue = encrypt(parsed.data.value);
  const credential = await CredentialModel.create({
    userId,
    name: parsed.data.name,
    provider: parsed.data.provider,
    encryptedValue,
  });

  return res.status(201).json({
    id: credential.id,
    name: credential.name,
    provider: credential.provider,
    createdAt: credential.createdAt,
  });
});

credentialsRouter.get("/", async (req, res) => {
  const userId = req.userId!;
  const credentials = await CredentialModel.find({ userId }).sort({ createdAt: -1 });
  return res.json(
    credentials.map((c) => ({ id: c.id, name: c.name, provider: c.provider, createdAt: c.createdAt }))
  );
});

credentialsRouter.delete("/:id", async (req, res) => {
  const userId = req.userId!;
  const credential = await CredentialModel.findOneAndDelete({ _id: req.params.id, userId });
  if (!credential) {
    throw new AppError("Credential not found", 404);
  }
  return res.status(204).send();
});
