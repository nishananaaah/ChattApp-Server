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
    console.log("Error in messagecontroller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let imageUrl = null;

    if (image) { // Fix: Check if image exists before uploading
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      text,
      image: imageUrl, // Assign uploaded image URL (or null if no image)
    });

    await newMessage.save();

    // Realtime functionality for socket.io can be added here
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in message controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
