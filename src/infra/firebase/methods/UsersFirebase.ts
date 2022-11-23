import { IUserData } from '../../../data/user/IUserData'
import User from '../../models/user'



export class UsersFirebase implements IUserData {
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

     async save(user: User):Promise<boolean> {
         try {
            await this.usersRef.add({...user})
            return true 
        } catch (error) {
            return false
        }
    }

    async delete(email: string):Promise<boolean> {
        try {
            const userSnapshot = (await this.usersRef.where('email', '==', email).get()).docs
            userSnapshot.forEach((doc: any) => {
                doc.ref.delete();
            });
            
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}