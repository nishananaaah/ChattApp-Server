import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const con = await mongoose.connect("mongodb://localhost:27017/chattapp");
    console.log(`mongodbconnected ${con.connection.host}`);
  } catch (error) {
    console.log("MongoDB connction error", error);
  }
};
