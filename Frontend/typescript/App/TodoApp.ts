import TodoController from "../Controller/TodoController.js";
import AppConfig from "./AppConfig.js";

export default class TodoApp {

  constructor() {
    (async () => {
      const service = await AppConfig.getService("remote");
      const view = await AppConfig.getView();

      const component = new TodoController(service, view);
    })();
  }
}
