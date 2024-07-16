import Todo from "../Models/Todo";

export default interface ITodoService {
  addTodo(text: string, completed: boolean): Promise<Todo | undefined>;
  getTodo(id: number): Promise<Todo | undefined>;
  getAllTodo(): Promise<Todo[] | undefined>;
  updateTodo(todo: Todo): Promise<Todo | undefined>;
  deleteTodo(id: number): Promise<Todo | undefined>;
}
