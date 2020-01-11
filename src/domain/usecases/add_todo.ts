import FirestoreRepository from "../repositories/firestore_repository";
import TodoEntity from '../entities/todo_entity';

class AddTodoUseCase {
    firestoreRepository: FirestoreRepository;

    constructor(firestoreRepository: FirestoreRepository) {
        this.firestoreRepository = firestoreRepository;
    }

    async execute(text: string): Promise<any> {
        console.log(text);
        
        return await this.firestoreRepository.addTodo(new TodoEntity('', false, text, 0));
    }
}

export default AddTodoUseCase;