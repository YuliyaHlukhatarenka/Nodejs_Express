import express from "express";
import { errorHandler } from "./controllers/errorHandler";
import { createModels } from "./postgres";

const app = express();
export const db = createModels();
db.sequelize.sync();

app.use((req, res, next) => {
  const userId = req.headers["x-user-id"];

  if (!userId) {
    return res.status(401).json({ message: "Invalid user" });
  }
  next();
});
app.use("/api/profile/cart", require("./routers/cart"), errorHandler);
app.use("/api/products", require("./routers/products"), errorHandler);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
