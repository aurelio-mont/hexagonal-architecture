import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";

export class UserDelete {

    constructor(private userRepository: UserRepository) {}

    async run(id: string): Promise<void> {
        return this.userRepository.delete(new UserId(id));
    }
}