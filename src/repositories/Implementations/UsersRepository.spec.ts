import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'
import { IUsersDbaMethods } from '../../infra/IUsersDbaMethods'
import { UsersFirebase } from '../../infra/firebase/methods/UsersFirebase'
import { firebaseAdmin } from '../../infra/firebase/connection/firebase'
import { UsersRepository } from './UsersRepository'
const usersRef = firebaseAdmin.firestore().collection('users');


const makeSut = (): IUsersRepository => {
    const usersFirebase = new UsersFirebase(usersRef)
    return new UsersRepository(usersFirebase)
}

describe("Users Repository", () => {
    test("ensure return user if exist", async () => {
        const sut = makeSut()
        const email = "luiz@teste.com"
        const user = await sut.get(email)
        expect(user).toBeInstanceOf(User)
    })
})