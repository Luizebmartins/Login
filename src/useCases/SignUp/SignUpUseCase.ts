import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateUserRequestDTO } from './SignUpDTO'
import { User } from '../../entities/User'
export class SignUpUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) {}

    async execute(data: ICreateUserRequestDTO): Promise<any> {
        const userAlreadyExists = await this.usersRepository.get(data.email)
        if(userAlreadyExists) throw new Error('User already exist')

        const user = new User(data)

        const newUser = await this.usersRepository.save(user)

        if(newUser) {
            return {message: "User created successfully!"}
        }
    }
}