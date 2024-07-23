import Todo from "../Models/Todo.js";
export default class TodoLocalStorageService {
    _todoArray = [];
    _lastTodoId = 0;
    _storageName = "LocalStorage";
    constructor() {
        this.loadFromStorage();
    }
    async addTodo(text, completed) {
        const todo = new Todo(++this._lastTodoId, text, completed);
        this._todoArray.push(todo);
        this.saveToStorage();
        this.loadFromStorage();
        return structuredClone(todo);
    }
    async getTodo(id) {
        throw new Error("Method not implemented.");
    }
    async getAllTodo() {
        this.loadFromStorage();
        return structuredClone(this._todoArray);
    }
    async updateTodo(todo) {
        let foundTodo = this._todoArray.find((element) => element.id === todo.id);
        foundTodo.completed = todo.completed;
        this.saveToStorage();
        this.loadFromStorage();
        return todo;
    }
    async deleteTodo(id) {
        let index = this._todoArray.findIndex((todo) => todo.id === id);
        const todo = this._todoArray[index];
        this._todoArray.splice(index, 1);
        this.saveToStorage();
        this.loadFromStorage();
        return todo;
    }
    saveToStorage() {
        localStorage.setItem(this._storageName, JSON.stringify(this._todoArray));
    }
    loadFromStorage() {
        const data = localStorage.getItem(this._storageName);
        this._todoArray = JSON.parse(data ?? "[]");
        this._lastTodoId = this._todoArray.at(-1)?.id ?? 0;
    }
}
