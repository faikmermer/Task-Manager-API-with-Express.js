"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validTask = void 0;
function isValidDate(date) {
    if (isNaN(date.getTime()))
        return false;
    return true;
}
const validTask = (req, res, next) => {
    const title = req.body.title;
    const dueDate = req.body.dueDate;
    if (!title) {
        res.status(400).json({ message: "title fields required" });
        return;
    }
    if (!isValidDate(new Date(dueDate))) {
        res.status(400).json({ message: "invalid date format" });
        return;
    }
    next();
};
exports.validTask = validTask;
