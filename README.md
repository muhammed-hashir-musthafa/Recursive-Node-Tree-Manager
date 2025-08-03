# Recursive Node Tree Manager

A full-stack MERN (MongoDB, Express, React/Next.js, Node.js) application for managing hierarchical data structures with infinite nesting, featuring a modern UI with Tailwind CSS.

---

## 🚀 Stack
- **Frontend:** Next.js (React), TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)

---

## 📦 Features
- Add, rename, and delete nodes with infinite nesting
- Tree structure is displayed recursively with expand/collapse
- All changes are persisted in MongoDB
- Modern, responsive UI with Tailwind CSS
- Clean MVC backend structure

---

## 🗂️ Folder Structure
```
client/           # Next.js frontend
  src/
    components/   # React components (NodeTree, etc.)
    api/          # API utility functions
    utils/        # (optional) Shared utilities
server/           # Express backend
  src/
    controllers/  # Route controllers
    models/       # Mongoose models
    routes/       # Express routes
    services/     # Business logic
    utils/        # DB connection
```

---

## 📝 Application Flow
1. **Frontend**
   - User interacts with the Node Tree UI (add, rename, delete, expand/collapse nodes).
   - All node actions trigger API calls to the backend using axios.
   - The UI fetches the entire tree from the backend and renders it recursively.
2. **Backend**
   - Express routes handle API requests (`/api/nodes`).
   - Controllers delegate logic to services (e.g., createNode, getTree, deleteNodeRecursive, renameNode).
   - Services interact with MongoDB via Mongoose models, supporting infinite nesting.
   - The backend always returns the full tree structure, with children arrays populated.
3. **Database**
   - MongoDB stores each node with references to its parent and children.
   - Deleting a node recursively deletes all descendants.

---

## 🛠️ Setup & Run

### 1. Backend
```bash
cd server
npm install
# Start MongoDB locally or use a cloud URI
node src/server.js
```

### 2. Frontend
```bash
cd client
npm install
npm run dev
```

- The frontend will be available at https://recursive-node-tree-manager.vercel.app/
- The backend API will be available at https://recursive-node-tree-manager.onrender.coms

---

## 🌳 API Endpoints
- `GET    /api/nodes`         — Get the full node tree
- `POST   /api/nodes`         — Add a node (`{ name, parentId? }`)
- `PATCH  /api/nodes/:id`     — Rename a node (`{ name }`)
- `DELETE /api/nodes/:id`     — Delete a node and all descendants

---

## ✨ UI/UX
- Expand/collapse nodes with smooth transitions
- Inline editing and adding of nodes
- Hover to reveal action buttons
- Responsive and accessible design

---

## 📖 Notes
- All node operations are dynamic and persist to the database
- The backend is written in JavaScript (no TypeScript)
- The frontend uses TypeScript for type safety
- For development, ensure both frontend and backend are running

---

## 📬 Feedback & Contributions
Pull requests and issues are welcome!
