import FirestoreRepository from "../repositories/firestore_repository";
import TodoEntity from '../entities/todo_entity';

class GetAllTodosUseCase {
    firestoreRepository: FirestoreRepository;

    constructor(firestoreRepository: FirestoreRepository) {
        this.firestoreRepository = firestoreRepository;
    }

    async execute(): Promise<TodoEntity[]> {
        return await this.firestoreRepository.getAllTodos();
    }
}

export default GetAllTodosUseCase;