import { v4 as uuid } from "uuid";
import { sequelize } from "../db/initDB";

export const createUser = async () => {
  try {
    const user = await sequelize.models.User.create({
      id: uuid(),
    });
    console.log("User created: ", user);
    return;
  } catch (err) {
    console.error("Error creating user: ", err);
  }
};
