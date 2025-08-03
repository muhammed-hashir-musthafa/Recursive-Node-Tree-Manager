import express from 'express';
import { createNode, deleteNode, getTree, renameNode } from '../controllers/node.js';

const router = express.Router();
console.log('Setting up node routes');
router.post('/', createNode);
router.patch('/:id', renameNode);
router.get('/', getTree);
router.delete('/:id', deleteNode);

export default router;