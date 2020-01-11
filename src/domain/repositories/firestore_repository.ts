import TodoEntity from '../entities/todo_entity';
interface FirestoreRepository {
    getTodoCount(): Promise<number>
    getAllTodos(): Promise<TodoEntity[]>
    addTodo(todoModel: TodoEntity): Promise<any>;
    updateTodoCkeck(todoModel: TodoEntity): void;
    removeTodo(todoModel: TodoEntity): Promise<any>;
}

export default FirestoreRepository;