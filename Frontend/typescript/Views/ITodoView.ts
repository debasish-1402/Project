import Todo from "../Models/Todo.js";

export default interface ITodoView{
    renderTodo(todo:Todo):void;
    createView():void;
}