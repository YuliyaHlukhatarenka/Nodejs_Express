import express from "express";
import { errorHandler } from "./controllers/errorHandler";
const app = express();

app.use("/api/profile/card", require("./routers/card"), errorHandler);
app.use("/api/products", require("./routers/products"), errorHandler);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
