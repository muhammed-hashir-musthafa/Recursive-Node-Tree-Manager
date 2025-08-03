"use client";

import React, { useState, useEffect } from "react";
import {
  getNodes,
  addNode as apiAddNode,
  deleteNode as apiDeleteNode,
  renameNode as apiRenameNode,
} from "../api/nodeTree";

type TreeNode = {
  _id: string;
  name: string;
  children: TreeNode[];
};
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
} from "lucide-react";

const NodeTree = () => {
  const [nodes, setNodes] = useState<TreeNode[]>([]);

  const fetchNodes = async () => {
    try {
      const tree: TreeNode[] = await getNodes();
      // console.log("Tree fetched:", tree);
      setNodes(tree);
    } catch (err) {
      console.error("Failed to fetch nodes", err);
    }
  };

  useEffect(() => {
    fetchNodes();
  }, []);
 
  const [expandedNodes, setExpandedNodes] = useState(new Set(["1", "1.1"]));
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  // Add node
  const addNode = async (parentId: string | null = null) => {
    // console.log("Adding node with parentId:", parentId);
    try {
      await apiAddNode(`New Node ${Date.now()}`, parentId);
      await fetchNodes();
      if (parentId) setExpandedNodes(new Set([...expandedNodes, parentId]));
    } catch (err) {
      console.error("Failed to add node", err);
    }
  };

  // Delete node 
  const deleteNode = async (id: string) => {
    try {
      await apiDeleteNode(id);
      await fetchNodes();
      setExpandedNodes(
        new Set([...expandedNodes].filter((nodeId) => nodeId !== id))
      );
    } catch (err) {
      console.error("Failed to delete node", err);
    }
  };

  // Start editing
  const startEdit = (node: TreeNode) => {
    setEditingNode(node._id);
    setEditValue(node.name);
  };

  // Save edit
  const saveEdit = async () => {
    if (!editValue.trim() || !editingNode) return;
    try {
      await apiRenameNode(editingNode, editValue.trim());
      await fetchNodes();
      setEditingNode(null);
      setEditValue("");
    } catch (err) {
      console.error("Failed to rename node", err);
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingNode(null);
    setEditValue("");
  };

  // Toggle expand/collapse
  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNodes(newExpanded);
  };

  // Render node recursively
  const renderNode = (node: TreeNode, depth: number = 0) => {
    const isExpanded = expandedNodes?.has(node._id);
    const hasChildren = node.children && node.children.length > 0;
    const isEditing = editingNode === node._id;

    // console.log(hasChildren, "children:", node);

    return (
      <div key={node._id} className="w-full">
        <div
          className={`group flex items-center py-3 px-4 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
            depth === 0
              ? "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm mb-2"
              : depth === 1
              ? "border-l-2 border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/10 ml-6 mb-1"
              : "border-l border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/20 ml-8 mb-1"
          }`}
          style={{
            marginLeft:
              depth > 1
                ? `${(depth - 1) * 20 + 24}px`
                : depth === 1
                ? "24px"
                : "0",
          }}
        >
          {/* Expand/Collapse Button */}
          <button
            onClick={() => toggleExpand(node._id)}
            className={`flex items-center justify-center w-6 h-6 rounded-md transition-all duration-200 mr-3 ${
              hasChildren
                ? "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                : "invisible"
            }`}
          >
            {hasChildren &&
              (isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              ))}
          </button>

          {/* Node Content */}
          <div className="flex-1 flex items-center min-w-0">
            {isEditing ? (
              <div className="flex items-center space-x-2 flex-1">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit();
                    if (e.key === "Escape") cancelEdit();
                  }}
                  className="flex-1 px-3 py-1.5 text-sm border border-blue-300 dark:border-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  autoFocus
                />
                <button
                  onClick={saveEdit}
                  className="p-1.5 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-md transition-colors"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={cancelEdit}
                  className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-md transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <span
                className={`flex-1 text-sm font-medium truncate ${
                  depth === 0
                    ? "text-gray-900 dark:text-gray-100"
                    : depth === 1
                    ? "text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {node.name}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          {!isEditing && (
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-3">
              <button
                onClick={() => addNode(node._id)}
                className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                title="Add child node"
              >
                <Plus size={14} />
              </button>
              <button
                onClick={() => startEdit(node)}
                className="p-1.5 text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-900/20 rounded-md transition-colors"
                title="Rename node"
              >
                <Edit3 size={14} />
              </button>
              <button
                onClick={() => deleteNode(node._id)}
                className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-md transition-colors"
                title="Delete node"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Render Children */}
        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {node.children.map((child: TreeNode) =>
              renderNode(child, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Node Tree Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your hierarchical data structure with ease
          </p>
        </div>

        {/* Add Root Node Button */}
        <div className="mb-6">
          <button
            onClick={() => addNode()}
            className="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus size={18} className="mr-2" />
            Add Root Node
          </button>
        </div>

        {/* Tree Container */}
        <div className="space-y-2">
          {nodes.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No nodes yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Get started by adding your first root node
              </p>
            </div>
          ) : (
            nodes.map((node) => renderNode(node))
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            How to use:
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Click the arrow icons to expand/collapse nodes</li>
            <li>• Hover over nodes to reveal action buttons</li>
            <li>• Use the + button to add child nodes</li>
            <li>• Use the edit button to rename nodes</li>
            <li>• Use the trash button to delete nodes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NodeTree;
