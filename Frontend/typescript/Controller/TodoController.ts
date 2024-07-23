import AppConfig from "../App/AppConfig.js";
import TodoStorageFactory from "../Factory/TodoStorageFactory.js";
import Todo from "../Models/Todo.js";
import ITodoService from "../Services/ITodoService.js";
import ITodoView from "../Views/ITodoView.js";

export default class TodoController {
  private storageServiceOption: HTMLSelectElement;

  constructor(private service: ITodoService, private view: ITodoView) {

    this.view.createView();
    this.showTodos();

    document
      .querySelector("button")
      ?.addEventListener("click", this.addTodo.bind(this));

    this.storageServiceOption = document.querySelector("select") as HTMLSelectElement;

    this.storageServiceOption?.addEventListener(
      "change",
      this.changeService.bind(this)
    );
  }

  public async addTodo() {

    let inputElement = document.querySelector("input") as HTMLInputElement;
    let inputText = document.querySelector("input")?.value as string;

    if (inputText?.trim().length != 0) {
      const todo = (await this.service.addTodo(inputText, false)) as Todo;
      this.addEventListeners(todo);
      this.view.renderTodo(todo);
      inputElement.value = "";
      this.showTodos();
    }
  }

  public async updateTodo(todo: Todo) {
    const updatedTodo = await this.service.updateTodo(todo);
    this.showTodos();
  }

  public async deleteTodo(id: number) {
    const deletedTodo = await this.service.deleteTodo(id);
    this.showTodos();
  }

  public async showTodos() {

    const todos: Todo[] = await this.service.getAllTodo();
    
    const todoList: HTMLUListElement = document.querySelector(
      "ul"
    ) as HTMLUListElement;
    todoList.innerHTML = "";

    todos.forEach((todo) => {
      this.view.renderTodo(todo);
      this.addEventListeners(todo);
    });
  }

  public addEventListeners(todo: Todo) {

    const checkbox = document.querySelector(`#todo-${todo.id}>input`) as HTMLInputElement;
    const deleteButton = document.querySelector(`#todo-${todo.id}>button`);

    checkbox?.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      this.updateTodo(todo);
    });
    
    deleteButton?.addEventListener("click", () => {
      this.deleteTodo(todo.id);
      deleteButton?.parentElement?.remove();
    });
  }

  public async changeService() {

    const todoList: HTMLUListElement = document.querySelector(
      "ul"
    ) as HTMLUListElement;
    todoList.innerHTML = "";

    const serviceClass = await AppConfig.getService(this.storageServiceOption.value);
    this.service = serviceClass;
    this.showTodos();
  }
}
