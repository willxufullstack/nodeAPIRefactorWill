import { Router, Request, Response } from "express";
import { sendError } from "./errorHandlers.js";
import { tasks as store, Task } from "./data/tasksData.js";

/**
 * Tasks Controller + Router
 * Do validation and HTTP mapping here
 * Get data from data layer tasksData.js
 */

const router = Router();

// --- helpers ---
function parseId(param: string): number | null {
  const id = Number(param);
  return Number.isFinite(id) ? id : null;
}

function validateCreateTask(body: any):
  | { ok: true; value: { title: string; done: boolean } }
  | { ok: false; message: string } {
  if (!body || typeof body.title !== "string" || body.title.trim().length === 0) {
    return { ok: false, message: "title is required" };
  }
  const done = typeof body.done === "boolean" ? body.done : false;
  return { ok: true, value: { title: body.title.trim(), done } };
}

function validateUpdateTask(body: any):
  | { ok: true; value: { title: string; done: boolean } }
  | { ok: false; message: string } {
  if (!body || typeof body.title !== "string" || typeof body.done !== "boolean") {
    return { ok: false, message: "title and done are required" };
  }
  return { ok: true, value: { title: body.title.trim(), done: body.done } };
}

// --- routes ---
router.get("/", (req: Request, res: Response) => {
  return res.json(store);
});

router.get("/:id", (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (id === null) return sendError(res, 400, "Invalid id");

  const task = store.find((t) => t.id === id);
  if (!task) return sendError(res, 404, "Task not found");

  return res.json(task);
});

router.post("/", (req: Request, res: Response) => {
  const result = validateCreateTask(req.body);
  if (!("ok" in result) || !result.ok) return sendError(res, 400, result.message);

  const newTask: Task = { id: store.length + 1, title: result.value.title, done: result.value.done };
  store.push(newTask);
  return res.json(newTask);
});

router.put("/:id", (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (id === null) return sendError(res, 400, "Invalid id");

  const result = validateUpdateTask(req.body);
  if (!result.ok) return sendError(res, 400, result.message);

  let found = false;
  store.forEach((task) => {
    if (task.id === id) {
      task.title = result.value.title;
      task.done = result.value.done;
      found = true;
    }
  });

  if (!found) return sendError(res, 404, "Not found");
  return res.send("Updated");
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = parseId(req.params.id);
  if (id === null) return sendError(res, 400, "Invalid id");

  const idx = store.findIndex((t) => t.id === id);
  if (idx >= 0) {
    store.splice(idx, 1);
  }
  return res.send("Deleted");
});

export default router;
