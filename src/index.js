import express from "express"
import authRoutes from "./routes/authRoute.js"
import { connectDB } from "./lib/db.js";
import cookieparser from "cookie-parser";
import messageRoutes from "./routes/authRoute.js"


const app = express();

app.use(express.json());
app.use(cookieparser());
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)
app.listen(5001,()=>{
    console.log("server running on 5001")
    connectDB();
})