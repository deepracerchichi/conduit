import mongoose from "mongoose";

const credentialSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  provider: { type: String, required: true },
  encryptedValue: { type: String, required: true },
}, { timestamps: true });

credentialSchema.index({ userId: 1, createdAt: -1 });

export const CredentialModel = mongoose.model("Credential", credentialSchema);
