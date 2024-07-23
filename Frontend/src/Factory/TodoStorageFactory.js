import TodoLocalStorageService from "../Services/TodoLocalStorageService.js";
import TodoRemoteStorageService from "../Services/TodoRemoteStorageService.js";
import TodoSessionStorageService from "../Services/TodoSessionStorageService.js";
export default class TodoStorageFactory {
    static factory = {
        local: TodoLocalStorageService,
        session: TodoSessionStorageService,
        remote: TodoRemoteStorageService,
    };
}
