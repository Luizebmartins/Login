import { SignInUseCase } from "@/useCases/SignIn/SignInUseCase"
import { IUsersRepository } from '@/repositories/IUsersRepository'
import User from '@/infra/models/user'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
require('dotenv').config()

const makeUserRepositoryStub = () => {
    class UserRepositoryStub implements IUsersRepository {
        get(user: any) {
            return {}
        }

        save(user: User) {
            return true
        }
        delete(email: string) {
            return true
        }
    }
    return new UserRepositoryStub
}

const makeSut = () => {
    const userRepositoryStub = makeUserRepositoryStub()
    const sut = new SignInUseCase(userRepositoryStub)

    return {
        sut,
        userRepositoryStub,
    }
}

describe("Sign In Use Case", () => {
    test("should return an error if the user does not exist", async () => {
        const {sut, userRepositoryStub} = makeSut()
        jest.spyOn(userRepositoryStub, 'get').mockImplementation(()=> {
            return false
        })

        const userData = {
            email: "usernotexistemail@email.com",
            password: "any"
        }
        expect(async ()=> {const user = await sut.execute(userData)}).rejects.toThrow("Email or password is incorrect!")
    })

    test("should return an error if password is incorrect", async () => {
        const {sut, userRepositoryStub} = makeSut()
        jest.spyOn(userRepositoryStub, 'get').mockImplementation(async () => {
            const user = {
                email: "usernotexistemail@email.com",
                password: "other"
            }

            user.password = await bcrypt.hash(user.password, 8)
            return user
        })

        const userData = {
            email: "usernotexistemail@email.com",
            password: "any"
        }

        await expect(async ()=> {const user = await sut.execute(userData)}).rejects.toThrow("Email or password is incorrect!")
    })

    test('should return true and token if the data matches', async () => {
        const {sut, userRepositoryStub} = makeSut()
        jest.spyOn(userRepositoryStub, 'get').mockImplementation(async () => {
            const user = {
                email: "usernotexistemail@email.com",
                password: "other"
            }

            user.password = await bcrypt.hash(user.password, 8)
            return user
        })

        const userData = {
            email: "usernotexistemail@email.com",
            password: "other"
        }

        
        const userToken = await sut.execute(userData)
        expect(userToken.success).toBe(true)

        const decodedToken = jwt.verify(userToken.token, process.env.JWT_KEY) as {email: string}
        expect(decodedToken.email).toBe(userData.email)
    })
})