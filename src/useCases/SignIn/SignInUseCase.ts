import { IUsersRepository } from '../../repositories/IUsersRepository'
import { User } from '../../entities/User'
import * as bcrypt from 'bcrypt'
export class SignInUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) {}

    async execute(data: any) {
        const existingUser = this.usersRepository.get(data.email)
        if(!existingUser) throw new Error("Email or password is incorrect!")

        const passwordMatch = await bcrypt.compare(data.password, existingUser.password)
        if(!passwordMatch) throw new Error("Email or password is incorrect!")
    }
}