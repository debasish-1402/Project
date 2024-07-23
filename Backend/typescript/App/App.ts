import express, { Express } from "express";
import cors from "cors";
import TodoRouter from "../Routers/TodoRouter";
import appConfig from "../../config.json"
import WinstonLogger from "../Utilities/WinstonLogger";

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

  public async loadRoutes() {
    const imported = await import(`../Services/${appConfig.service}.js`)
    const ServiceClass = imported.default;
    this.app.use("/todo", new TodoRouter(new ServiceClass).router)
  }
  public startApp() {
    this.app.listen(this.port, () =>{
      // console.log(`Server started on port ${this.port}...`)
      WinstonLogger.logger.info(`Server started on port ${this.port}...`)
    }
    );
  }
}
