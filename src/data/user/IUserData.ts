import User from '../../infra/models/user'

export interface IUserData {
    save(user: User): Promise<User>;
    get(email: string): Promise<User>;
    delete(email: string):Promise<number>
}