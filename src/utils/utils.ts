import bcrypt from "bcrypt";
import { JWT_SECRET } from "../postgres/db/config";

const SALT = 14;

export const encryptPassword = async (password) => bcrypt.hash(password, SALT);

export const comparePassword = (password, hash) => bcrypt.compare(password, hash);

export const getJwtSecret = () => {
    if (!JWT_SECRET) {
        throw new Error("JWT secret not found!");
    }
    return JWT_SECRET;
}
