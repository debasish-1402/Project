import Todo from "../Models/Todo";
import ITodoService from "./ITodoService";
import { Collection, Db, FindCursor, MongoClient } from "mongodb";

export default class TodoMongoDBService implements ITodoService {
  private uri: string = "mongodb://localhost:27017/TodoDatabase";
  private client: MongoClient = new MongoClient(this.uri);
  private TodoDatabase: Db;
  private TodoCollection: Collection;
  private idCollection: Collection;
  private id: number = 0;
  constructor() {
    this.client
      .connect()
      .then(() => console.log("Connected..."))
      .catch((e) => console.log(e));
    this.TodoDatabase = this.client.db();
    this.TodoCollection = this.TodoDatabase.collection("Todos");
    this.idCollection = this.TodoDatabase.collection("id");
  }

  public async addTodo(text: string, completed: boolean): Promise<Todo> {
    try {
      let idObject = await this.idCollection.findOne({});
      let id: number = idObject?.todoId;
      let newId: number = id;
      const todo = await this.TodoCollection.insertOne({
        id: ++id,
        text,
        completed,
      });
      await this.idCollection.updateOne(
        { todoId: newId },
        {
          $set: {
            todoId: id,
          },
        }
      );
      return new Todo(id, text, completed);
    } finally {
    }
  }
  public async getTodo(id: number): Promise<Todo> {
    try {
      const todo = await this.TodoCollection.findOne({ id: id });
      if (!todo) {
        throw new Error(`Todo not found with id = ${id}.`);
      }
      return new Todo(todo?.id, todo?.text, todo?.completed);
    } finally {
    }
  }
  public async getAllTodo(): Promise<Todo[]> {
    const todos: Todo[] = [];
    try {
      const todosFindCursor: FindCursor = this.TodoCollection.find({});

      for await (const todo of todosFindCursor) {
        todos.push(new Todo(todo.id, todo.text, todo.completed));
      }
      return todos;
    } finally {
    }
  }
  public async updateTodo(todo: Todo): Promise<Todo> {
    try {
      const todoToBeUpdated = await this.TodoCollection.findOne({
        id: +todo.id,
      });
      if (!todoToBeUpdated) {
        throw new Error(`Todo not found with id = ${todo.id}.`);
      }
      const updatedTodo = await this.TodoCollection.findOneAndUpdate(
        { id: +todo.id },
        {
          $set: {
            text: todo.text,
            completed: todo.completed,
          },
        }
      );

      return todo;
    } finally {
    }
  }
  public async deleteTodo(id: number): Promise<Todo> {
    try {
      const todoToBeDeleted = await this.TodoCollection.findOne({
        id: id,
      });
      if (!todoToBeDeleted) {
        throw new Error(`Todo not found with id = ${id}.`);
      }
      const deletedTodo = await this.TodoCollection.findOneAndDelete({
        id: id,
      });

      return new Todo(id, todoToBeDeleted?.text, todoToBeDeleted?.completed);
    } finally {
    }
  }
}
