export default class TodoRemoteStorageService {
    async addTodo(text, completed) {
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
    async getTodo(id) {
        const response = await fetch(`http://localhost:7000/todo/${id}`);
        const modifiedResponse = await response.json();
        const data = modifiedResponse.data;
        return data;
    }
    async getAllTodo() {
        const response = await fetch("http://localhost:7000/todo");
        const modifiedResponse = await response.json();
        const data = modifiedResponse.data;
        return data;
    }
    async updateTodo(todo) {
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
    async deleteTodo(id) {
        const response = await fetch(`http://localhost:7000/todo/${id}`, {
            method: "DELETE",
        });
        const modifiedResponse = await response.json();
        const data = modifiedResponse.data;
        return data;
    }
}
