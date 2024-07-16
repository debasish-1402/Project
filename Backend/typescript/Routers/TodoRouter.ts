import { Router, Request, Response } from "express";
import ITodoService from "../Services/ITodoService";

export default class TodoRouter {
  public router: Router = Router();
  constructor(private service: ITodoService) {
    this.loadRoutes();
  }

  loadRoutes() {
    this.router.get("/", async (req: Request, res: Response) => {
      const todoArray = await this.service.getAllTodo();
      res.send(todoArray);
    });
    this.router.get("/:id", async (req: Request, res: Response) => {
      const todo = await this.service.getTodo(+req.params.id);
      res.send(todo);
    });
    this.router.post("/", async (req: Request, res: Response) => {
      const todo = await this.service.addTodo(
        req.body.text,
        req.body.completed == "false" ? false : true
      );
      res.send(todo);
    });
    this.router.put("/", async (req: Request, res: Response) => {
      const todo = await this.service.updateTodo(req.body);
      res.send(todo);
    });
    this.router.delete("/:id", async (req: Request, res: Response) => {
      const todo = await this.service.deleteTodo(+req.params.id);
      res.send(todo);
    });
  }
}
