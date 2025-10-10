import express from "express";
import cors from "cors";
import * as postsRoutes from "./routes/postsRoutes.js";
import * as usersRoutes from "./routes/usersRoutes.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/api", usersRoutes);
app.use("/api", postsRoutes);

app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});
