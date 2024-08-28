import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class UserGetAll {

    constructor(private userRepository: UserRepository) { }

    async run(): Promise<User[]> {
        return this.userRepository.getAll();
    }
}