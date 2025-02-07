import User from "../models/userModel.js";




export const getuserForSidebar = async(req,res)=>{
    try {
        const loggedinuserId = req.user._id;
        const filterdUser = await User.find({_id:{$ne:loggedinuserId}}).select("-password");
        res.status(200).json(filterdUser)
    } catch (error) {
        console.log("Error in message contoller",error.message);
        res.status(500).json({message:"internal server error"})
        
    }
}