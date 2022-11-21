import { IUsersRepository } from '../IUsersRepository'
import { IUsersDbaMethods } from '../../data/user/IUsersDbaMethods'
import User from '../../infra/models/user'
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