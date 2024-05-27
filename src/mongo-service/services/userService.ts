import User from "../models/user"; 
import { v4 as uuid } from "uuid";

const createUser = async () => {
  try {
    const user = new User({
      id: uuid(),
    });

    const savedUser = await user.save();
    console.log("User created: ", savedUser);
    return 
  } catch (err) {
    console.error("Error creating user: ", err);
  }
};
