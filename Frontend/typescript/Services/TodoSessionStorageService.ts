import Todo from "../Models/Todo.js";
import TodoLocalStorageService from "./TodoLocalStorageService.js";

export default class TodoSessionStorageService extends TodoLocalStorageService {
  saveToStorage(): void {
    sessionStorage.setItem(this._storageName, JSON.stringify(this._todoArray));
  }
  loadFromStorage(): void {
    const data = sessionStorage.getItem(this._storageName);
    this._todoArray = JSON.parse(data ?? "[]") as Todo[];
    this._lastTodoId = this._todoArray.at(-1)?.id ?? 0;
  }
}
