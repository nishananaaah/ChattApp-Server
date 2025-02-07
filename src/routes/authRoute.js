import express from "express" ;
import { login, logout, signup} from "../controllers/authController.js";
// import { protectRoute } from "../middlewares/authMidlleware.js";

const route = express.Router();

route.post("/signup",signup)
route.post("/login",login)
route.post("/logout",logout)
// route.put("/update-profile", protectRoute,updateProfile)
export default route;