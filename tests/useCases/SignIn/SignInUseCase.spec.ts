import { SignInUseCase } from "@/useCases/SignIn/SignInUseCase"
import { IUsersRepository } from '@/repositories/IUsersRepository'
import { User } from '@/entities/User'


const makeUserRepositoryStub = () => {
    class UserRepositoryStub implements IUsersRepository {
        get(user: any) {
            return true
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
        expect(()=> {sut.execute(userData)}).toThrow("Email or password is incorrect!")
    })
})