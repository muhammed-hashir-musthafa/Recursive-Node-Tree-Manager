import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Node", default: null },
    children: { type: [mongoose.Schema.Types.ObjectId], ref: "Node", default: [] },
  },
  { timestamps: true }
);

export const NodeModel = mongoose.model("Node", nodeSchema);
