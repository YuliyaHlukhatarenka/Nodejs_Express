import express from "express";
import { errorHandler } from "./controllers/errorHandler";
import { createModels } from "./postgres";

const app = express();
const db = createModels();
db.sequelize.sync();

app.use("/api/auth/", require("./routers/user"), errorHandler);
app.use("/api/profile/cart", require("./routers/cart"), errorHandler);
app.use("/api/products", require("./routers/products"), errorHandler);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
