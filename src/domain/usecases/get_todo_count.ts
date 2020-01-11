import FirestoreRepository from "../repositories/firestore_repository";

class GetTodoCountUseCase {
    firestoreRepository: FirestoreRepository;

    constructor(firestoreRepository: FirestoreRepository) {
        this.firestoreRepository = firestoreRepository;
    }

    async execute(): Promise<number> {
        return await this.firestoreRepository.getTodoCount();
    }
}

export default GetTodoCountUseCase;