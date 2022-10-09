import { User } from '../entities/User'

export interface IUsersDbaMethods {
    get(email: string): Promise<any>;
    save(user: User): any
}