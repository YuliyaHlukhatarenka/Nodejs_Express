import { v4 as uuid } from "uuid";
import { sequelize } from "../db/initDB";

export const createUser = async (user) => {
  const { email, password, role } = user;
  try {
    const user = await sequelize.models.User.create({
      id: uuid(),
      email,
      password,
      role,
    });
    console.log("User was created: ", user);
    return user;
  } catch (err) {
    console.error("Error of user creation: ", err);
  }
};

export const findUserByEmail = async (email) => {
    try {
      const user = await sequelize.models.User.findOne({ where: { email } });
      console.log("User exists: ", user);
      return user;
    } catch (err) {
      console.error("User email not found: ", err);
    }
}
