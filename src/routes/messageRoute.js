import express from "express";
import {
  getMessages,
  getuserForSidebar,
  sendMessage,
} from "../controllers/messageController.js";
import protectRoute from "../middlewares/authMidlleware.js";

const router = express.Router();

router.get("/user", protectRoute, getuserForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
