"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchTask = exports.deleteTask = exports.putTask = exports.getId = exports.getTask = exports.addTask = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const tasksPath = path_1.default.join(__dirname, "../../tasks.json");
const addTask = (req, res) => {
    const { title, description, category, dueDate } = req.body;
    const newTasks = { title, description, category, dueDate };
    fs_1.default.readFile(tasksPath, "utf8", (err, data) => {
        if (err)
            return res.status(500).json({ message: "unable to read file" });
        const tasks = JSON.parse(data);
        newTasks.status = "pending";
        newTasks.id = tasks.length + 1;
        tasks.push(newTasks);
        fs_1.default.writeFile(tasksPath, JSON.stringify(tasks, null, 4), (err) => {
            if (err)
                return res.status(500).json({ message: "unable to write file" });
            res.status(200).json(newTasks);
        });
    });
};
exports.addTask = addTask;
const getTask = (req, res) => {
    // work olan veriyi alıyoruz.
    const { category } = req.query;
    // page=number&limit=number sayfadaki veri sayısını düzenliyoruz.
    const Strpage = req.query.page;
    const Strlimit = req.query.limit;
    const page = parseInt(Strpage);
    const limit = parseInt(Strlimit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const sort = req.query.sort;
    fs_1.default.readFile(tasksPath, "utf8", (err, data) => {
        if (err)
            return res.status(500).json({ message: "unable to read file" });
        const taskData = JSON.parse(data);
        if (!isNaN(limit) && !isNaN(page)) {
            const pageShow = taskData.slice(start, end);
            res.status(200).json(pageShow);
        }
        else if (category) {
            const categoryFilter = taskData.filter((q) => q.category === category);
            res.status(200).json(categoryFilter);
        }
        else if (sort) {
            taskData.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
            res.status(200).json(taskData);
        }
        else {
            res.status(200).json(taskData);
        }
    });
};
exports.getTask = getTask;
const getId = (req, res) => {
    const Strid = req.params.id;
    const id = parseInt(Strid, 10);
    fs_1.default.readFile(tasksPath, "utf8", (err, data) => {
        if (err)
            return res.status(500).json({ message: "unable to read file" });
        const taskId = JSON.parse(data);
        const findId = taskId.find((q) => q["id"] === id);
        if (findId !== undefined) {
            res.status(200).json(findId);
        }
        else {
            res.json({ message: "Not found id" });
        }
    });
};
exports.getId = getId;
const putTask = (req, res) => {
    const { title, description, category, dueDate, status, id } = req.body;
    const nowData = {
        title,
        description,
        category,
        dueDate,
        status,
        id,
    };
    fs_1.default.readFile(tasksPath, "utf8", (err, data) => {
        if (err)
            return res.status(500).json({ message: "unable to read file" });
        const updateData = JSON.parse(data);
        const indexFind = updateData.findIndex((obj) => obj.id === nowData.id);
        const strId = req.params.id;
        const putId = parseInt(strId, 10);
        const req_control_id = updateData.find((q) => q["id"] === putId);
        if (req_control_id === undefined)
            return res.status(404).json({ message: "Not Found Page" });
        else {
            if (indexFind !== -1) {
                updateData[indexFind] = nowData;
                fs_1.default.writeFile(tasksPath, JSON.stringify(updateData, null, 4), (err) => {
                    if (err) {
                        return res.status(500).json({ message: "unable to write file" });
                    }
                    res.status(200).json(nowData);
                });
            }
            else {
                console.error(404, "Task not found!");
            }
        }
    });
};
exports.putTask = putTask;
const deleteTask = (req, res) => {
    const deleteId = req.params.id;
    const delete_number_id = parseInt(deleteId, 10);
    fs_1.default.readFile(tasksPath, "utf-8", (err, data) => {
        if (err)
            return res.status(400).json("Unable to read file");
        let delData = JSON.parse(data);
        const delFindIndex = delData.findIndex((obj) => obj.id === delete_number_id);
        if (delFindIndex !== undefined) {
            delete delData[delFindIndex];
            delData = delData.filter((i) => i !== null);
        }
        else {
            res.status(404).json({ message: "Task not found" });
        }
        fs_1.default.writeFile(tasksPath, JSON.stringify(delData, null, 4), (err) => {
            if (err)
                return res.status(500).json({ message: "Unable to write file" });
            res.status(200).json({ message: "Tasks deleted sucessfully" });
        });
    });
};
exports.deleteTask = deleteTask;
const patchTask = (req, res) => {
    const strId = req.params.id;
    const patchId = parseInt(strId, 10);
    const patchStatus = { status: req.body.status };
    fs_1.default.readFile(tasksPath, "utf-8", (err, data) => {
        if (err)
            return res.status(500).json({ message: "Unable to read file" });
        const patchData = JSON.parse(data);
        const patchFindIndex = patchData.findIndex((obj) => obj.id === patchId);
        patchData[patchFindIndex].status = req.body.status;
        fs_1.default.writeFile(tasksPath, JSON.stringify(patchData, null, 4), (err) => {
            if (err)
                return res.status(500).json({ message: "Unable to write file" });
            res.status(200).json(patchStatus);
        });
    });
};
exports.patchTask = patchTask;
