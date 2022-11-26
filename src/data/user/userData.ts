import { IUserData } from './IUserData'
import User from '../../infra/models/user'

export class UserPostgres implements IUserData {
    async save(user: User): Promise<User> {
        return User.create(user)
    }
    get(email: string): Promise<User> {
        return User.findOne({ where: { email } });
    };
    delete(email: string):Promise<number> {
        return User.destroy({ where: { email } });  
    }
}

