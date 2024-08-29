import { UserId } from "../../domain/UserId";
import { UserNotFoundError } from "../../domain/UserNotFoundError";
import { UserRepository } from "../../domain/UserRepository";

export class UserDelete {

    constructor(private userRepository: UserRepository) {}

    async run(id: string): Promise<void> {
        const userExists = await this.userRepository.getOneById(new UserId(id));

        if (!userExists) throw new UserNotFoundError('User not found!');


        return this.userRepository.delete(new UserId(id));
    }
}