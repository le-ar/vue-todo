import FirestoreRepository from '../repositories/firestore_repository';
import TodoEntity from '../entities/todo_entity';

class UpdateTodoTextUseCase {
    firestoreRepository: FirestoreRepository;

    constructor(firestoreRepository: FirestoreRepository) {
        this.firestoreRepository = firestoreRepository;
    }

    async execute(todoEntity: TodoEntity) {
        this.firestoreRepository.updateTodoText(todoEntity);
    }
}

export default UpdateTodoTextUseCase;