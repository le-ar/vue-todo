interface FirestoreRepository {
    getTodoCount(): Promise<number>
}

export default FirestoreRepository;