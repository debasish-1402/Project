import Todo from "../Models/Todo.js";
import WinstonLogger from "../Utilities/WinstonLogger.js";
import ITodoService from "./ITodoService.js";

export default class TodoRemoteStorageService implements ITodoService {

  public async addTodo(text: string, completed: boolean): Promise<Todo> {
    const response = await fetch("http://localhost:7000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, completed }),
    });
    const modifiedResponse = await response.json();
    const data = modifiedResponse.data;
    return data;
  }
  
  public async getTodo(id: number): Promise<Todo> {
    const response = await fetch(`http://localhost:7000/todo/${id}`);
    const modifiedResponse = await response.json();
    const data = modifiedResponse.data;
    return data;
  }
  
  public async getAllTodo(): Promise<Todo[]> {
    const response = await fetch("http://localhost:7000/todo");
    const modifiedResponse = await response.json();
    const data = modifiedResponse.data as Todo[];
    return data;
  }

  public async updateTodo(todo: Todo): Promise<Todo> {
    const response = await fetch("http://localhost:7000/todo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...todo }),
    });
    const modifiedResponse = await response.json();
    const data = modifiedResponse.data;
    return data;
  }

  public async deleteTodo(id: number): Promise<Todo> {
    const response = await fetch(`http://localhost:7000/todo/${id}`, {
      method: "DELETE",
    });
    const modifiedResponse = await response.json();
    const data = modifiedResponse.data;
    return data;
  }
}
