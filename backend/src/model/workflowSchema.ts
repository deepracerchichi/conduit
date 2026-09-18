import mongoose from "mongoose";

const workFlowSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    nodes: {type: mongoose.Schema.Types.Mixed, required: true},
    edges: {type: mongoose.Schema.Types.Mixed, required: true},

}, {timestamps: true});

workFlowSchema.index({ userId: 1, createdAt: -1 });


export const WorkflowModel = mongoose.model("Workflow", workFlowSchema)