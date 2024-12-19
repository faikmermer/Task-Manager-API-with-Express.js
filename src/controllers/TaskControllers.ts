import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export interface infoTask {
  title: string;
  description: string;
  category: string;
  dueDate: string;
  status?: string;
  id?: number;
}

const tasksPath = path.join(__dirname, "../../tasks.json");

export const addTask = (req: Request, res: Response): void => {
  const { title, description, category, dueDate }: infoTask = req.body;
  const newTasks: infoTask = { title, description, category, dueDate };

  fs.readFile(tasksPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "unable to read file" });

    const tasks: any = JSON.parse(data);

    newTasks.status = "pending";
    newTasks.id = tasks.length + 1;

    tasks.push(newTasks);

    fs.writeFile(tasksPath, JSON.stringify(tasks, null, 4), (err) => {
      if (err) return res.status(500).json({ message: "unable to write file" });

      res.status(200).json(newTasks);
    });
  });
};

export const getTask = (req: Request, res: Response): void => {
  // work olan veriyi alıyoruz.

  const { category }: any = req.query;
  // page=number&limit=number sayfadaki veri sayısını düzenliyoruz.
  const Strpage: any = req.query.page;
  const Strlimit: any = req.query.limit;

  const page: number = parseInt(Strpage);
  const limit = parseInt(Strlimit);

  const start: number = (page - 1) * limit;
  const end: number = start + limit;

  const sort: any = req.query.sort;

  fs.readFile(tasksPath, "utf8", (err, data): unknown => {
    if (err) return res.status(500).json({ message: "unable to read file" });

    const taskData: infoTask[] = JSON.parse(data);

    if (!isNaN(limit) && !isNaN(page)) {
      const pageShow = taskData.slice(start, end);
      res.status(200).json(pageShow);
    } else if (category) {
      const categoryFilter = taskData.filter(
        (q: any) => q.category === category
      );
      res.status(200).json(categoryFilter);
    } else if (sort) {
      taskData.sort(
        (a: any, b: any) =>
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
      res.status(200).json(taskData);
    } else {
      res.status(200).json(taskData);
    }
  });
};
export const getId = (req: Request, res: Response): void => {
  const Strid: string = req.params.id;
  const id: number = parseInt(Strid, 10);

  fs.readFile(tasksPath, "utf8", (err, data): unknown => {
    if (err) return res.status(500).json({ message: "unable to read file" });

    const taskId: infoTask[] = JSON.parse(data);
    const findId: any = taskId.find((q: any) => q["id"] === id);

    if (findId !== undefined) {
      res.status(200).json(findId);
    } else {
      res.json({ message: "Not found id" });
    }
  });
};

export const putTask = (req: Request, res: Response): void => {
  const { title, description, category, dueDate, status, id }: infoTask =
    req.body;
  const nowData: infoTask = {
    title,
    description,
    category,
    dueDate,
    status,
    id,
  };

  fs.readFile(tasksPath, "utf8", (err, data): unknown => {
    if (err) return res.status(500).json({ message: "unable to read file" });

    const updateData: infoTask[] = JSON.parse(data);
    const indexFind: any = updateData.findIndex(
      (obj: any) => obj.id === nowData.id
    );

    const strId: string = req.params.id;
    const putId: number = parseInt(strId, 10);
    const req_control_id = updateData.find((q: any) => q["id"] === putId);

    if (req_control_id === undefined)
      return res.status(404).json({ message: "Not Found Page" });
    else {
      if (indexFind !== -1) {
        updateData[indexFind] = nowData;

        fs.writeFile(tasksPath, JSON.stringify(updateData, null, 4), (err) => {
          if (err) {
            return res.status(500).json({ message: "unable to write file" });
          }

          res.status(200).json(nowData);
        });
      } else {
        console.error(404, "Task not found!");
      }
    }
  });
};

export const deleteTask = (req: Request, res: Response): void => {
  const deleteId: string = req.params.id;
  const delete_number_id = parseInt(deleteId, 10);

  fs.readFile(tasksPath, "utf-8", (err, data): unknown => {
    if (err) return res.status(400).json("Unable to read file");

    let delData: infoTask[] = JSON.parse(data);
    const delFindIndex = delData.findIndex(
      (obj: any) => obj.id === delete_number_id
    );

    if (delFindIndex !== undefined) {
      delete delData[delFindIndex];
      delData = delData.filter((i: any) => i !== null);
    } else {
      res.status(404).json({ message: "Task not found" });
    }

    fs.writeFile(tasksPath, JSON.stringify(delData, null, 4), (err) => {
      if (err) return res.status(500).json({ message: "Unable to write file" });

      res.status(200).json({ message: "Tasks deleted sucessfully" });
    });
  });
};

export const patchTask = (req: Request, res: Response): void => {
  const strId: string = req.params.id;
  const patchId: number = parseInt(strId, 10);

  const patchStatus: Partial<infoTask> = { status: req.body.status };

  fs.readFile(tasksPath, "utf-8", (err, data): unknown => {
    if (err) return res.status(500).json({ message: "Unable to read file" });

    const patchData = JSON.parse(data);
    const patchFindIndex: number = patchData.findIndex(
      (obj: any) => obj.id === patchId
    );

    patchData[patchFindIndex].status = req.body.status;

    fs.writeFile(tasksPath, JSON.stringify(patchData, null, 4), (err) => {
      if (err) return res.status(500).json({ message: "Unable to write file" });

      res.status(200).json(patchStatus);
    });
  });
};
