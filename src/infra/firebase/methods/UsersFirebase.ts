import { IUsersDbaMethods } from '../../IUsersDbaMethods'
import { User } from '../../../entities/User'



export class UsersFirebase implements IUsersDbaMethods {
    constructor(
        private usersRef: any
    ){}
    
    async get(email: string):Promise<any> {
        const userSnapshot = (await this.usersRef.where('email', '==', email).get()).docs
        if(!userSnapshot.length) {
            return false
        }
        const userData = userSnapshot[0].data()
        return new User(userData)
    }

    save(user: User):any {

    }
}