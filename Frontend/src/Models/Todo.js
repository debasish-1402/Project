export default class Todo {
    id;
    text;
    completed;
    constructor(id, text, completed) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }
}
