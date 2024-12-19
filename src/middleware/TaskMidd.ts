import { NextFunction, Request, Response } from "express";

function isValidDate(date: Date): boolean {
  if (isNaN(date.getTime())) return false;
  return true;
}

export const validTask = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const title: string = req.body.title;
  const dueDate: string = req.body.dueDate;

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
