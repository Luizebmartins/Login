import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'
import { IUsersDbaMethods } from '../../infra/IUsersDbaMethods'

export class UsersRepository implements IUsersRepository {
    constructor(
        private dbaUser: IUsersDbaMethods
    ){}
    
    get(email: string):any {
        return this.dbaUser.get(email)
    }
    save(user: User) {
        
    }
}