import { SignInUseCase } from "@/useCases/SignIn/SignInUseCase"
import { IUsersRepository } from '@/repositories/IUsersRepository'
import { User } from '@/entities/User'
import * as bcrypt from 'bcrypt'

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
})