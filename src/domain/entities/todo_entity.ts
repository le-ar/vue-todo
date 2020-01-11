class TodoEntity {
    UID: string;
    isCompleted: boolean;
    text: string;
    createdAt: number;

    constructor(UID: string, isCompleted: boolean, text: string, createdAt: number) {
        this.UID = UID;
        this.isCompleted = isCompleted;
        this.text = text;
        this.createdAt = createdAt;
    }
}

export default TodoEntity;