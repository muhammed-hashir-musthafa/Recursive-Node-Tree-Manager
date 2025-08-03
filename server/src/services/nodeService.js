import { NodeModel } from "../models/Node.js";


export const renameNode = async (id, name) => {
  return NodeModel.findByIdAndUpdate(id, { name }, { new: true });
};
 
export const createNode = async (name, parentId) => {
  const node = new NodeModel({ name, parentId: parentId || null });
  return node.save();
};

export const getTree = async () => {
  const nodes = await NodeModel.find().lean();
  const map = new Map();
  nodes.forEach((node) =>
    map.set(node._id.toString(), { ...node, children: [] })
  );
  const tree = [];
  map.forEach((node) => {
    if (node.parentId) {
      const parent = map.get(node.parentId.toString());
      if (parent) parent.children.push(node);
    } else {
      tree.push(node);
    }
  });
  return tree;
};

export const deleteNodeRecursive = async (nodeId) => {
  const children = await NodeModel.find({ parentId: nodeId }).lean();
  for (const child of children) {
    await deleteNodeRecursive(child._id.toString());
  }
  await NodeModel.findByIdAndDelete(nodeId);
};
