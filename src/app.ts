import express from "express";
import taskRoutes from "./routes/taskRoutes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(taskRoutes);

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde calisiyor`);
});
