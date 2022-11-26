import { IUsersRepository } from '../IUsersRepository'
import { IUserData } from '../../data/user/IUserData'
import User from '../../infra/models/user'
export class UsersRepository implements IUsersRepository {
    constructor(
        private dbaUser: IUserData
    ){}
    
    get(email: string):Promise<User> {
        return this.dbaUser.get(email)
    }
    save(user: User):Promise<User> {
        return this.dbaUser.save(user)
    }
    delete(email: string):Promise<number> {
        return this.dbaUser.delete(email)
    }
}