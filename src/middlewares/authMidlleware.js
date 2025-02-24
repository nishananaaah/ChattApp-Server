import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}
		console.log(token, "too");

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log(decoded, "heelo");

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		// Fix: Use decoded.id instead of decoded.userId
		const user = await User.findById(decoded.id).select("-password");
		console.log(decoded.id, "hhhh");
		console.log(user, "user");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;
		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;
