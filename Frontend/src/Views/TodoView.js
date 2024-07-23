import appConfig from "../config.json" with { "type": "json" };
export default class TodoView {
    renderTodo(todo) {
        const todoList = document.querySelector("#todo-list");
        todoList?.insertAdjacentHTML("beforeend", `<li id="todo-${todo.id}">
        <input type="checkbox" ${todo.completed ? "checked" : ""} >
        <label>${todo.text}</label>
        <button>X</button>
    </li>`);
    }
    createView() {
        const rootDiv = document.querySelector("#root");
        rootDiv.innerHTML = `
      <div>
          <select name="storage-service" id="">
            
          </select>
      </div>
    `;
        rootDiv.insertAdjacentHTML("beforeend", `
        <div>
          <h1>Welcome</h1>
          <input type="text"/><button>Add</button>
        </div>
        <div>
          <ul id="todo-list"></ul>
        </div>
      `);
        const selector = document.querySelector("select");
        appConfig.services.forEach((service) => {
            selector?.insertAdjacentHTML("beforeend", `<option value="${service.name}">${service.arguments.storageName}</option>`);
        });
    }
}
