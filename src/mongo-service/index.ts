import mongoose from "mongoose";

export const connectionDB = async () => {
    try {
        await mongoose.connect(
          "mongodb://127.0.0.1:27017/mongoDB"
        );
        mongoose.set("bufferCommands", false);
        console.log("Successfully connected to MongoDB");
    } catch {
        console.log("Connected to MongoDB Failed");
    } 
}
