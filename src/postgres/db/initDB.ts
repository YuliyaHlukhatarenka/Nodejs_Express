import { Sequelize } from "sequelize";
import { DB_USER, DB_PASSWORD, DB_ENDPOINT, DB_NAME } from "./config";

const connectURL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_ENDPOINT}/${DB_NAME}`;

export const sequelize = new Sequelize(connectURL, {
  logging: (msg) => console.log(msg),
});
