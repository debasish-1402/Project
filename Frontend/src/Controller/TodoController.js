import AppConfig from "../App/AppConfig.js";
export default class TodoController {
    service;
    view;
    storageServiceOption;
    constructor(service, view) {
        this.service = service;
        this.view = view;
        this.view.createView();
        this.showTodos();
        document
            .querySelector("button")
            ?.addEventListener("click", this.addTodo.bind(this));
        this.storageServiceOption = document.querySelector("select");
        this.storageServiceOption?.addEventListener("change", this.changeService.bind(this));
    }
    async addTodo() {
        let inputElement = document.querySelector("input");
        let inputText = document.querySelector("input")?.value;
        if (inputText?.trim().length != 0) {
            const todo = (await this.service.addTodo(inputText, false));
            this.addEventListeners(todo);
            this.view.renderTodo(todo);
            inputElement.value = "";
            this.showTodos();
        }
    }
    async updateTodo(todo) {
        const updatedTodo = await this.service.updateTodo(todo);
        this.showTodos();
    }
    async deleteTodo(id) {
        const deletedTodo = await this.service.deleteTodo(id);
        this.showTodos();
    }
    async showTodos() {
        const todos = await this.service.getAllTodo();
        const todoList = document.querySelector("ul");
        todoList.innerHTML = "";
        todos.forEach((todo) => {
            this.view.renderTodo(todo);
            this.addEventListeners(todo);
        });
    }
    addEventListeners(todo) {
        const checkbox = document.querySelector(`#todo-${todo.id}>input`);
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
    async changeService() {
        const todoList = document.querySelector("ul");
        todoList.innerHTML = "";
        const serviceClass = await AppConfig.getService(this.storageServiceOption.value);
        this.service = serviceClass;
        this.showTodos();
    }
}
