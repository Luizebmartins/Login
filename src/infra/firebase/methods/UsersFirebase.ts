import { IUsersDbaMethods } from '../../IUsersDbaMethods'
import { User } from '../../../entities/User'



export class UsersFirebase implements IUsersDbaMethods {
    constructor(
        private usersRef: any
    ){}
    
    async get(email: string):Promise<any> {
        const userSnapshot = (await this.usersRef.where('email', '==', email).get()).docs
        if(!userSnapshot.length) {
            console.log("não existe")
            return false
        }
        const userData = userSnapshot[0].data()
        return new User(userData)
    }

     async save(user: User):Promise<boolean> {
         try {
            await this.usersRef.add({...user})
            return true 
        } catch (error) {
            console.log(error)
            return false
        }
    }
}