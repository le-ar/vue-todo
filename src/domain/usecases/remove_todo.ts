import FirestoreRepository from "../repositories/firestore_repository";
import TodoEntity from '../entities/todo_entity';

class RemoveTodoUseCase {
    firestoreRepository: FirestoreRepository;

    constructor(firestoreRepository: FirestoreRepository) {
        this.firestoreRepository = firestoreRepository;
    }

    async execute(uid: string): Promise<any> {
        return await this.firestoreRepository.removeTodo(new TodoEntity(uid, false, '', 0));
    }
}

export default RemoveTodoUseCase;