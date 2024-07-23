import ITodoService from "../Services/ITodoService.js";
import TodoLocalStorageService from "../Services/TodoLocalStorageService.js";
import TodoRemoteStorageService from "../Services/TodoRemoteStorageService.js";
import TodoSessionStorageService from "../Services/TodoSessionStorageService.js";

type factoryService = {
  [name: string]: any;
};

export default class TodoStorageFactory {
  public static factory: factoryService = {
    local: TodoLocalStorageService,
    session:  TodoSessionStorageService,
    remote: TodoRemoteStorageService,
  };
}
