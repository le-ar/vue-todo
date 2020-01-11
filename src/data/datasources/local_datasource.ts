import TodoModel from "../models/todo_model";

interface LocalDatasource {
    getAllTodos(): TodoModel[];
    cacheTodos(todos: TodoModel[]): void;
}

class LocalDatasourceImpl implements LocalDatasource {
    getAllTodos(): TodoModel[] {
        let jsonTodos = localStorage.getItem('todos');

        if (jsonTodos === null) {
            return [];
        }

        let result: TodoModel[] = [];
        let parsedJson = JSON.parse(jsonTodos);
        if (typeof parsedJson === 'undefined' || !Array.isArray(parsedJson)) {
            return [];
        }

        for (let todo of parsedJson) {
            result.push(new TodoModel(todo.UID, todo.isCompleted, todo.text, todo.createdAt));
        }

        return result;
    }
    cacheTodos(todos: TodoModel[]): void {
        let jsonTodos = JSON.stringify(todos);        
        localStorage.setItem('todos', jsonTodos);
    }
}

export { LocalDatasource, LocalDatasourceImpl }