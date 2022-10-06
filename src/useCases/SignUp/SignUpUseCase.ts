import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateUserRequestDTO } from './SignUpDTO'

export class SignUpUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) {}

    execute(data: ICreateUserRequestDTO): any {
        const userAlreadyExists = this.usersRepository.get(data.email)
        if(userAlreadyExists) throw new Error('User already exist')
    }
}