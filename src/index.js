import express from "express";
import authRoutes from "./routes/authRoute.js";
import { connectDB } from "./lib/db.js";
import cookieparser from "cookie-parser";
import messageRoutes from "./routes/messageRoute.js";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoutes);

app.listen(5001, () => {
  console.log("server running on 5001");
  connectDB();
});
