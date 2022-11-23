import User from '../../infra/models/user'

export interface IUserData {
    save(user: User): Promise<any>;
    get(email: string): Promise<any>;
    delete(email: string):Promise<boolean>
}