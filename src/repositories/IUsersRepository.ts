import { User } from '../entities/User'

export interface IUsersRepository {
    get(email: string): any;
    save(user: User): any
}