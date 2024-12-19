import express from "express";
import { addTask } from "../controllers/TaskControllers";
import { getTask } from "../controllers/TaskControllers";
import { validTask } from "../middleware/TaskMidd";
import { getId } from "../controllers/TaskControllers";
import { putTask } from "../controllers/TaskControllers";
import { deleteTask } from "../controllers/TaskControllers";
import { patchTask } from "../controllers/TaskControllers";

const router = express.Router();

router.post("/tasks", validTask, addTask);
router.get("/tasks", getTask);
router.get("/tasks/:id", getId);
router.put("/tasks/:id", validTask, putTask);
router.delete("/tasks/:id", deleteTask);
router.patch("/tasks/:id/status", patchTask);

export default router;
