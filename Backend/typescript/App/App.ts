import express, { Express } from "express";

import cors from "cors";

export default class App {
  private app: Express = express();

  constructor(private port: number = 30000) {
    this.loadMiddleWeres();
    this.loadRoutes();
    this.startApp();
  }
  public loadMiddleWeres() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  public loadRoutes() {}
  public startApp() {
    this.app.listen(this.port, ()=> console.log(`Server started on port ${this.port}...`))
  }
}
