import { IUserData } from './IUserData'
import User from '../../infra/models/user'

export class UserPostgres implements IUserData {
    async save(user: User): Promise<any> {
        return User.create(user)
    }
    get(email: string): Promise<any> {
        return 
    };
    delete(email: string):Promise<boolean> {
        return  
    }
}

