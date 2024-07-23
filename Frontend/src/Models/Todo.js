export default class Todo {
    id;
    text;
    completed;
    constructor(id, text, completed = false) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }
}
