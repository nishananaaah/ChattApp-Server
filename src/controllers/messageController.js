import cloudinary from "../lib/cloudinary.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export const getuserForSidebar = async (req, res) => {
  try {
    const loggedinuserId = req.user._id;
    const filterdUser = await User.find({
      _id: { $ne: loggedinuserId },
    }).select("-password");
    res.status(200).json(filterdUser);
  } catch (error) {
    console.log("Error in message contoller", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userTochatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, recieverId: userTochatId },
        { senderId: userTochatId, recieverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    consoel.log("Error in messagecontroller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if(!image){
        const uploadResponse = await cloudinary.uploader.upload(image)
        imageUrl =uploadResponse.secure_url
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      text,
      image:imageUrl
    });
    await newMessage.save();
    //the realtime functinality here for using socket io;
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in message controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
