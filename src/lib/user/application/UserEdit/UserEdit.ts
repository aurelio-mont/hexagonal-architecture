import { User } from "../../domain/User";
import { UserCreatedAt } from "../../domain/UserCreatedAt";
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserNotFoundError } from "../../domain/UserNotFoundError";
import { UserRepository } from "../../domain/UserRepository";

export class UserEdit {

    constructor(private userRepository: UserRepository) {}
    
    async run(id: string, name: string, email: string, createdAt: Date): Promise<void> {
        const userExists = await this.userRepository.getOneById(new UserId(id));
        
        if (!userExists) throw new UserNotFoundError('User not found!');
        
        const user = new User(
            new UserId(id),
            new UserName(name),
            new UserEmail(email),
            new UserCreatedAt(createdAt)
        );


        return this.userRepository.edit(user);
    }
}