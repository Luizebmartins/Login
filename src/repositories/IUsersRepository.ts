import User from '../infra/models/user'

export interface IUsersRepository {
    get(email: string): any
    save(user: any): any
    delete(email: string): any
}