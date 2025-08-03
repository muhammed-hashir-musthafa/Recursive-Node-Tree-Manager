import api from "@/utils/api";

// Get all nodes
export const getNodes = async () => {
  const res = await api.get("/nodes");
  console.log("Fetched nodes:", res.data);
  return res.data;
};

// Add a node
export const addNode = async (name: string, parentId: string | null = null) => {
  const res = await api.post("/nodes", { name, parentId });
  console.log("Node added:", res.data);
  return res.data;
};

// Delete a node
export const deleteNode = async (id: string) => {
  const res = await api.delete(`/nodes/${id}`);
  return res.data;
};

// Rename a node
export const renameNode = async (id: string, name: string) => {
  const res = await api.patch(`/nodes/${id}`, { name });
  return res.data;
};
