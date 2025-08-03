import * as nodeService from '../services/nodeService.js';

export const renameNode = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!id || !name) {
      return res.status(400).json({ error: 'Node id and new name are required' });
    }
    const updated = await nodeService.renameNode(id, name);
    if (!updated) {
      return res.status(404).json({ error: 'Node not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to rename node' });
  }
};

export const createNode = async (req, res) => {
  try {
    console.log('Creating node with data:', req.body);
    const { name, parentId } = req.body;
    const node = await nodeService.createNode(name, parentId);
    res.status(201).json(node);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create node' });
  }
};

export const getTree = async (_req, res) => {
  console.log('Fetching tree structure');
  try {
    const tree = await nodeService.getTree();
    res.json(tree);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tree' });
  }
};

export const deleteNode = async (req, res) => {
  console.log('Deleting node with ID:', req.params.id);
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Node id is required' });
    }
    await nodeService.deleteNodeRecursive(id);
    res.json({ message: 'Node deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete node' });
  }
};
