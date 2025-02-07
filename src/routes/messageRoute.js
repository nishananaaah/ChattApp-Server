import express from "express";
import { protectRoute } from "../middlewares/authMidlleware.js";
import { getuserForSidebar } from "../controllers/messageController.js";


const router = express.Router();

router.get("/user",protectRoute,getuserForSidebar)


export default router;