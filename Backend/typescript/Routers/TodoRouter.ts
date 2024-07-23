import { Request, Response, Router } from "express";
import ITodoService from "../Services/ITodoService";
import Logger, { trace } from "../Utilities/Logger";
import { ApiFailure, ApiSuccess } from "../Utilities/Result";

type HttpVerbs = "get" | "post" | "put" | "delete" | "all" | "options";
export default class TodoRouter {
  public router: Router = Router();

  private routes: Array<{
    method: HttpVerbs;
    path: string;
    handler: Function;
  }> = [
    { method: "get", path: "/", handler: this.getAllTodos },
    { method: "get", path: "/:id", handler: this.getTodo },
    { method: "post", path: "/", handler: this.addTodo },
    { method: "put", path: "/", handler: this.updateTodo },
    { method: "delete", path: "/:id", handler: this.deleteTodo },
  ];

  constructor(private service: ITodoService) {
    this.loadRoutes();
  }

  @trace
  loadRoutes() {
    this.routes.forEach((route) => {
      this.router[route.method](route.path, route.handler.bind(this));
    });
  }

  private async getAllTodos(req: Request, res: Response) {
    try {
      const todoArray = await this.service.getAllTodo();
      res.send(ApiSuccess(todoArray));
    } catch (error) {
      res.status(404).send(ApiFailure(error));
    }
  }

  private async getTodo(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id)) {
      return res.status(422).send(ApiFailure(-1, "Invalid ID"));
    }
    try {
      const todo = await this.service.getTodo(id);
      res.send(ApiSuccess(todo));
    } catch (error) {
      res.send(ApiFailure(error));
    }
  }

  private async addTodo(req: Request, res: Response) {
    const { text, completed } = req.body;
    if (text.trim().length == 0 || (completed != false && completed != true)) {
      return res.status(422).send(ApiFailure(-1, "Invalid inputs."));
    }

    try {
      const todo = await this.service.addTodo(
        text,
        completed == false ? false : true
      );
      res.send(ApiSuccess(todo));
    } catch (error) {
      res.send(ApiFailure(error));
    }
  }

  private async updateTodo(req: Request, res: Response) {
    const { id, text, completed } = req.body;
    if (
      isNaN(+id) ||
      text.trim().length == 0 ||
      (completed != false && completed != true)
    ) {
      return res.status(422).send(ApiFailure(-1, "Invalid todo object."));
    }

    try {
      const todo = await this.service.updateTodo(req.body);
      res.send(ApiSuccess(todo));
    } catch (error) {
      res.send(ApiFailure(error));
    }
  }

  private async deleteTodo(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id)) {
      return res.status(422).send(ApiFailure(-1, "Invalid ID"));
    }
    try {
      const todo = await this.service.deleteTodo(id);
      res.send(ApiSuccess(todo));
    } catch (error) {
      res.send(ApiFailure(error));
    }
  }
}
