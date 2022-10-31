import { IUsersRepository } from '../../repositories/IUsersRepository'
import { User } from '../../entities/User'
import * as bcrypt from 'bcrypt'
export class SignInUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) {}

    execute(data: any) {
        const user = this.usersRepository.get(data.email)
        if(!user) throw new Error("Email or password is incorrect!")
    }
}