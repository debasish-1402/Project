import Todo from "../Models/Todo.js";
import ITodoService from "./ITodoService.js";

export default class TodoLocalStorageService implements ITodoService {
  protected _todoArray: Todo[] = [];
  protected _lastTodoId: number = 0;
  protected _storageName: string = "LocalStorage";

  constructor() {
    this.loadFromStorage();
  }

  async addTodo(text: string, completed: boolean): Promise<Todo> {
    const todo: Todo = new Todo(++this._lastTodoId, text, completed);
    this._todoArray.push(todo);
    this.saveToStorage();
    this.loadFromStorage();
    return structuredClone(todo);
  }
  async getTodo(id: number): Promise<Todo> {
    throw new Error("Method not implemented.");
  }
  async getAllTodo(): Promise<Todo[]> {
    this.loadFromStorage();
    return structuredClone(this._todoArray);
  }
  async updateTodo(todo: Todo): Promise<Todo> {
    let foundTodo: Todo = this._todoArray.find(
      (element) => element.id === todo.id
    ) as Todo;
    foundTodo.completed = todo.completed;
    this.saveToStorage();
    this.loadFromStorage();
    return todo as Todo;
  }
  async deleteTodo(id: number): Promise<Todo> {
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
    this._todoArray = JSON.parse(data ?? "[]") as Todo[];
    this._lastTodoId = this._todoArray.at(-1)?.id ?? 0;
  }
}
