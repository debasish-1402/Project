import TodoLocalStorageService from "./TodoLocalStorageService.js";
export default class TodoSessionStorageService extends TodoLocalStorageService {
    saveToStorage() {
        sessionStorage.setItem(this._storageName, JSON.stringify(this._todoArray));
    }
    loadFromStorage() {
        const data = sessionStorage.getItem(this._storageName);
        this._todoArray = JSON.parse(data ?? "[]");
        this._lastTodoId = this._todoArray.at(-1)?.id ?? 0;
    }
}
