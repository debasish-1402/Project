import MySql, {
  ConnectionOptions,
  FieldPacket,
  Pool,
  ResultSetHeader
} from "mysql2/promise";
import Todo from "../Models/Todo";
import ITodoService from "./ITodoService";
import { trace } from "../Utilities/Logger";

export default class TodoMySqlService implements ITodoService {
  private connectionSettings: ConnectionOptions = {
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "todoschema",
    pool: 10,
    namedPlaceholders: true,
  };

  private connectionPool: Pool;

  constructor() {
    this.connectionPool = MySql.createPool(this.connectionSettings);
  }

  @trace
  async addTodo(text: string, completed: boolean): Promise<Todo> {

    let connection;
    try {

      connection = await this.connectionPool.getConnection();
      const [result] = await connection.query(
        "INSERT INTO todo(text, completed) VALUES(:text,:completed)",
        { text: text, completed: completed == true ? 1 : 0 }
      );
      return new Todo((result as ResultSetHeader).insertId, text, completed);

    } finally {
      connection?.release();
    }
  }

  @trace
  async getTodo(id: number): Promise<Todo> {
    
    let connection;
    try {

      connection = await this.connectionPool.getConnection();
      const result = await connection.query(
        "SELECT * FROM todo WHERE id=:todoId",
        {
          todoId: id,
        }
      );
      const rows = result[0] as unknown as FieldPacket[];

      if (rows.length == 0) {
        throw new Error(`Todo not found with id = ${id}.`);
      }

      return rows[0] as unknown as Todo;

    } finally {
      connection?.release();
    }
  }

  @trace
  async getAllTodo(): Promise<Todo[]> {

    let connection;
    try {

      connection = await this.connectionPool.getConnection();
      const [result] = await connection.query("SELECT * FROM todo");
      return result as Todo[];

    } finally {
      connection?.release();
    }
  }

  @trace
  async updateTodo(todo: Todo): Promise<Todo> {

    let connection;
    try {

      connection = await this.connectionPool.getConnection();
      const found = await connection.query(
        "SELECT * FROM todo WHERE id=:todoId",
        {
          todoId: +todo.id,
        }
      );
      const rows = found[0] as unknown as FieldPacket[];

      if (rows.length == 0) {
        throw new Error(`Todo not found.`);
      }

      const [result] = await connection.query(
        "UPDATE todo SET text=:text, completed=:completed WHERE id=:id",
        {
          id: +todo.id,
          text: todo.text,
          completed: todo.completed == true ? 1 : 0,
        }
      );
      return new Todo(+todo.id, todo.text, todo.completed);

    } finally {
      connection?.release();
    }
  }

  @trace
  async deleteTodo(id: number): Promise<Todo> {
    
    let connection;
    try {

      connection = await this.connectionPool.getConnection();
      const found = await connection.query(
        "SELECT * FROM todo WHERE id=:todoId",
        {
          todoId: id,
        }
      );
      const rows = found[0] as unknown as FieldPacket[];

      if (rows.length == 0) {
        throw new Error(`Todo not found with id = ${id}.`);
      }

      const [result] = await connection.query("DELETE FROM todo WHERE id=:id", {
        id: id,
      });
      return rows[0] as unknown as Todo;

    } finally {
      connection?.release();
    }
  }
}
