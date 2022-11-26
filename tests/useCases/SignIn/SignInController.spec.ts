import { HttpRequest, HttpResponse } from '@/useCases/utils/protocols/http'
import { MissingParamError } from '@/useCases/utils/errors/missing-param-error'
import { badRequest } from '@/useCases/utils/helpers/http-helper'
import { SignInController } from '@/useCases/SignIn/SignInController'
import { SignInUseCase } from "@/useCases/SignIn/SignInUseCase"
import { IUsersRepository } from '@/repositories/IUsersRepository'
import User from "@/infra/models/user"


const makeUserRepositoryStub = () => {
    class UserRepositoryStub implements IUsersRepository {
        get(user: any) {
            return false
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

const makeSut = (): any => {
    const userRepositoryStub = makeUserRepositoryStub()
    const signInUseCaseMock = new SignInUseCase(userRepositoryStub)
    const sut = new SignInController(signInUseCaseMock)

    return {
        sut,
        signInUseCaseMock
    }

}


describe("SignIn Controller", () => {
    test("should return 400 if no email is provided", async () => {
        const {sut} = makeSut()

        const httpRequest = {
            body: {
                password: 'any',
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))

    })

    test("should return 400 if no password is provided", async () => {
        const {sut} = makeSut()

        const httpRequest = {
            body: {
                email: 'test@gmail.com',
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))

    })


    test("should return 500 if SignInUseCase generate an error", async () => {
        const {sut, signInUseCaseMock} = makeSut()
        jest.spyOn(signInUseCaseMock, 'execute').mockImplementation(() => {
            throw new Error()
        })

        const httpRequest = {
            body: {
                email: 'test@gmail.com',
                password: 'any'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
    })

    test("should return 200 if successful login", async () => {
        const {sut, signInUseCaseMock} = makeSut()
        jest.spyOn(signInUseCaseMock, 'execute').mockImplementation(() => {
            return "anytoken"
        })

        const httpRequest = {
            body: {
                email: 'test@gmail.com',
                password: 'any'
            }
        }
        
        const httpResponse = await sut.handle(httpRequest)
        expect(typeof httpResponse.body.token).toBe("string")
        expect(httpResponse.statusCode).toBe(200)
    })

})

