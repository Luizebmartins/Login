import { IUsersRepository } from '../../repositories/IUsersRepository'

export class SignUpUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) {}

    execute(data: any): any {
        const userAlreadyExists = this.usersRepository.get(data.email)
        if(userAlreadyExists) throw new Error('User already exist')
    }
}