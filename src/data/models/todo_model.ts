import TodoEntity from "@/domain/entities/todo_entity";

class TodoModel extends TodoEntity {
    constructor(UID: string, isCompleted: boolean, text: string, createdAt: number) {
        super(UID, isCompleted, text, createdAt);
    }
}

export default TodoModel;