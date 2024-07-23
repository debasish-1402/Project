import Todo from "../Models/Todo.js";

export default interface ITodoService {
  addTodo(text: string, completed: boolean): Promise<Todo>;
  getTodo(id: number): Promise<Todo>;
  getAllTodo(): Promise<Todo[]>;
  updateTodo(todo: Todo): Promise<Todo >;
  deleteTodo(id: number): Promise<Todo >;
}
