import Todo from "../Models/Todo";
import ITodoService from "./ITodoService";
import MySql, {
  ConnectionOptions,
  FieldPacket,
  Pool,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";

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
  async addTodo(text: string, completed: boolean): Promise<Todo | undefined> {
    let connection = await this.connectionPool.getConnection();
    try {
      const [result] = await connection.query(
        "INSERT INTO todo(text, completed) VALUES(:text,:completed)",
        { text: text, completed: completed == true ? 1 : 0 }
      );
      return new Todo((result as ResultSetHeader).insertId, text, completed);
    } catch (error) {
      return undefined;
    } finally {
      connection.release();
    }
  }
  async getTodo(id: number): Promise<Todo | undefined> {
    let connection = await this.connectionPool.getConnection();
    try {
      const result = await connection.query(
        "SELECT * FROM todo WHERE id=:todoId",
        {
          todoId: id,
        }
      );
      const rows = result[0] as unknown as FieldPacket[];
      if (rows.length != 0) {
        return rows[0] as unknown as Todo;
      } else {
        return undefined;
      }
    } catch (error) {
      return undefined;
    } finally {
      connection.release();
    }
  }
  async getAllTodo(): Promise<Todo[] | undefined> {
    let connection = await this.connectionPool.getConnection();
    try {
      const [result] = await connection.query("SELECT * FROM todo");
      return result as Todo[];
    } catch (error) {
      return undefined;
    } finally {
      connection.release();
    }
  }
  async updateTodo(todo: Todo): Promise<Todo | undefined> {
    let connection = await this.connectionPool.getConnection();
    try {
      const found = await connection.query(
        "SELECT * FROM todo WHERE id=:todoId",
        {
          todoId: +todo.id,
        }
      );
      const rows = found[0] as unknown as FieldPacket[];
      if (rows.length != 0) {
        const [result] = await connection.query(
          "UPDATE todo SET text=:text, completed=:completed WHERE id=:id",
          {
            id: +todo.id,
            text: todo.text,
            completed: todo.completed == true ? 1 : 0,
          }
        );
        if ((result as ResultSetHeader).affectedRows != 0) {
          return new Todo(+todo.id, todo.text, todo.completed);
        }
      }
    } catch (error) {
      console.log(error);
      return undefined;
    } finally {
      connection.release();
    }
  }
  async deleteTodo(id: number): Promise<Todo | undefined> {
    let connection = await this.connectionPool.getConnection();
    try {
      const found = await connection.query(
        "SELECT * FROM todo WHERE id=:todoId",
        {
          todoId: id,
        }
      );
      const rows = found[0] as unknown as FieldPacket[];
      if (rows.length != 0) {
        const [result] = await connection.query(
          "DELETE FROM todo WHERE id=:id",
          { id: id }
        );
        if ((result as ResultSetHeader).affectedRows != 0) {
          return rows[0] as unknown as Todo;
        } else return undefined;
      } else return undefined;
    } catch (error) {
      return undefined;
    } finally {
      connection.release();
    }
  }
}
