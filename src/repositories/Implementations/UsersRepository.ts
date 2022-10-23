import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'
import { IUsersDbaMethods } from '../../infra/IUsersDbaMethods'

export class UsersRepository implements IUsersRepository {
    constructor(
        private dbaUser: IUsersDbaMethods
    ){}
    
    get(email: string):Promise<any> {
        return this.dbaUser.get(email)
    }
    save(user: User):Promise<boolean> {
        return this.dbaUser.save(user)
    }
    delete(email: string):Promise<boolean> {
        return this.dbaUser.delete(email)
    }
}