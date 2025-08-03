import express from "express";
import cors from "cors";
import nodeRoutes from "./routes/node.js";
import { config as configDotenv } from "dotenv";
import { connectDB } from "./utils/db.js";

configDotenv();
const app = express();
app.use(cors());

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/nodes", nodeRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
